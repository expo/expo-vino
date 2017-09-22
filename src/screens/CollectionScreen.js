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

  state = {
    bottles: [
      {
        key: 1,
        style: 'Rosato',
        inStock: 1,
        yearProduced: 2015,
        winery: {
          name: 'Woodenhead',
          location: {
            lat: 38.486,
            lon: -122.845,
          },
        },
        image:
          'file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540exponent%252Fexpo-wine/Camera/62db153c-cab1-4636-8dc0-09d701ff7346.jpg',
        reviews: [],
      },
      {
        key: 2,
        style: 'Zinfindel',
        inStock: 1,
        yearProduced: 2013,
        winery: {
          name: 'Harvest Moon',
          location: {
            lat: 38.475,
            lon: -122.815,
          },
        },
        image:
          'file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540exponent%252Fexpo-wine/Camera/3192e05d-20e2-4763-8f7c-559daf7b1de1.jpg',
        reviews: [],
      },
    ],
  };

  render() {
    return (
      <CollectionListView bottles={this.state.bottles} onSelectBottle={this._onSelectBottle} />
    );
  }

  _onSelectBottle = (bottle: Bottle) => {
    this.props.navigation.navigate('BottleDetail', {
      bottle,
    });
  };
}
