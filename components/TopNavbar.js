import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Flex, Icon, WingBlank, WhiteSpace } from 'antd-mobile';
import styles from '../styles';

import { connect } from 'react-redux';
import { logoutUser } from '../actions';

class TopNavbar extends Component {
  constructor(props) {
    super(props);

    this.handleBack = this.handleBack.bind(this);
  }

  handleBack() {
    this.props.exitGame(false);
    console.log('working');
  }

  render() {
    return (
      <View style={styles.topNavbar}>
        <WhiteSpace />
        <WingBlank size="md">
          <Flex>
            <Flex.Item>
              {this.props.backBtn ?
              <TouchableOpacity onPress={() => {this.handleBack()}}>
                <Icon type={"left"} />
              </TouchableOpacity>
              : false}
            </Flex.Item>
            <Flex.Item>
              <Text style={{ textAlign: 'center' }}>SHELFIE</Text>
            </Flex.Item>
            <Flex.Item>
              {this.props.searchBtn ?
              <Text style={{ textAlign: 'right' }}><Icon type={"\ue670"} /></Text>
              : false}
              {this.props.logoutBtn ?
              <TouchableOpacity onPress={this.handleLogout}>
                <Text style={{ textAlign: 'right' }}><Icon type={"\ue670"} /></Text>
              </TouchableOpacity>
              : false}
            </Flex.Item>
          </Flex>
        </WingBlank>
        <WhiteSpace />
      </View>
    )
  }
}

function mapStateToProps(state) {
  return { pitches: state.pitches };
}

export default connect(mapStateToProps, { logoutUser })(TopNavbar);
