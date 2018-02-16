import React, { Component } from 'react';
import { View } from 'react-native';
import { WhiteSpace } from 'antd-mobile';
import styles from '../styles';

import { connect } from 'react-redux';
import { joinGame } from '../actions';

import GameInfo from '../components/GameInfo';
import GameNavbar from './GameNavbar';
import UserPage from './UserPage';

class GamePage extends Component {
  constructor(props) {
    super(props);

    this.state = { sorted_challenges: false }

    this.beginSubmission = this.beginSubmission.bind(this);
    this.getPostUser = this.getPostUser.bind(this);
    this.getSelectedPost = this.getSelectedPost.bind(this);
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
    this.props.getPostUser(user);
  }
  getSelectedPost(post) {
    this.props.getSelectedPost(post);
  }

  render() {
    if (this.props.postUser) {
      return (
        <View style={styles.container}>
          <UserPage
            token={this.props.token}
            user={this.props.postUser}
            selectedPost={this.props.selectedPost}
            getSelectedPost={this.getSelectedPost}
            activeUser={this.props.user}
            other={true}
          />
        </View>
      )
    }
    else {
      return (
        <View style={styles.container}>
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
