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
  selection: [string],
  onSelect: string => void,
};

export default class MultiSelector extends React.Component<Props, State> {
  _toggleSelection = item => {
    let currentSelection = new Set(this.props.selection);
    if (currentSelection.has(item)) {
      currentSelection.delete(item);
    } else {
      currentSelection.add(item);
    }
    return [...currentSelection];
  };

  render() {
    const { options, onSelect, selection } = this.props;

    let selectables = [];

    for (const item of Object.keys(options)) {
      selectables.push(
        <TouchableWithoutFeedback
          key={item}
          onPress={() => onSelect(this._toggleSelection(item))}>
          <View
            style={{
              height: 50,
              width: 50,
              opacity: selection.includes(item) ? 1.0 : 0.5,
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
