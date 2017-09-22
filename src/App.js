/**
 * @flow
 */

import * as React from 'react';
import { View, StatusBar } from 'react-native';
import { StackNavigator } from 'react-navigation';

/**
 * Root navigator for app. Main app + onboarding/login go here
 */
const RootNavigator = StackNavigator(
  {
    Main: { getScreen: () => require('./screens/MainScreen').default },
  },
  {
    headerMode: 'none',
  }
);

export default class App extends React.Component<{}> {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar hidden={false} />
        <RootNavigator />
      </View>
    );
  }
}
