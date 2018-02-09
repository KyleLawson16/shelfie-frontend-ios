import React, { Component } from 'react';
import { View, Text, FlatList, ScrollView } from 'react-native';
import { WhiteSpace, Flex } from 'antd-mobile';
import styles from '../styles';
import Icon from 'react-native-vector-icons/Ionicons';

import ChallengeCarousel from '../components/ChallengeCarousel';

class ChallengePage extends Component {
  constructor(props) {
    super(props);

    this.beginSubmission = this.beginSubmission.bind(this);
  }

  beginSubmission(submission) {
    this.props.submission(submission);
  }

  render() {
    return (
      <ScrollView>
        <Flex justify="center" style={styles.greyHeaderBar}>
          <Text style={styles.challengeHeader}>Challenges</Text>
        </Flex>
        <FlatList
          style={styles.container}
          data={this.props.challenges}
          renderItem={({item}) =>
          <ChallengeCarousel
            key={item.point_value}
            ptValue={item.point_value}
            challenges={item.challenges}
            submission={this.beginSubmission} />
          }
          keyExtractor={(item, index) => index}
        />
      </ScrollView>
    )
  }
}

export default ChallengePage;
