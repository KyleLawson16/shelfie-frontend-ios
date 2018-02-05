import React, { Component } from 'react';
import { View, Text, FlatList, ScrollView } from 'react-native';
import { Flex } from 'antd-mobile';
import styles from '../styles';

import { connect } from 'react-redux';
import { fetchPosts } from '../actions';

import ChallengeSubmission from '../components/ChallengeSubmission';

class FeedPage extends Component {
  constructor(props) {
    super(props);

    this.state = { posts: false }
  }

  componentWillMount() {
    this.props.fetchPosts(this.props.token, 'game', this.props.gameID)
    .then((res) => {
      console.log(res);
      this.setState({ posts: res.payload.data });
    });
  }

  render() {
    return (
      <ScrollView>
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
              username={item.user.username}
              challenge={item.challenge.name}
              caption={item.caption}
              mediaUrl={item.media_url}
              isVideo={item.is_video}
              likes={item.likes}
            />
          }
          keyExtractor={(item, index) => index}
          style={{ marginBottom: 100}}
        />
      </ScrollView>
    )
  }
}

function mapStateToProps(state) {
  return { pitches: state.pitches };
}

export default connect(mapStateToProps, { fetchPosts })(FeedPage);
