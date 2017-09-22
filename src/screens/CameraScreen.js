/**
 * @flow
 */

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
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
    this.getCameraPermissions();
  }

  async getCameraPermissions() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === 'granted',
    });
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
          <ImageCaptureView
            renderCameraUI={onTakePicture => <CameraUI onTakePicture={onTakePicture} />}
          />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
