import React, { Component } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { WhiteSpace } from 'antd-mobile';
import styles from '../styles';

import SubmissionCamera from '../components/SubmissionCamera';
import SubmissionPostWrapper from '../components/SubmissionPost';
import TopNavbar from '../components/TopNavbar';

class SubmissionPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      path: false,
      type: "photo",
      saved: false,
    };
  }

  deleteSaved() {
    this.setState({
      saved: false,
      path: false
    });
  }

  getPath(path) {
    this.setState({ path: path });
  }

  getType(type) {
    this.setState({ captureType: type });
  }

  getSaved(saved) {
    this.setState({ saved: saved });
  }

  render() {
    if (this.state.saved) {
      return (
        <View style={styles.container}>
          <TopNavbar
            exitGame={this.deleteSaved.bind(this)}
            backBtn={true}
          />
          <SubmissionPostWrapper
            path={this.state.path}
            type={this.state.captureType}
          />
        </View>
      )
    }
    else {
      return (
        <View style={styles.container}>
          <SubmissionCamera
            path={this.getPath.bind(this)}
            type={this.getType.bind(this)}
            saved={this.getSaved.bind(this)}
          />
        </View>
      )
    }
  }
}

export default SubmissionPage;
