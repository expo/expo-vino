/**
 * @flow
 */

import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';

import BottleListItem from '../components/BottleListItem';
import type { Bottle } from '../types';

type Props = {
  onSelectBottle: (bottle: Bottle) => void,
  bottles: Bottle[],
};

type State = {};

export default class CollectionListView extends React.Component<Props, State> {
  state = {};

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.bottles}
          renderItem={elem => <BottleListItem bottle={elem.item} onPressItem={this._onPressItem} />}
        />
      </View>
    );
  }

  _onPressItem = bottle => {
    this.props.onSelectBottle(bottle);
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
