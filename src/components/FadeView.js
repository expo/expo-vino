/**
 * @flow
 */

import * as React from 'react';
import { Animated, View } from 'react-native';

type Props = {};
type State = {};

export default class FadeView extends React.Component<Props, State> {
  _animatedValues = {
    opacity: new Animated.Value(0),
  };

  constructor(props: Props) {
    super();
    this._animatedValues.opacity = new Animated.Value(props.visible ? 1 : 0);
  }

  componentWillReceiveProps(nextProps: Props) {
    if (!this.props.visible && nextProps.visible) {
      Animated.timing(this._animatedValues.opacity, {
        useNativeDriver: true,
        toValue: 1,
        duration: 100,
      }).start();
    } else if (this.props.visible && !nextProps.visible) {
      Animated.timing(this._animatedValues.opacity, {
        useNativeDriver: true,
        toValue: 0,
        duration: 100,
      }).start();
    }
  }

  render() {
    return (
      <View style={this.props.style}>
        <Animated.View style={[this.props.style, { opacity: this._animatedValues.opacity }]}>
          {this.props.children}
        </Animated.View>
      </View>
    );
  }
}
