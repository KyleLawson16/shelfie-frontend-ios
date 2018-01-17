import React, { Component } from 'react';
import { View } from 'react-native';
import { WhiteSpace } from 'antd-mobile';
import styles from '../styles';

import TopNavbar from '../components/TopNavbar';
import GameInfo from '../components/GameInfo';
import GameNavbar from '../components/GameNavbar';
import BottomNavbar from '../components/BottomNavbar';

class GamePage extends Component {
  render() {
    return (
      <View style={styles.container}>
        <WhiteSpace />
        <GameInfo />
        <WhiteSpace />
        <GameNavbar activeTabColor="blue" />
      </View>
    )
  }
}

export default GamePage;
