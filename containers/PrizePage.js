import React, { Component } from 'react';
import { View, Text, FlatList, ScrollView } from 'react-native';
import { WhiteSpace, Flex } from 'antd-mobile';
import styles from '../styles';

import PrizeCarousel from '../components/PrizeCarousel';

class PrizePage extends Component {
  render() {
    const sampleData = [
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
    return (
      <View>
        <Flex justify="center" style={styles.greyHeaderBar}>
          <Text style={styles.challengeHeader}>Prizes</Text>
        </Flex>
        <PrizeCarousel prizes={sampleData} />
      </View>
    )
  }
}

export default PrizePage;
