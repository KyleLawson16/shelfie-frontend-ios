import React, { Component } from 'react';
import { View, ScrollView, FlatList, Text } from 'react-native';
import { WhiteSpace, List, Flex } from 'antd-mobile';
import styles from '../styles';

import LeaderboardItem from '../components/LeaderboardItem';

class LeaderboardPage extends Component {
  render() {
    const data = [
      {
        key: 1,
        username: 'KyleLawson16',
        points: 175
      },
      {
        key: 2,
        username: 'ToughGuy',
        points: 153
      },
      {
        key: 3,
        username: 'SportsFan',
        points: 78
      }
    ];

    return (
      <ScrollView>
        <Flex justify="center" style={styles.greyHeaderBar}>
          <Text style={styles.challengeHeader}>Leaderboards</Text>
        </Flex>
        <List>
          <FlatList
            data={data}
            renderItem={({item}) => <LeaderboardItem key={item.key} username={item.username} points={item.points} />}
          />
        </List>
      </ScrollView>
    )
  }
}

export default LeaderboardPage;