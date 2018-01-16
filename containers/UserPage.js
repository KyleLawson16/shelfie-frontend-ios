import React, { Component } from 'react';
import { View } from 'react-native';
import { WhiteSpace } from 'antd-mobile';
import styles from '../styles';

import UserInfo from '../components/UserInfo';
import UserSubmissions from '../components/UserSubmissions';

class UserPage extends Component {
  render() {
    return (
      <View style={styles.container}>
        <UserInfo />
        <WhiteSpace />
        <UserSubmissions />
      </View>
    )
  }
}

export default UserPage;
