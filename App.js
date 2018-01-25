import React from 'react';
import { Text, View } from 'react-native';
import { Button, ActivityIndicator, WhiteSpace } from 'antd-mobile';

import styles from './styles.js';

import TopNavbar from './components/TopNavbar';
import BottomNavbar from './containers/BottomNavbar';
import LandingPage from './containers/LandingPage';
import SubmissionPage from './containers/SubmissionPage';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.getUser = this.getUser.bind(this);
    this.exitGame = this.exitGame.bind(this);
    this.getGame = this.getGame.bind(this);
    this.handleBackBtn = this.handleBackBtn.bind(this);
    this.beginSubmission = this.beginSubmission.bind(this);
  }
  state = { user: false, game: false, backBtn: false, submission: true };

  getUser(user) {
    console.log(user, 'home');
    this.setState({ user: user });
  }
  handleBackBtn(backBtn) {
    this.setState({ backBtn: backBtn });
  }
  exitGame(game) {
    this.setState({ game: game, backBtn: false });
  }
  getGame(game) {
    this.setState({ game: game, backBtn: true });
  }
  beginSubmission(submission) {
    this.setState({ submission: submission });
  }

  render() {
      // if (!this.state.user) {
      //   return (
      //     <View style={styles.container}>
      //       <LandingPage handleUser={this.getUser} />
      //     </View>
      //   )
      // }
      if (this.state.submission) {
        return (
          <SubmissionPage challengeID={this.state.submission} />
        )
      }
      else {
        return (
            <View style={styles.container}>
              <WhiteSpace size="lg" />
              <TopNavbar
                exitGame={this.exitGame}
                backBtn={this.state.backBtn}
                SearchBtn={this.state.searchBtn}
              />
              <BottomNavbar
                game={this.state.game}
                getGame={this.getGame}
                handleBackBtn={this.handleBackBtn}
                submission={this.beginSubmission}
              />
            </View>
        );
      }
    }
}

export default App;
