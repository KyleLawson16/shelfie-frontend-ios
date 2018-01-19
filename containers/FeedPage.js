import React, { Component } from 'react';
import { View, Text, FlatList, ScrollView } from 'react-native';
import { Flex } from 'antd-mobile';
import styles from '../styles';

import ChallengeSubmissions from '../components/ChallengeSubmissions';

class FeedPage extends Component {
  render() {
    return (
      <ScrollView>
        <Flex justify="center" style={styles.greyHeaderBar}>
          <Text style={styles.challengeHeader}>Game Feed</Text>
        </Flex>
        <FlatList
          data={[{key: 'a'}, {key: 'b'}, {key: 'c'}]}
          renderItem={({item}) => <ChallengeSubmissions key={item.key} />}
        />
      </ScrollView>
    )
  }
}

export default FeedPage;
