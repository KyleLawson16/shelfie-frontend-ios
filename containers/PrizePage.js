import React, { Component } from 'react';
import { View, Text, FlatList, ScrollView } from 'react-native';
import { WhiteSpace, Flex } from 'antd-mobile';
import styles from '../styles';

import PrizeCarousel from '../components/PrizeCarousel';

class PrizePage extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <View>
        <Flex justify="center" style={styles.greyHeaderBar}>
          <Text style={styles.challengeHeader}>Prizes</Text>
        </Flex>
        <PrizeCarousel prizes={this.props.prizes} />
      </View>
    )
  }
}

export default PrizePage;
