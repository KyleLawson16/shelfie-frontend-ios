import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import { Flex, WhiteSpace, WingBlank, Grid, ActivityIndicator } from 'antd-mobile';
import styles from '../styles';

import UserSubmission from './UserSubmission';

class UserSubmissions extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <View>
        <Grid
          columnNum={3}
          itemStyle={styles.userPhotoGrid}
          hasLine={false}
          data={this.props.userPosts}
          renderItem={item => (
            <UserSubmission
              key={item.random_post_id}
              isVideo={item.is_video}
              path={item.media_url}
            />
          )}
        />
      </View>
    )
  }
}

export default UserSubmissions;
