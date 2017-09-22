/**
 * @flow
 */

import { StackNavigator, TabNavigator } from 'react-navigation';

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
      tabBarLabel: 'Collection',
    },
  }
);

/**
 * Tab navigator
 */
const Tabs = TabNavigator({
  CollectionTab: { screen: CollectionTabStack },
});

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
