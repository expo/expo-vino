/**
 * @flow
 */

import * as React from 'react';
import { StyleSheet, View, TouchableWithoutFeedback } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { Entypo, Ionicons } from '@expo/vector-icons';

import TabBarWithActionButton from '../components/TabBarWithActionButton';

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
    AddReview: { getScreen: () => require('./AddReviewScreen').default },
    Collection: { getScreen: () => require('./CollectionScreen').default },
    BottleDetail: { getScreen: () => require('./BottleDetailScreen').default },
  },
  {
    initialRouteName: 'AddReview',
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

class TabBarWithCameraButton extends React.Component<{}> {
  render() {
    return (
      <TabBarWithActionButton
        extraTabsAtIndicies={{
          '2': () => (
            <TouchableWithoutFeedback onPress={this._onCameraPress}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: -10,
                }}>
                <View
                  style={{
                    width: 70,
                    height: 70,
                    borderRadius: 35,
                    borderWidth: StyleSheet.hairlineWidth,
                    borderColor: 'rgba(0, 0, 0, .3)',
                    backgroundColor: '#142763',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Entypo
                    name="camera"
                    size={35}
                    color="white"
                    style={{ backgroundColor: 'transparent' }}
                  />
                </View>
              </View>
            </TouchableWithoutFeedback>
          ),
        }}
        {...this.props}
      />
    );
  }

  _onCameraPress = () => {
    this.props.navigation.navigate('Camera');
  };
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
    tabBarComponent: TabBarWithCameraButton,
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
