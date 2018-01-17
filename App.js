import React from 'react';
import { Text, View } from 'react-native';
import { Button, ActivityIndicator } from 'antd-mobile';
import styles from './styles.js';
import { Font, Components } from 'expo';

import SignIn from './containers/SignIn';
import SignUp from './containers/SignUp';
import GamePage from './containers/GamePage';
import UserPage from './containers/UserPage';

export default class App extends React.Component {

  state = { fontsAreLoaded: false };

  async componentDidMount() {
      await Font.loadAsync({
        'anticon': require('./assets/fonts/anticon.ttf'),
      });
      this.setState({fontsAreLoaded: true});
  }
  render() {
    if (!this.state.fontsAreLoaded) {
      return <ActivityIndicator />;
    }
    else {
      return (
        <View style={styles.container}>
          <GamePage />
        </View>
      );
    }

  }
}
