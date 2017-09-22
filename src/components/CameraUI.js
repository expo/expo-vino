/**
 * @flow
 */

import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Entypo } from '@expo/vector-icons';

type Props = {
  onTakePicture: () => void | Promise<void>,
};

type State = {};

export default class CameraUI extends React.Component<Props, State> {
  render() {
    return (
      <View style={styles.container}>
        <CameraControls style={styles.cameraControlsLayout} onTakePicture={this.onTakePicture} />
      </View>
    );
  }

  onTakePicture = () => {
    this.props.onTakePicture();
  };
}

class CameraControls extends React.Component<{ style: any, onTakePicture: () => void }> {
  render() {
    return (
      <View style={[this.props.style, styles.cameraControlsContainer]}>
        <TouchableOpacity onPress={this.props.onTakePicture}>
          <View style={styles.buttonContainer}>
            <Entypo name="camera" size={32} color="black" />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  cameraControlsLayout: {},
  buttonContainer: {
    backgroundColor: 'white',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraControlsContainer: {
    width: '100%',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
