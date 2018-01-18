import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import { Flex, WhiteSpace, WingBlank, Grid, ActivityIndicator } from 'antd-mobile';
import styles from '../styles';

import UserSubmission from './UserSubmission';

class UserSubmissions extends Component {
  render() {
    const data = [
      'post1',
      'post2',
      'post3',
      'post1',
      'post2',
      'post3',
      'post1',
      'post2',
      'post3',
      'post1',
      'post2',
      'post3',
    ]

    return (
      <View>
        <Grid data={data}
          columnNum={3}
          itemStyle={styles.userPhotoGrid}
          hasLine={false}
          renderItem={dataItem => (
            <UserSubmission />
          )}
        />
      </View>
    )
  }
}

export default UserSubmissions;
