/**
 * @flow
 */

import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

import type { Bottle } from '../types';

type Props = {
  bottle: Bottle,
};

type State = {};

export default class BottleListItems extends React.PureComponent<Props, State> {
  render() {
    let bottle = this.props.bottle;

    return (
      <View style={styles.container}>
        <Image
          source={{ uri: bottle.image }}
          style={{ width: 100, height: 100 }}
        />
        <Text>
          {bottle.style} {bottle.yearProduced}
        </Text>
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
