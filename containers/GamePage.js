import React, { Component } from 'react';
import { View } from 'react-native';
import { WhiteSpace } from 'antd-mobile';
import styles from '../styles';

import GameInfo from '../components/GameInfo';
import GameNavbar from './GameNavbar';

class GamePage extends Component {
  constructor(props) {
    super(props);

    this.state = { sorted_challenges: false }

    this.beginSubmission = this.beginSubmission.bind(this);
  }

  componentWillMount() {
    var challenges = this.props.game.challenges;
    var pt_values = [];
    for (i=0; i < challenges.length; i++) {
      if (!pt_values.includes(challenges[i]['point_value'])) // If point value of challenge has not been added to pt_values yet
        pt_values.push(challenges[i]['point_value']); // Add point value to pt_values
    }
    var sorted_challenges = [];

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
    console.log(sorted_challenges, 'sorted');
    this.setState({ sorted_challenges: sorted_challenges });
  }

  beginSubmission(submission) {
    this.props.submission(submission);
  }

  render() {
    return (
      <View style={styles.container}>
        <WhiteSpace size="md" />
        <GameInfo
          awayTeam={this.props.game.away_team}
          homeTeam={this.props.game.home_team}
          date={this.props.game.date}
          time={this.props.game.date}
        />
        <WhiteSpace size="lg" />
        <GameNavbar
          token={this.props.token}
          gameID={this.props.game.random_game_id}
          challenges={this.state.sorted_challenges}
          activeTabColor="rgb(93,188,210)"
          submission={this.beginSubmission}
        />
      </View>
    )
  }
}

export default GamePage;
