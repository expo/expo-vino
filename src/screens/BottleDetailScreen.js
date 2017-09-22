/**
 * @flow
 */

import React from 'react';
import { StyleSheet, View } from 'react-native';
import BottleDetailView from '../components/BottleDetailView';

import type { Bottle } from '../types';

type Props = {
  bottle: Bottle,
};

export default class BottleDetailScreen extends React.Component<Props> {
  render() {
    const { params } = this.props.navigation.state;
    console.log(params);
    return (
      <View style={styles.container}>
        <BottleDetailView bottle={params.bottle} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
