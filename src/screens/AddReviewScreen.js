/**
 * @flow
 */

import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { MapView } from 'expo';

import LevelSelector from '../components/LevelSelector';
import type { Bottle } from '../types';

type Props = {
  bottle: Bottle,
};

type State = {};

export default class BottleDetailScreen extends React.Component<Props, State> {
  state = {
    who: '',
    borrachos: undefined,
    notes: '',
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Reviewer</Text>
        <TextInput
          onChangeText={text => {
            this.setState({ who: text });
          }}
          value={this.state.who}
        />
        <Text>How you doing?</Text>
        <LevelSelector
          icon="http://files.shandymedia.com/wp-content/uploads/2017/05/13205435/obsev-new-emojis-5.jpg"
          maxLevels={5}
          level={this.state.borrachos}
          onSelect={level => this.setState({ borrachos: level })}
        />
        <Text>Tasting Notes</Text>
        <TextInput
          onChangeText={text => {
            this.setState({ notes: text });
          }}
          value={this.state.notes}
        />
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
