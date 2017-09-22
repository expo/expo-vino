/**
 * @flow
 */

import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { MapView } from 'expo';

import GrowLocation from '../components/GrowLocation';
import type { Bottle } from '../types';

type Props = {
  bottle: Bottle,
};

type State = {};

export default class BottleDetailScreen extends React.Component<Props, State> {
  state = {};

  render() {
    const bottle = this.props.bottle;
    return (
      <View style={styles.container}>
        <Text>
          {bottle.winery.name}
        </Text>
        <Text>
          {bottle.style}
        </Text>
        <Text>
          {bottle.yearProduced}
        </Text>
        <GrowLocation winery={bottle.winery} />
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