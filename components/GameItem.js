import React, { Component } from 'react';
import { Text, View, FlatList } from 'react-native';
import { WhiteSpace, Flex } from 'antd-mobile';
import styles from '../styles';

class GameItem extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <View>
        <View>
          <Flex>
            <Flex.Item>
              <Text style={styles.gameDateShort}>{this.props.date}</Text>
            </Flex.Item>
            <Flex.Item>
              <Text style={styles.gameFans}># of fans</Text>
            </Flex.Item>
          </Flex>
          <Flex>
            <Flex.Item>
              <Text style={styles.gameTeams}>{this.props.awayTeam} @ {this.props.homeTeam}</Text>
              <Text style={styles.gameLocation}>{this.props.location}</Text>
              <Text style={styles.gameDateLong}>{this.props.date}</Text>
            </Flex.Item>
          </Flex>
        </View>

      </View>
    )
  }
}

export default GameItem;
