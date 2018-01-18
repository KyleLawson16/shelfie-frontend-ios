import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import { Flex, WhiteSpace, WingBlank, Button } from 'antd-mobile';
import styles from '../styles';

class UserInfo extends Component {
  render() {
    return (
      <WingBlank>
        <Flex
          align="start"
        >
          <Flex.Item style={{zIndex: 9999}}>
            <Image
              source={require('../assets/images/profile_photo.png')}
              style={styles.userPhoto}
            />
          </Flex.Item>
          <Flex.Item>
            <Text style={styles.userStats}>
              <Text style={styles.userStatsNum}>11{"\n"}</Text>
              <Text style={styles.userStatsLabel}>points</Text>
            </Text>
          </Flex.Item>
          <Flex.Item>
            <Text style={styles.userStats}>
              <Text style={styles.userStatsNum}>11{"\n"}</Text>
              <Text style={styles.userStatsLabel}>followers</Text>
            </Text>
          </Flex.Item>
          <Flex.Item>
            <Text style={styles.userStats}>
              <Text style={styles.userStatsNum}>11{"\n"}</Text>
              <Text style={styles.userStatsLabel}>following</Text>
            </Text>
          </Flex.Item>
        </Flex>
        <Flex
          justify="end"
        >
          <Button style={styles.userEditBtn}>
            <Text style={{fontSize: 14}}>Edit Profile</Text>
          </Button>
        </Flex>
        <WhiteSpace />
        <Flex
          align="start"
        >
          <Flex.Item>
            <Text style={styles.userName}>Username</Text>
            <Text>Favorite Team</Text>
          </Flex.Item>
        </Flex>
      </WingBlank>
    )
  }
}

export default UserInfo;
