import React from 'react';
import { Text, View } from 'react-native';
import { Button } from 'antd-mobile';
import styles from './styles.js';

import SignIn from './containers/SignIn';
import SignUp from './containers/SignUp';
import GamePage from './containers/GamePage';
import UserPage from './containers/UserPage';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <UserPage />
      </View>
    );
  }
}
