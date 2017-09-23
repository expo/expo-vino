/**
 * @flow
 */

import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { MapView } from 'expo';

import type { Bottle } from '../types';

type Props = {
  icon: string,
  maxLevels: number,
  onSelect: int => void,
};

export default class LevelSelector extends React.Component<Props, State> {
  state = {
    selectedLevel: 0,
  };

  _setLevel = level => {
    this.setState({
      selectedLevel: level,
    });
    this.props.onSelect(level + 1);
  };

  render() {
    const { icon, maxLevels, onSelect } = this.props;
    const { selectedLevel } = this.state;

    const selectables = [...Array(maxLevels).keys()].map(level => {
      <View onClick={this._setLevel(level)}>
        <Text>x</Text>
        <Image
          source={{ uri: icon }}
          style={{
            flex: 1,
            opacity: level <= selectedLevel ? 1.0 : 0.5,
          }}
        />
      </View>;
    });
    return (
      <View style={styles.container}>
        {selectables}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
