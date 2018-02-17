import React, { Component } from 'react';
import { View, Text, FlatList, ScrollView, RefreshControl, Dimensions } from 'react-native';
import { Flex } from 'antd-mobile';
import ActivityIndicator from 'react-native-activity-indicator';
import styles from '../styles';

import { connect } from 'react-redux';
import { fetchPosts } from '../actions';

import ChallengeSubmission from '../components/ChallengeSubmission';

class FeedPage extends Component {
  constructor(props) {
    super(props);

    this.state = { posts: false, loading: true, refreshing: false }
  }

  componentWillMount() {
    this.props.fetchPosts(this.props.token, 'game', this.props.gameID)
    .then((res) => {
      // console.log(res);
      this.setState({ posts: res.payload.data, loading: false });
    });
  }
  _onRefresh() {
    this.setState({refreshing: true });
    this.props.fetchPosts(this.props.token, 'game', this.props.gameID)
    .then((res) => {
      // console.log(res);
      this.setState({ posts: res.payload.data, refreshing: false });
    });
  }

  getPostUser(user) {
    this.props.getPostUser(user);
  }

  render() {
    return (
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
          <Text style={styles.challengeHeader}>Game Feed</Text>
        </Flex>
        <FlatList
          data={this.state.posts}
          renderItem={({item}) =>
            <ChallengeSubmission
              token={this.props.token}
              user={this.props.user}
              postID={item.random_post_id}
              key={item.random_post_id}
              postUser={item.user}
              challenge={item.challenge.name}
              caption={item.caption}
              mediaUrl={item.media_url}
              isVideo={item.is_video}
              likes={item.likes}
              getPostUser={this.getPostUser.bind(this)}
            />
          }
          keyExtractor={(item, index) => index}
          style={{ marginBottom: 32}}
        />
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

export default connect(mapStateToProps, { fetchPosts })(FeedPage);
