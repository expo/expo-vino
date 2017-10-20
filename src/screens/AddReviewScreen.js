/**
 * @flow
 */

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Button,
  Image,
} from 'react-native';
import { MapView } from 'expo';

import LevelSelector from '../components/LevelSelector';
import RadioSelector from '../components/RadioSelector';
import MultiSelector from '../components/MultiSelector';

import CustomIconExample from '../components/CustomFont';
import type { Bottle } from '../types';

type Props = {
  bottle: Bottle,
};

type State = {};

export default class BottleDetailScreen extends React.Component<Props, State> {
  state = {
    who: '',
    borrachos: undefined,
    rating: undefined,
    color: undefined,
    pairings: [],
    notes: '',
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <ScrollView style={styles.container}>
        <Button
          title="Add to Collection"
          onPress={() => navigate('Collection')}
        />
        <View style={styles.section}>
          <Text>Reviewer</Text>
          <TextInput
            onChangeText={text => {
              this.setState({ who: text });
            }}
            value={this.state.who}
            style={[styles.outlined, styles.stayWide]}
          />
        </View>

        <View style={styles.section}>
          <Text>How you doing?</Text>
          <LevelSelector
            icon={require('../../assets/borracho.jpg')}
            maxLevels={5}
            level={this.state.borrachos}
            onSelect={level => this.setState({ borrachos: level })}
          />
        </View>

        <View style={styles.section}>
          <Text>Tasty?</Text>
          <LevelSelector
            icon={require('../../assets/winestar.jpg')}
            maxLevels={5}
            level={this.state.rating}
            onSelect={level => this.setState({ rating: level })}
          />
        </View>

        <View style={styles.section}>
          <Text>Color</Text>
          <RadioSelector
            options={{
              red: <CustomIconExample icon="wine" color="red" />,
              rose: <CustomIconExample icon="wine" color="pink" />,
              white: <CustomIconExample icon="wine" color="orange" />,
            }}
            selection={this.state.color}
            onSelect={level => this.setState({ color: level })}
          />
        </View>

        <View style={styles.section}>
          <Text>Pairings</Text>
          <MultiSelector
            options={{
              wine: <CustomIconExample icon="wine" color="red" />,
              pepper: <CustomIconExample icon="pepper" color="green" />,
              cheese: <CustomIconExample icon="cheese" color="orange" />,
              fish: <CustomIconExample icon="fish" color="pink" />,
            }}
            selection={this.state.pairings}
            onSelect={level => this.setState({ pairings: level })}
          />
        </View>

        <View style={styles.section}>
          <Text>Tasting Notes</Text>
          <TextInput
            onChangeText={text => {
              this.setState({ notes: text });
            }}
            value={this.state.notes}
            style={[styles.outlined, styles.stayWide]}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  section: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    paddingTop: 10,
    paddingHorizontal: 5,
  },
  outlined: {
    borderWidth: 1,
    borderRadius: 5,
  },
  stayWide: {
    width: '100%',
  },
});
