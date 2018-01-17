import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import { Flex, WhiteSpace } from 'antd-mobile';
import styles from '../styles';

class GameInfo extends Component {
  render() {
    return (
      <View>
        <Text>Away Team @ Home Team</Text>
        <Text>Date, Time</Text>
      </View>
    )
  }
}

export default GameInfo;
