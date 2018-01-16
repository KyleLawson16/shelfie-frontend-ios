import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import { Flex, WhiteSpace, WingBlank } from 'antd-mobile';
import styles from '../styles';

class ChallengeSubmissions extends Component {
  render() {
    return (
      <View>
        <WingBlank>
          <Flex>
            <Flex.Item>
              <Text>Challenge Name</Text>
            </Flex.Item>
            <Flex.Item>
              <Text style={{textAlign: 'right'}}>Team Vs Team</Text>
            </Flex.Item>
          </Flex>
        </WingBlank>
        <Flex>
          <Image
            source={require('../assets/images/image.png')}
            style={styles.challengeSubmissionPhoto}
          />
        </Flex>
      </View>
    )
  }
}

export default ChallengeSubmissions;
