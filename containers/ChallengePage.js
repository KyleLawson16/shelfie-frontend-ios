import React, { Component } from 'react';
import { View, Text, FlatList, ScrollView } from 'react-native';
import { WhiteSpace, Flex } from 'antd-mobile';
import styles from '../styles';

import ChallengeCarousel from '../components/ChallengeCarousel';

class ChallengePage extends Component {
  render() {
    const sampleData = [
      {
        key: 'a',
        ptValue: '10',
        challenges: [
          {
            name: 'Cheer on your team',
            description: 'this is sample filler text'
          },
          {
            name: 'Player photo',
            description: 'Take a photo with a player on the bench'
          },
          {
            name: 'Autograph',
            description: 'Get an autograph from a player'
          }
        ]
      },
      {
        key: 'b',
        ptValue: '5',
        challenges: [
          {
            name: 'Cheer on your team',
            description: 'this is sample filler text'
          },
          {
            name: 'Player photo',
            description: 'Take a photo with a player on the bench'
          },
          {
            name: 'Autograph',
            description: 'Get an autograph from a player'
          }
        ]
      },
      {
        key: 'c',
        ptValue: '1',
        challenges: [
          {
            name: 'Cheer on your team',
            description: 'this is sample filler text'
          },
          {
            name: 'Player photo',
            description: 'Take a photo with a player on the bench'
          },
          {
            name: 'Autograph',
            description: 'Get an autograph from a player'
          }
        ]
      }
    ]
    return (
      <View>
        <ScrollView>
        <WhiteSpace size="sm" />
        <Flex justify="center">
          <Text style={styles.challengeHeader}>Challenges</Text>
        </Flex>
        <FlatList
          data={sampleData}
          renderItem={({item}) => <ChallengeCarousel key={item.key} ptValue={item.ptValue} challenges={item.challenges} />}
        />
        </ScrollView>
      </View>
    )
  }
}

export default ChallengePage;
