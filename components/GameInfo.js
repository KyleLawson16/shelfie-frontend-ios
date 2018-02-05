import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import { Flex, WhiteSpace } from 'antd-mobile';
import moment from 'moment';
import styles from '../styles';


// Props
// awayTeam : Away team
// homeTeam : Home team
// date : Game date
// time : Game time

class GameInfo extends Component {
  render() {
    return (
      <View>
        <Text style={styles.gameInfoHeader}>{this.props.awayTeam} @ {this.props.homeTeam}</Text>
        <Text style={styles.gameInfoDate}>{moment.parseZone(this.props.date).calendar()}</Text>
      </View>
    )
  }
}

export default GameInfo;
