import React, { Component } from 'react';
import { View } from 'react-native';
import styles from '../styles';

import UserInfo from '../components/UserInfo';

class UserPage extends Component {
  render() {
    return (
      <View style={styles.container}>
        <UserInfo />
      </View>
    )
  }
}

export default UserPage;
