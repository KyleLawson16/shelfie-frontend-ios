import React, { Component } from 'react';
import { View } from 'react-native';
import { WhiteSpace } from 'antd-mobile';
import styles from '../styles';

import { connect } from 'react-redux';
import { joinGame } from '../actions';

import GameInfo from '../components/GameInfo';
import GameNavbar from './GameNavbar';
import UserPage from './UserPage';
import TopNavbar from '../components/TopNavbar';

class GamePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sorted_challenges: false,
      other: true,
      backBtn: true,
      exitBtn: false,
      editMode: false,
      profilePicture: false
    }

    this.beginSubmission = this.beginSubmission.bind(this);
    this.getPostUser = this.getPostUser.bind(this);
    this.getSelectedPost = this.getSelectedPost.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.handleBackGame = this.handleBackGame.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.editProfilePicture = this.editProfilePicture.bind(this);
    this.finishEdit = this.finishEdit.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentWillMount() {
    this.props.joinGame(this.props.token, this.props.user.random_user_id, this.props.game.random_game_id)
    .then((res) => {
    });
    var challenges = this.props.game.challenges;
    var pt_values = [];
    for (i=0; i < challenges.length; i++) {
      if (!pt_values.includes(challenges[i]['point_value'])) // If point value of challenge has not been added to pt_values yet
        pt_values.push(challenges[i]['point_value']); // Add point value to pt_values
    }
    var sorted_challenges = [];
    pt_values.sort(function(a, b){return b-a});
    console.log(pt_values);
    pt_values.forEach(ptValue => { // for each point value
      var sorted_challenge = {}; // create an object with
      sorted_challenge['point_value'] = ptValue; // point value
      sorted_challenge['challenges'] = []; // empty list
      challenges.forEach(challenge => {
        if (challenge.point_value == ptValue) { // for each challenge with the same point value
          sorted_challenge['challenges'].push(challenge); // Add the challenge to the list of challenges
        }
      })
      sorted_challenges.push(sorted_challenge); // Add the object to the list of sorted challenges
    })
    // console.log(sorted_challenges, 'sorted');
    this.setState({ sorted_challenges: sorted_challenges });
    console.log(this.state.sorted_challenges, 'sorted challenges');
  }

  beginSubmission(submission) {
    this.props.submission(submission);
  }
  getPostUser(user) {
    if (this.props.selectedPost) {
      this.props.getSelectedPost(false);
    }
    this.props.getPostUser(user);
    if (user.random_user_id == this.props.user.random_user_id) {
      this.setState({ other: false });
    }
    else {
      this.setState({ other: true });
    }
  }
  getSelectedPost(post) {
    this.props.getSelectedPost(post);
  }
  handleBack() {
    if (this.props.selectedPost) {
      this.props.getSelectedPost(false);
    }
    else if (this.state.editMode == true) {
      this.setState({ editMode: false, exitBtn: false, backBtn: true });
    }
    else if (this.state.profilePicture) {
      this.setState({ profilePicture: false, exitBtn: false, backBtn: true });
    }
    else {
      this.props.getPostUser(false);
    }
  }
  handleBackGame() {
    this.props.leaveGame(false);
  }
  handleEdit(value) {
    if (value) {
      this.setState({ exitBtn: value, editMode: value, backBtn: false });
    }
    else {
      this.setState({ exitBtn: value, editMode: value, backBtn: true });
    }
  }
  editProfilePicture() {
    this.setState({ exitBtn: true, profilePicture: true, backBtn: false });
  }
  finishEdit() {
    this.setState({ profilePicture: false, exitBtn: false, backBtn: true });
  }
  handleLogout() {
    this.props.handleLogout();
  }

  render() {
    if (this.props.postUser) {
      return (
        <View style={styles.container}>
          <TopNavbar
            token={this.state.token}
            handleBack={this.handleBack}
            backBtn={this.state.backBtn}
            exitBtn={this.state.exitBtn}
          />
          <UserPage
            token={this.props.token}
            user={this.props.postUser}
            selectedPost={this.props.selectedPost}
            editMode={this.state.editMode}
            profilePicture={this.state.profilePicture}
            getSelectedPost={this.getSelectedPost}
            getPostUser={this.getPostUser}
            handleEdit={this.handleEdit}
            editProfilePicture={this.editProfilePicture}
            finishEdit={this.finishEdit}
            handleLogout={this.handleLogout}
            activeUser={this.props.user}
            other={this.state.other}
          />
        </View>
      )
    }
    else {
      return (
        <View style={styles.container}>
          <TopNavbar
            token={this.state.token}
            handleBack={this.handleBackGame}
            backBtn={true}
          />
          <WhiteSpace size="lg" />
          <GameInfo
            awayTeam={this.props.game.away_team.name}
            homeTeam={this.props.game.home_team.name}
            date={this.props.game.date}
          />
          <WhiteSpace size="md" />
          <GameNavbar
            token={this.props.token}
            user={this.props.user}
            gameID={this.props.game.random_game_id}
            challenges={this.state.sorted_challenges}
            prizes={this.props.game.prizes}
            activeTabColor="rgb(0,206,202)"
            submission={this.beginSubmission}
            getPostUser={this.getPostUser}
          />
        </View>
      )
    }
  }
}

function mapStateToProps(state) {
  return { pitches: state.pitches };
}

export default connect(mapStateToProps, { joinGame })(GamePage);
