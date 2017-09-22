/**
 * @flow
 */

import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { MapView } from 'expo';

import type { Winery } from '../types';

type Props = {
  winery: Winery,
};

type State = {};

export default class BottleListItems extends React.PureComponent<Props, State> {
  render() {
    let winery = this.props.winery;
    const mapAreaDelta = 0.1;

    const location = {
      latitude: winery.location.lat,
      longitude: winery.location.lon,
    };
    return (
      <MapView
        style={{ flex: 1 }}
        region={{
          latitude: winery.location.lat,
          longitude: winery.location.lon,
          latitudeDelta: mapAreaDelta,
          longitudeDelta: mapAreaDelta,
        }}>
        <MapView.Marker title={winery.name} coordinate={location} />
      </MapView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
