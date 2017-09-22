/**
 * @flow
 */

import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';

import BottleListItem from '../components/BottleListItem';
import type { Bottle } from '../types';

type Props = {
  bottles: Bottle[],
};

type State = {};

export default class CollectionScreen extends React.Component<Props, State> {
  state = {};

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.bottles}
          renderItem={elem => <BottleListItem bottle={elem.item} />}
        />
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
