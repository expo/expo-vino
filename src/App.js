/**
 * @flow
 */

import * as React from 'react';
import { View, StatusBar } from 'react-native';
import { StackNavigator } from 'react-navigation';
import MainScreen from './screens/MainScreen';

/**
 * Root navigator for app. Main app + onboarding/login go here
 */
const RootNavigator = StackNavigator(
  {
    Main: {
      getScreen: () => require('./screens/MainScreen').default,
    },
  },
  {
    headerMode: 'none',
  }
);

export default class App extends React.Component<{}> {
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
      <View style={{ flex: 1 }}>
        <StatusBar hidden={false} />
        <RootNavigator
          screenProps={{
            globalState: this.state,
            addBottle: bottle => {
              this.setState({
                bottles: [...this.state.bottles, bottle],
              });
            },
          }}
        />
      </View>
    );
  }
}
