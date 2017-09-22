/**
 * @flow
 */

import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { Modes } from './ImageCaptureView';
import type { ModesT } from './ImageCaptureView';

type MaybePromiseFn<X> = () => X | Promise<X>;

type Props = {
  mode: ModesT,
  onTakePicture: MaybePromiseFn<void>,
  onDiscard: MaybePromiseFn<void>,
  onCancel: MaybePromiseFn<void>,
};

type State = {};

export default class CameraUI extends React.Component<Props, State> {
  render() {
    return (
      <View style={styles.container}>
        <CameraControls
          imageCaptureMode={this.props.mode}
          onTakePicture={this.onTakePicture}
          onDiscard={this.onDiscard}
          onCancel={this.onCancel}
        />
      </View>
    );
  }

  onTakePicture = () => {
    this.props.onTakePicture();
  };

  onDiscard = () => {
    this.props.onDiscard();
  };

  onCancel = () => {
    this.props.onCancel();
  };
}

type CameraControlsProps = {
  style?: any,
  imageCaptureMode: ModesT,
  onTakePicture: MaybePromiseFn<void>,
  onDiscard: MaybePromiseFn<void>,
  onCancel: MaybePromiseFn<void>,
};

class CameraControls extends React.Component<CameraControlsProps> {
  render() {
    let centerButton = this.renderCenterButton();
    let leftButton = this.renderLeftButton();
    let rightButton = this.renderRightButton();
    return (
      <View style={[this.props.style, styles.cameraControlsContainer]}>
        {leftButton}
        {centerButton}
        {rightButton}
      </View>
    );
  }

  renderLeftButton() {
    return (
      <View style={{ flex: 1, alignItems: 'center' }}>
        <TouchableOpacity onPress={this.props.onCancel}>
          <View style={styles.smallButtonContainer}>
            <Entypo
              name="back"
              size={22}
              color="white"
              style={{ marginTop: 2, backgroundColor: 'transparent' }}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  renderCenterButton() {
    let cameraIcon = <Entypo name="camera" size={35} color="black" />;
    let discardIcon = (
      <Entypo name="ccw" size={35} color="black" style={{ marginLeft: -2, marginTop: 2 }} />
    );
    let currentIcon;
    let onPress;
    switch (this.props.imageCaptureMode) {
      case Modes.CAMERA:
        currentIcon = cameraIcon;
        onPress = this.props.onTakePicture;
        break;
      case Modes.IMAGE_PREVIEW:
        currentIcon = discardIcon;
        onPress = this.props.onDiscard;
        break;
      default:
        throw new Error('Invalid mode.');
    }
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <TouchableOpacity onPress={onPress}>
          <View style={styles.buttonContainer}>{currentIcon}</View>
        </TouchableOpacity>
      </View>
    );
  }

  renderRightButton() {
    return <View style={{ flex: 1 }} />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  cameraControlsLayout: {},
  smallButtonContainer: {
    backgroundColor: 'rgba(0, 0, 0, .8)',
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    backgroundColor: 'rgba(255, 255, 255, .8)',
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#888888',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraControlsContainer: {
    width: '100%',
    height: 120,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
