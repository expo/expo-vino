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
  options: Object,
  selection: ?string,
  onSelect: string => void,
};

export default class RadioSelector extends React.Component<Props, State> {
  render() {
    const { options, onSelect, selection } = this.props;

    let selectables = [];
    for (const item of Object.keys(options)) {
      selectables.push(
        <TouchableWithoutFeedback key={item} onPress={() => onSelect(item)}>
          <View
            style={{
              height: 50,
              width: 50,
              opacity: item === selection ? 1.0 : 0.25,
            }}>
            {options[item]}
          </View>
        </TouchableWithoutFeedback>
      );
    }
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
