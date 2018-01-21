import React, { Component } from 'react';
import { View } from 'react-native';
import { WhiteSpace } from 'antd-mobile';
import styles from '../styles';

import GameInfo from '../components/GameInfo';
import GameNavbar from './GameNavbar';

class GamePage extends Component {
  render() {
    return (
      <View style={styles.container}>
        <WhiteSpace size="md" />
        <GameInfo
          awayTeam="Boston Red Sox"
          homeTeam="San Francisco Giants"
          date="February 21st"
          time="4:30pm"
        />
        <WhiteSpace size="lg" />
        <GameNavbar activeTabColor="rgb(93,188,210)" />
      </View>
    )
  }
}

export default GamePage;
