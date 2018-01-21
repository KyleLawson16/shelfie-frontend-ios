import React from 'react';
import { Text, View } from 'react-native';
import { Button, ActivityIndicator, WhiteSpace } from 'antd-mobile';

import styles from './styles.js';
import { Font, Components } from 'expo';

import TopNavbar from './components/TopNavbar';
import BottomNavbar from './containers/BottomNavbar';
import LandingPage from './containers/LandingPage';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.getUser = this.getUser.bind(this);
    this.exitGame = this.exitGame.bind(this);
    this.getGame = this.getGame.bind(this);
  }
  state = { fontsAreLoaded: false, user: false, game: false };

  async componentDidMount() {
      await Font.loadAsync({
        'anticon': require('./assets/fonts/anticon.ttf'),
      });
      this.setState({fontsAreLoaded: true});
  }

  getUser(user) {
    console.log(user, 'home');
    this.setState({ user: user });
  }
  exitGame(game) {
    this.setState({ game: game });
  }
  getGame(game) {
    this.setState({ game: game });
  }

  render() {
    if (!this.state.fontsAreLoaded) {
      return <ActivityIndicator />;
    }
    else {
      if (!this.state.user) {
        return (
          <View style={styles.container}>
            <LandingPage handleUser={this.getUser} />
          </View>
        )
      }
      else {
        return (
            <View style={styles.container}>
              <WhiteSpace size="lg" />
              <TopNavbar exitGame={this.exitGame} />
              <BottomNavbar game={this.state.game} getGame={this.getGame} />
            </View>
        );
      }
    }
  }
}

export default App;
