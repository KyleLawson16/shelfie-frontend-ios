import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
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
    this.props.handleBack();
    console.log('working');
  }
  handleSave() {
    this.props.handleSave();
  }

  render() {
    return (
      <View style={styles.topNavbar}>
        <WhiteSpace size="lg"/>
        <WhiteSpace size="md"/>
        <WhiteSpace size="md"/>
        <WingBlank size="md">
          <Flex>
            <Flex.Item>
              {this.props.backBtn ?
              <TouchableOpacity onPress={this.handleBack}>
                <Icon type={"left"} />
              </TouchableOpacity>
              : false}
              {this.props.exitBtn ?
              <TouchableOpacity onPress={this.handleBack}>
                <Icon type={"cross"} />
              </TouchableOpacity>
              : false}
            </Flex.Item>
            <Flex.Item>
              <Image source={require('../assets/images/logo.png')} style={styles.topNavbarLogo} />
            </Flex.Item>
            <Flex.Item alignItems="flex-end">
            </Flex.Item>
          </Flex>
        </WingBlank>
        <WhiteSpace />
      </View>
    )
  }
}

// {this.props.logoutBtn ?
// <TouchableOpacity onPress={this.handleLogout}>
//   <Text style={{ textAlign: 'right' }}><Icon type={"\ue670"} /></Text>
// </TouchableOpacity>
// : false}
// {this.props.searchBtn ?
// <Text style={{ textAlign: 'right' }}><Icon type={"\ue670"} /></Text>
// : false}

function mapStateToProps(state) {
  return { pitches: state.pitches };
}

export default connect(mapStateToProps, { logoutUser })(TopNavbar);
