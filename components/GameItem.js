import React, { Component } from 'react';
import { Text, View, FlatList } from 'react-native';
import { WhiteSpace, Flex } from 'antd-mobile';
import styles from '../styles';

class GameItem extends Component {
  render() {
    return (
      <View>
        <View>
          <Flex>
            <Flex.Item>
              <Text style={styles.gameDateShort}>Date</Text>
            </Flex.Item>
            <Flex.Item>
              <Text style={styles.gameFans}># of fans</Text>
            </Flex.Item>
          </Flex>
          <Flex>
            <Flex.Item>
              <Text style={styles.gameTeams}>Away Team @ Home Team</Text>
              <Text style={styles.gameLocation}>Location</Text>
              <Text style={styles.gameDateLong}>Full date</Text>
            </Flex.Item>
          </Flex>
        </View>
        <WhiteSpace style={styles.gameDivider} size="xl" />
      </View>
    )
  }
}

export default GameItem;
