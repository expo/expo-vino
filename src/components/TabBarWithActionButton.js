/**
 * @flow
 */

import * as React from 'react';
import { Animated, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { TabBarBottom } from 'react-navigation';

export default class TabBarWithActionButton extends TabBarBottom {
  render() {
    const { style, extraTabsAtIndicies } = this.props;
    const tabElementsForRoutes = this.getTabElementsForRoutes();

    let allTabs = tabElementsForRoutes;

    if (extraTabsAtIndicies) {
      Object.keys(extraTabsAtIndicies).map(index => {
        const elementToInsert = extraTabsAtIndicies[index]();
        allTabs.splice(parseInt(index, 10), 0, elementToInsert);
      });
    }

    return (
      <Animated.View style={[styles.tabBar, style]}>
        {allTabs.map((tab, i) => (
          <View style={styles.tab} key={i}>
            {tab}
          </View>
        ))}
      </Animated.View>
    );
  }

  getTabElementsForRoutes() {
    const {
      position,
      navigation,
      jumpToIndex,
      activeBackgroundColor,
      inactiveBackgroundColor,
      style,
      tabStyle,
    } = this.props;
    const { routes } = navigation.state;

    // Prepend '-1', so there are always at least 2 items in inputRange
    const inputRange = [-1, ...routes.map((x: *, i: number) => i)];
    return routes.map((route: NavigationRoute, index: number) => {
      const focused = index === navigation.state.index;
      const scene = { route, index, focused };
      const outputRange = inputRange.map(
        (inputIndex: number) =>
          inputIndex === index ? activeBackgroundColor : inactiveBackgroundColor
      );
      const backgroundColor = position.interpolate({
        inputRange,
        outputRange: (outputRange: Array<string>),
      });
      const justifyContent = this.props.showIcon ? 'flex-end' : 'center';
      return (
        <TouchableWithoutFeedback key={route.key} onPress={() => jumpToIndex(index)}>
          <Animated.View style={[styles.tab, { backgroundColor, justifyContent }, tabStyle]}>
            {this._renderIcon(scene)}
            {this._renderLabel(scene)}
          </Animated.View>
        </TouchableWithoutFeedback>
      );
    });
  }
}

const styles = StyleSheet.create({
  tabBar: {
    height: 49, // Default tab bar height in iOS 10
    flexDirection: 'row',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(0, 0, 0, .3)',
    backgroundColor: '#F7F7F7', // Default background color in iOS 10
  },
  tab: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-end',
  },
  icon: {
    flexGrow: 1,
  },
  label: {
    textAlign: 'center',
    fontSize: 10,
    marginBottom: 1.5,
    backgroundColor: 'transparent',
  },
});
