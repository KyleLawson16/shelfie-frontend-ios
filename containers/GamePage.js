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

  beginSubmission(submission) {
    this.props.submission(submission);
  }

  render() {
    return (
      <View style={styles.container}>
        <WhiteSpace size="md" />
        <GameInfo
          awayTeam={this.props.game.team_2}
          homeTeam={this.props.game.home_team}
          date={this.props.game.date}
          time={this.props.game.date}
        />
        <WhiteSpace size="lg" />
        <GameNavbar
          activeTabColor="rgb(93,188,210)"
          submission={this.beginSubmission}
        />
      </View>
    )
  }
}

export default GamePage;
