import React, { Component } from 'react';
import { View, Text, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { WhiteSpace, Flex } from 'antd-mobile';
import styles from '../styles';

import { connect } from 'react-redux';
import { fetchGames } from '../actions';

import GameItem from '../components/GameItem';

class GamesPage extends Component {
  constructor(props) {
    super(props);

    this.state = { games: false };
  }
  componentWillMount() {
    this.props.fetchGames(this.props.token)
    .then((res) => {
      console.log(res.payload.data);
      this.setState({ games: res.payload.data });
    });
  }
  render() {
    if (this.state.games) {
      return (
        <ScrollView>
          <Flex justify="center" style={styles.greyHeaderBar}>
            <Text style={styles.challengeHeader}>Games</Text>
          </Flex>
          <FlatList
            data={this.state.games}
            renderItem={({item}) =>
            <View>
              <TouchableOpacity onPress={() => {this.props.handleGame(item)}}>
                <GameItem
                  key={item.random_game_id}
                  homeTeam={item.home_team}
                  awayTeam={item.team_2}
                  date={item.date}
                  location={item.location}
                />
              </TouchableOpacity>
              <WhiteSpace style={styles.gameDivider} size="sm" />
            </View>
            }
            keyExtractor={(item, index) => index}
          />
        </ScrollView>
      )
    }
    else {
      return (
        <Text>working</Text>

      )
    }

  }
}

function mapStateToProps(state) {
  return { pitches: state.pitches };
}

export default connect(mapStateToProps, { fetchGames })(GamesPage);
