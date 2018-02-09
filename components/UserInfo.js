import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import { Flex, WhiteSpace, WingBlank, Button } from 'antd-mobile';
import styles from '../styles';

import { connect } from 'react-redux';
import { logoutUser } from '../actions';

class UserInfo extends Component {
  constructor(props) {
    super(props);

    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    this.props.logoutUser(this.props.token)
    .then((res) => {
      this.props.handleLogout();
    })
  }

  render() {
    console.log(this.props.user);
    return (
      <WingBlank>
        <Flex
          align="start"
        >
          <Flex.Item style={{zIndex: 9999}}>
            <Image
              source={require('../assets/images/profile_photo.png')}
              style={styles.userPhoto}
            />
          </Flex.Item>
          <Flex.Item>
            <Text style={styles.userStats}>
              <Text style={styles.userStatsNum}>{this.props.totalPoints}{"\n"}</Text>
              <Text style={styles.userStatsLabel}>points</Text>
            </Text>
          </Flex.Item>
          <Flex.Item>
            <Text style={styles.userStats}>
              <Text style={styles.userStatsNum}>11{"\n"}</Text>
              <Text style={styles.userStatsLabel}>followers</Text>
            </Text>
          </Flex.Item>
          <Flex.Item>
            <Text style={styles.userStats}>
              <Text style={styles.userStatsNum}>11{"\n"}</Text>
              <Text style={styles.userStatsLabel}>following</Text>
            </Text>
          </Flex.Item>
        </Flex>
        <Flex
          justify="end"
        >
          <Button
            onPressIn={() => {this.props.handleEditBtn(true);}}
            style={styles.userEditBtn}
          >
            <Text style={{fontSize: 14}}>
              {this.props.other
                ? 'Follow'
                : 'Edit Profile'
              }
            </Text>
          </Button>
          {!this.props.other
          ?
          <Button
            onPressIn={this.handleLogout}
            style={styles.userEditBtn}
          >
            <Text style={{fontSize: 14}}>
              Logout
            </Text>
          </Button>
          :
          null
          }
        </Flex>
        <WhiteSpace />
        <Flex
          align="start"
        >
          <Flex.Item>
            <Text style={styles.userName}>{this.props.user.first_name} {this.props.user.last_name}</Text>
            <Text>Favorite Team</Text>
          </Flex.Item>
        </Flex>
      </WingBlank>
    )
  }
}

function mapStateToProps(state) {
  return { pitches: state.pitches };
}

export default connect(mapStateToProps, { logoutUser })(UserInfo);
