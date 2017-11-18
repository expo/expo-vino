/**
 * @flow
 */

import React from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { Permissions, FileSystem } from 'expo';

import CameraUI from '../components/CameraUI';
import ImageCaptureView from '../components/ImageCaptureView';

type Props = {
  navigation: any,
  onTakePicture: any,
};

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
          handlePicture={this._storeImageAndNavigate}
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
    this.props.navigation.goBack();
  };

  _storeImageAndNavigate = async (imgData) => {
    await FileSystem.copyAsync({
      from: imgData.uri,
      to: FileSystem.cacheDirectory + 'latestPicture',
    });
    this.props.navigation.navigate('AddReview');
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
