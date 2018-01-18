import React, { Component } from 'react';
import { View, ScrollView, FlatList } from 'react-native';
import { WhiteSpace, List } from 'antd-mobile';
import styles from '../styles';

import LeaderboardItem from '../components/LeaderboardItem';

class LeaderboardPage extends Component {
  render() {
    const data = [
      'post1',
      'post2',
      'post3',
      'post1',
      'post2',
      'post3',
      'post1',
      'post2',
      'post3',
      'post1',
      'post2',
      'post3',
    ];

    return (
      <ScrollView>
        <List renderHeader={() => 'Leaderboards'}>
          <FlatList
            data={data}
            renderItem={({item}) => <LeaderboardItem key={item} />}
          />
        </List>
      </ScrollView>
    )
  }
}

export default LeaderboardPage;
