import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { WhiteSpace } from 'antd-mobile';
import styles from '../styles';

import UserInfo from '../components/UserInfo';
import UserSubmissions from '../components/UserSubmissions';

class UserPage extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <UserInfo />
          <WhiteSpace />
          <UserSubmissions />
        </ScrollView>
      </View>
    )
  }
}

export default UserPage;
