import React, { Component } from 'react';
import { View, Text, ScrollView, FlatList, TouchableOpacity, RefreshControl, Dimensions } from 'react-native';
import { WhiteSpace, Flex } from 'antd-mobile';
import ActivityIndicator from 'react-native-activity-indicator';
import styles from '../styles';

import { connect } from 'react-redux';
import { fetchGames } from '../actions';

import GameItem from '../components/GameItem';
import TopNavbar from '../components/TopNavbar';

class GamesPage extends Component {
  constructor(props) {
    super(props);

    this.state = { games: false, loading: true, refreshing: false };
  }
  componentWillMount() {
    this.props.fetchGames(this.props.token)
    .then((res) => {
      console.log(res.payload.data);
      this.setState({ games: res.payload.data, loading: false });
    });
  }
  _onRefresh() {
    this.setState({refreshing: true });
    this.props.fetchGames(this.props.token)
    .then((res) => {
      // console.log(res);
      this.setState({ games: res.payload.data, refreshing: false });
    });
  }
  render() {
      return (
        <View style={styles.container}>
        <TopNavbar
          token={this.state.token}
          handleBack={this.handleBack}
          backBtn={false}
        />
        <ScrollView
          style={styles.containerBackground}
          refreshControl={
            <RefreshControl
              tintColor="transparent"
              colors={['transparent']}
              style={{backgroundColor: 'transparent'}}
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh.bind(this)}
            />
          }
        >
          {this.state.refreshing
          ?
          <View
            style={{position:'absolute', top: -55,
              width:Dimensions.get('window').width, height:60,
              alignItems:'center', justifyContent:'center'}}>
              <ActivityIndicator
                animating={true}
                size={50}
                thickness={1}
                color="rgb(0,206,202)"
              />
          </View>
          :
          null
          }
          <Flex justify="center" style={styles.greyHeaderBar}>
            <Text style={styles.challengeHeader}>Games</Text>
          </Flex>
          <FlatList
            style={styles.container}
            data={this.state.games}
            renderItem={({item}) =>
            <View>
              <TouchableOpacity onPress={() => {this.props.handleGame(item)}}>
                <GameItem
                  key={item.random_game_id}
                  homeTeam={item.home_team}
                  awayTeam={item.away_team}
                  date={item.date}
                  location={item.location}
                  challenges={item.challenges}
                  fans={item.fans_ids}
                />
              </TouchableOpacity>
              <WhiteSpace style={styles.gameDivider} size="xs" />
            </View>
            }
            keyExtractor={(item, index) => index}
          />
          <ActivityIndicator
            animating={this.state.loading}
            size={50}
            thickness={1}
            color="rgb(0,206,202)"
          />
        </ScrollView>
        </View>
      )
  }
}

function mapStateToProps(state) {
  return { pitches: state.pitches };
}

export default connect(mapStateToProps, { fetchGames })(GamesPage);
