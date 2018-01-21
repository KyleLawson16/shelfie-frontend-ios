import React, { Component } from 'react';
import { Text, ScrollView, FlatList } from 'react-native';
import { WhiteSpace, Flex } from 'antd-mobile';
import styles from '../styles';

import GameItem from '../components/GameItem';

class GamesPage extends Component {
  constructor(props) {
    super(props);

  }
  render() {
    return (
      <ScrollView>
        <Flex justify="center" style={styles.greyHeaderBar}>
          <Text style={styles.challengeHeader}>Games</Text>
        </Flex>
        <FlatList
          data={[{key: 'a'}, {key: 'b'}, {key: 'c'}]}
          renderItem={({item}) => <GameItem key={item.key} />}
        />
      </ScrollView>
    )
  }
}

export default GamesPage;
