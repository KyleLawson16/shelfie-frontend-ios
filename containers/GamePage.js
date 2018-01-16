import React, { Component } from 'react';
import { View } from 'react-native';
import styles from '../styles';

import TopNavbar from '../components/TopNavbar';
import GameInfo from '../components/GameInfo';
import GameNavbar from '../components/GameNavbar';
import BottomNavbar from '../components/BottomNavbar';

class GamePage extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TopNavbar />
        <GameInfo />
        <GameNavbar />
        <BottomNavbar />
      </View>
    )
  }
}

export default GamePage;
