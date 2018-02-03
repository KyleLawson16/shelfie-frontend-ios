import React, { Component } from 'react';
import { View } from 'react-native';
import { WhiteSpace } from 'antd-mobile';
import styles from '../styles';

import GameInfo from '../components/GameInfo';
import GameNavbar from './GameNavbar';

class GamePage extends Component {
  constructor(props) {
    super(props);

    this.beginSubmission = this.beginSubmission.bind(this);
  }

  componentWillMount() {
    var challenges = this.props.game.challenges;
    var pt_values = [];
    for (i=0; i < challenges.length; i++) {
        pt_values.push(challenges[i]['point_value']);
    }
    var sorted_challenges = {};
    pt_values.forEach(ptValue => {
      sorted_challenges[ptValue] = [];
      challenges.forEach(challenge => {
        if (challenge.point_value == ptValue) {
          sorted_challenges[ptValue].push(challenge);
        }
      })
    })
    console.log(sorted_challenges, 'sorted');
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
          challenges={this.props.game.challenges}
          activeTabColor="rgb(93,188,210)"
          submission={this.beginSubmission}
        />
      </View>
    )
  }
}

export default GamePage;
