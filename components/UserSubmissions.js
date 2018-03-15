import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { Flex, WhiteSpace, WingBlank, Grid, ActivityIndicator } from 'antd-mobile';
import styles from '../styles';

import UserSubmission from './UserSubmission';

class UserSubmissions extends Component {
  constructor(props) {
    super(props);

    this.getSelectedPost = this.getSelectedPost.bind(this);
  }

  getSelectedPost(item) {
    console.log(item);
    this.props.getSelectedPost(item);
  }

  render() {
    if (!this.props.userPosts[0]) {
      return (
        <View>
          <Text style={styles.userNoPosts}>No posts yet</Text>
        </View>
      )
    }
    else {
      return (
        <View>
          <Grid
            columnNum={3}
            itemStyle={styles.userPhotoGrid}
            hasLine={false}
            data={this.props.userPosts}
            renderItem={item => (
              <TouchableOpacity onPress={() => {this.getSelectedPost(item)}}>
                <UserSubmission
                  key={item.random_post_id}
                  isVideo={item.is_video}
                  path={item.media_url}
                />
              </TouchableOpacity>
            )}
          />
        </View>
      )
    }
  }
}

export default UserSubmissions;
