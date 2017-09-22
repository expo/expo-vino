/**
 * @flow
 */

import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Camera } from 'expo';

const Modes = {
  CAMERA: 1,
  IMAGE_PREVIEW: 2,
  GALLERY: 3,
};

type Props = {
  renderCameraUI: (onTakePicture: () => Promise<void>) => React.Element<*>,
};

type State = {
  mode: $Values<typeof Modes>,
};

export default class ImageCaptureView extends React.Component<Props, State> {
  state = {
    mode: Modes.CAMERA,
  };

  _cameraRef: ?Camera;

  render() {
    let modeView;
    switch (this.state.mode) {
      case Modes.CAMERA:
        modeView = this.renderCamera();
        break;
      case Modes.IMAGE_PREVIEW:
        modeView = this.renderImagePreview();
        break;
      case Modes.GALLERY:
        modeView = this.renderGallery();
        break;
      default:
        throw new Error('Invalid mode');
    }

    return <View style={styles.container}>{modeView}</View>;
  }

  renderCamera() {
    return (
      <Camera ref={this.getCameraRef} style={{ flex: 1 }} type={Camera.Constants.Type.Back}>
        <View style={{ flex: 1 }}>{this.props.renderCameraUI(this.onTakePicture)}</View>
      </Camera>
    );
  }

  renderImagePreview() {
    // <ImageResultView imageData={this.state.capturedImageData} />;
    return <View />;
  }

  renderGallery() {
    return <View />;
  }

  onTakePicture = async () => {
    // take the picture, get the data, switch modes to IMAGE_PREVIEW
    if (!this._cameraRef) {
      return;
    }
    const pictureResult = await this._cameraRef.takePictureAsync();
    console.log(pictureResult);
  };

  getCameraRef = (cameraComponentRef: ?Camera) => {
    this._cameraRef = cameraComponentRef;
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
