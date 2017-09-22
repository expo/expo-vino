/**
 * @flow
 */

import React from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { Permissions } from 'expo';

import CameraUI from '../components/CameraUI';
import ImageCaptureView from '../components/ImageCaptureView';

type Props = {};

type State = {
  hasCameraPermission: boolean,
  capturedImageData?: {
    width: number,
    height: number,
    uri: string,
  },
};

export default class CameraScreen extends React.Component<Props, State> {
  state = {
    hasCameraPermission: false,
  };

  componentDidMount() {
    this._getCameraPermissions();
  }

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={styles.container}>
          <StatusBar hidden />
          <ImageCaptureView
            renderCameraUI={({ mode, onTakePicture, onDiscard }) => (
              <CameraUI
                mode={mode}
                onCancel={this._onCancel}
                onDiscard={onDiscard}
                onTakePicture={onTakePicture}
              />
            )}
          />
        </View>
      );
    }
  }

  async _getCameraPermissions() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === 'granted',
    });
  }

  _onCancel = () => {
    console.log('Cancel!');
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
