/**
 * @flow
 */

import * as React from 'react';
import CollectionListView from '../components/CollectionListView';
import type { Bottle } from '../types';

type Props = {
  navigation: any,
};

type State = {
  bottles: Bottle[],
};

export default class CollectionScreen extends React.Component<Props, State> {
  static navigationOptions = {
    title: 'My Collection',
  };

  render() {
    return (
      <CollectionListView
        bottles={this.props.screenProps.globalState.bottles}
        onSelectBottle={this._onSelectBottle}
      />
    );
  }

  _onSelectBottle = (bottle: Bottle) => {
    this.props.navigation.navigate('BottleDetail', {
      bottle,
    });
  };
}
