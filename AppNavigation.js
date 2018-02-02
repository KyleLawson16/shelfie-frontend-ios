import React from 'react';
import { Text, View, AsyncStorage } from 'react-native';
import { Button, ActivityIndicator, WhiteSpace } from 'antd-mobile';
import styles from './styles.js';

import { connect } from 'react-redux';
import { fetchUser } from './actions';

import TopNavbar from './components/TopNavbar';
import BottomNavbar from './containers/BottomNavbar';
import LandingPage from './containers/LandingPage';
import SubmissionPage from './containers/SubmissionPage';

class AppNavigation extends React.Component {
  constructor(props) {
    super(props);

    this.getUser = this.getUser.bind(this);
    this.exitGame = this.exitGame.bind(this);
    this.getGame = this.getGame.bind(this);
    this.handleBackBtn = this.handleBackBtn.bind(this);
    this.beginSubmission = this.beginSubmission.bind(this);
  }

  state = { user: false, token: false, game: false, backBtn: false, submission: false, loading: true };

  componentDidMount = async () => {
    console.log("did mount");
    try {
      const token = await AsyncStorage.getItem('@MySuperStore:token');
      const userID = await AsyncStorage.getItem('@MySuperStore:user');
      this.setState({ token: token });

      if (userID !== null){
        this.props.fetchUser(token, userID)
        .then((res) => {
          console.log(res.payload.data);
          this.setState({ user: res.payload.data, loading: false });
        })

      }
    } catch (error) {
      // Error retrieving data
    }
  }

  getUser = async (obj) => {
    this.setState({ user: obj.user });
    try {
      await AsyncStorage.setItem('@MySuperStore:token', obj.token);
      await AsyncStorage.setItem('@MySuperStore:user', obj.user.random_user_id);
    } catch (error) {
      // Error saving data
    }
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
      if (!this.state.user) {
        return (
          <View style={styles.container}>
            <LandingPage handleUser={this.getUser} />
            {this.state.loading
              ? <ActivityIndicator toast text="loading" />
              : null
            }
          </View>
        )
      }
      else if (this.state.submission) {
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
              user={this.state.user}
              token={this.state.token}
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

function mapStateToProps(state) {
  return { pitches: state.pitches };
}

export default connect(mapStateToProps, {fetchUser})(AppNavigation);
