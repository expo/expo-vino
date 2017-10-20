import React from 'react';
import { Font } from 'expo';
import { createIconSet } from '@expo/vector-icons';
const glyphMap = {
  'icon-wine': 61696,
  'icon-pepper': 61697,
  'icon-cheese': 61698,
  'icon-fish': 61699,
  'icon-chicken': 616700,
  'icon-pig': 616701,
  'icon-cow': 616702,
};
const CustomIcon = createIconSet(glyphMap, 'CustomFont');

export default class CustomIconExample extends React.Component {
  state = {
    fontLoaded: false,
  };
  async componentDidMount() {
    await Font.loadAsync({
      CustomFont: require('../../assets/fonts/fontello.ttf'),
    });

    this.setState({ fontLoaded: true });
  }
  render() {
    if (!this.state.fontLoaded) {
      return null;
    }

    return (
      <CustomIcon
        name={`icon-${this.props.icon}`}
        size={32}
        color={this.props.color}
      />
    );
  }
}
