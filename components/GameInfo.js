import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import { Flex, WhiteSpace } from 'antd-mobile';
import styles from '../styles';

class GameInfo extends Component {
  render() {
    return (
      <View>
        <Text style={styles.gameInfoHeader}>{this.props.awayTeam} @ {this.props.homeTeam}</Text>
        <Text style={styles.gameInfoDate}>{this.props.date}, {this.props.time}</Text>
      </View>
    )
  }
}

export default GameInfo;
