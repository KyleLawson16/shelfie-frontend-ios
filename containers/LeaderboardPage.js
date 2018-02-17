import React, { Component } from 'react';
import { View, ScrollView, FlatList, Text } from 'react-native';
import { WhiteSpace, List, Flex } from 'antd-mobile';
import ActivityIndicator from 'react-native-activity-indicator';
import styles from '../styles';

import { connect } from 'react-redux';
import { fetchLeaderboard } from '../actions';

import LeaderboardItem from '../components/LeaderboardItem';

class LeaderboardPage extends Component {
  constructor(props) {
    super(props);

    this.state = { leaderboard: false, loading: true };

    this.getLeaderboardUser = this.getLeaderboardUser.bind(this);
  }

  componentDidMount() {
    this.props.fetchLeaderboard(this.props.token, this.props.gameID)
    .then((res) => {
      this.setState({ leaderboard: res.payload.data.leaderboard, loading: false });
    });
  }

  getLeaderboardUser(user) {
    this.props.getLeaderboardUser(user);
  }

  render() {
    return (
      <ScrollView>
        <Flex justify="center" style={styles.greyHeaderBar}>
          <Text style={styles.challengeHeader}>Leaderboards</Text>
        </Flex>
        <List>
          <FlatList
            data={this.state.leaderboard}
            renderItem={({item}) =>
              <LeaderboardItem
                user={item}
                activeUser={this.props.user}
                getLeaderboardUser={this.getLeaderboardUser}
              />
            }
            keyExtractor={(item, index) => index}
          />
        </List>
        <ActivityIndicator
          animating={this.state.loading}
          size={50}
          thickness={1}
          color="rgb(0,206,202)"
        />
      </ScrollView>
    )
  }
}

function mapStateToProps(state) {
  return { pitches: state.pitches };
}

export default connect(mapStateToProps, { fetchLeaderboard })(LeaderboardPage);
