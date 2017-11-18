/**
 * @flow
 */

import * as React from 'react';
import { StyleSheet, Image, View } from 'react-native';
import { Camera } from 'expo';
import FadeView from './FadeView';

export const Modes = {
  CAMERA: 1,
  IMAGE_PREVIEW: 2,
  GALLERY: 3,
};

export type ModesT = $Values<typeof Modes>;

type MaybePromiseFn<X> = () => X | Promise<X>;

type Props = {
  renderCameraUI: ({
    mode: ModesT,
    onTakePicture: MaybePromiseFn<void>,
    onDiscard: MaybePromiseFn<void>,
  }) => React.Element<*>,
  handlePicture: MaybePromiseFn<void>
};

type State = {
  mode: ModesT,
  currentPictureData: ?{
    width: number,
    height: number,
    uri: string,
  },
  previewVisible: boolean,
  blackoutCamera: boolean,
};

export default class ImageCaptureView extends React.Component<Props, State> {
  state = {
    mode: Modes.CAMERA,
    currentPictureData: null,
    previewVisible: false,
    blackoutCamera: false,
  };

  _cameraRef: ?Camera;

  render() {
    let overlayView = null;
    switch (this.state.mode) {
      case Modes.IMAGE_PREVIEW:
        overlayView = this.renderImagePreview();
        break;
      case Modes.GALLERY:
        overlayView = this.renderGallery();
        break;
    }

    return (
      <View style={styles.container}>
        <View style={StyleSheet.absoluteFill}>{this.renderCamera()}</View>
        <View style={StyleSheet.absoluteFill} pointerEvents={overlayView ? 'auto' : 'none'}>
          {overlayView}
        </View>
        <View style={StyleSheet.absoluteFill}>
          <View style={{ flex: 1 }}>
            {this.props.renderCameraUI({
              mode: this.state.mode,
              onTakePicture: this.onTakePicture,
              onDiscard: this.onDiscard,
            })}
          </View>
        </View>
      </View>
    );
  }

  renderCamera() {
    return (
      <View style={{ flex: 1 }}>
        <Camera ref={this.getCameraRef} style={{ flex: 1 }} type={Camera.Constants.Type.Back} />
        <FadeView style={StyleSheet.absoluteFill} visible={this.state.blackoutCamera}>
          <View style={{ flex: 1, backgroundColor: 'black' }} />
        </FadeView>
      </View>
    );
  }

  renderImagePreview() {
    return (
      <FadeView
        style={{
          flex: 1,
          backgroundColor: 'black',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        visible={!!this.state.previewVisible}>
        <Image style={{ flex: 1 }} resizeMode="contain" source={this.state.currentPictureData} />
      </FadeView>
    );
  }

  renderGallery() {
    return <View />;
  }

  onTakePicture = async () => {
    if (this.state.isTakingPicture) {
      return;
    }
    // take the picture, get the data, switch modes to IMAGE_PREVIEW
    try {
      if (!this._cameraRef) {
        return;
      }
      const pictureResult = await this._cameraRef.takePictureAsync();
      this.setState(
        {
          blackoutCamera: true,
        },
        async () => {
          await delay(100);
          this.setState(
            {
              mode: Modes.IMAGE_PREVIEW,
              currentPictureData: pictureResult,
            },
            () => {
              this.setState({
                previewVisible: true,
                blackoutCamera: false,
              });
              this.props.handlePicture(pictureResult);
            }
          );
        }
      );
    } catch (e) {
      // ignore when we can't take a picture for some reason
      this.setState({
        blackoutCamera: false,
      });
    }
  };

  onDiscard = () => {
    this.setState(
      {
        previewVisible: false,
      },
      async () => {
        await delay(100);
        this.setState({
          mode: Modes.CAMERA,
        });
      }
    );
  };

  getCameraRef = (cameraComponentRef: ?Camera) => {
    this._cameraRef = cameraComponentRef;
  };
}

const delay = duration => new Promise(resolve => setTimeout(resolve, duration));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});
