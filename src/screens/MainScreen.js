/**
 * @flow
 */

import * as React from 'react';
import { View } from 'react-native';
import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';

class DummyScreen extends React.Component<{}> {
  render() {
    return <View style={{ flex: 1 }} />;
  }
}

/**
 * Collection tab stack
 */
const CollectionTabStack = StackNavigator(
  {
    Collection: { getScreen: () => require('./CollectionScreen').default },
    BottleDetail: { getScreen: () => require('./BottleDetailScreen').default },
  },
  {
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Ionicons name="ios-wine-outline" size={24} color={tintColor} />
      ),
      tabBarLabel: 'Collection',
    },
  }
);

const MapTabStack = StackNavigator(
  {
    Dummy: { screen: DummyScreen },
  },
  {
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Ionicons name="ios-map-outline" size={24} color={tintColor} />
      ),
      tabBarLabel: 'Map',
    },
  }
);

const FriendsTabStack = StackNavigator(
  {
    Dummy: { screen: DummyScreen },
  },
  {
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Ionicons name="ios-people-outline" size={30} color={tintColor} />
      ),
      tabBarLabel: 'Friends',
    },
  }
);

const SettingsTabStack = StackNavigator(
  {
    Dummy: { screen: DummyScreen },
  },
  {
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Ionicons name="ios-menu-outline" size={30} color={tintColor} />
      ),
      tabBarLabel: 'Settings',
    },
  }
);

class TabBarWithActionButton extends React.Component<{}> {
  render() {
    return <TabBarBottom {...this.props} />;
  }
}

/**
 * Tab navigator
 */
const Tabs = TabNavigator(
  {
    CollectionTab: { screen: CollectionTabStack },
    MapTab: { screen: MapTabStack },
    FriendsTab: { screen: FriendsTabStack },
    SettingsTab: { screen: SettingsTabStack },
  },
  {
    tabBarComponent: TabBarWithActionButton,
    tabBarOptions: {
      activeTintColor: '#142763',
      labelStyle: {
        marginBottom: 4,
      },
    },
  }
);

/**
 * MainScreen modals go here
 */
export default StackNavigator(
  {
    Tabs: { screen: Tabs },
    Camera: { getScreen: () => require('./CameraScreen').default },
  },
  {
    headerMode: 'none',
    mode: 'modal',
  }
);
