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
          awayTeam="Boston Red Sox"
          homeTeam="San Francisco Giants"
          date="February 21st"
          time="4:30pm"
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
