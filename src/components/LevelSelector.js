/**
 * @flow
 */

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import { MapView } from 'expo';

import type { Bottle } from '../types';

type Props = {
  icon: string,
  maxLevels: number,
  level: ?number,
  onSelect: int => void,
};

export default class LevelSelector extends React.Component<Props, State> {
  _setLevel = level => {
    this.props.onSelect(level + 1);
  };

  render() {
    const { icon, maxLevels, onSelect, level } = this.props;
    const selectedLevel = level ? level - 1 : 0;

    const selectables = [...Array(maxLevels).keys()].map(level => {
      return (
        <TouchableWithoutFeedback
          key={level}
          onPress={() => this._setLevel(level)}>
          <View>
            <Image
              source={icon}
              style={{
                height: 50,
                width: 50,
                opacity: level <= selectedLevel ? 1.0 : 0.25,
              }}
            />
          </View>
        </TouchableWithoutFeedback>
      );
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
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
});
