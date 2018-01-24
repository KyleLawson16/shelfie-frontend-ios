import React, { Component } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { WhiteSpace } from 'antd-mobile';
import styles from '../styles';

import SubmissionCamera from '../components/SubmissionCamera';

class SubmissionPage extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <View style={styles.container}>
        <SubmissionCamera />
      </View>
    )
  }
}

export default SubmissionPage;
