import React, { Component } from 'react';
import { View, ScrollView, FlatList, Text } from 'react-native';
import { WhiteSpace, List, Flex, ActivityIndicator } from 'antd-mobile';
import styles from '../styles';

import { connect } from 'react-redux';
import { fetchLeaderboard } from '../actions';

import LeaderboardItem from '../components/LeaderboardItem';

class LeaderboardPage extends Component {
  constructor(props) {
    super(props);

    this.state = { leaderboard: false, loading: true };
  }

  componentDidMount() {
    this.props.fetchLeaderboard(this.props.token, this.props.gameID)
    .then((res) => {
      this.setState({ leaderboard: res.payload.data.leaderboard, loading: false });
    });
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
                key={item.random_user_id}
                username={item.username}
                points={item.points}
              />
            }
            keyExtractor={(item, index) => index}
          />
        </List>
        {this.state.loading
          ? <ActivityIndicator toast text="loading" />
          : null
        }
      </ScrollView>
    )
  }
}

function mapStateToProps(state) {
  return { pitches: state.pitches };
}

export default connect(mapStateToProps, { fetchLeaderboard })(LeaderboardPage);
