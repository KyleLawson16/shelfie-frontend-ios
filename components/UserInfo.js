import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { Flex, WhiteSpace, WingBlank, Button } from 'antd-mobile';
import styles from '../styles';

import { connect } from 'react-redux';
import { logoutUser, addFollower } from '../actions';

class UserInfo extends Component {
  constructor(props) {
    super(props);

    this.handleLogout = this.handleLogout.bind(this);
    this.handleFollow = this.handleFollow.bind(this);
    this.editProfilePicture = this.editProfilePicture.bind(this);
  }

  handleLogout() {
    this.props.logoutUser(this.props.token)
    .then((res) => {
      this.props.handleLogout();
    })
  }

  handleFollow() {
    this.props.addFollower(this.props.token, this.props.activeUser.random_user_id, this.props.user.random_user_id)
    .then((res) => {
      console.log(res);
    });
  }

  editProfilePicture() {
    this.props.editProfilePicture();
  }

  render() {
    console.log(this.props.user);
    if (this.props.other) {
      return (
        <WingBlank>
          <WhiteSpace size="md" />
          <Flex
            align="start"
          >
            <Flex.Item style={{zIndex: 9999}}>
              {this.props.user.profile_picture
                ?
                <Image
                  source={{ uri: this.props.user.profile_picture }}
                  style={styles.userPhoto}
                />
                :
                <Image
                  source={require('../assets/images/profile_photo.png')}
                  style={styles.userPhoto}
                />
              }
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
              onPressIn={this.handleFollow}
              style={styles.userEditBtn}
            >
              <Text style={{fontSize: 14}}>
                Follow
              </Text>
            </Button>
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
    else {
      return (
        <WingBlank>
          <WhiteSpace size="md" />
          <Flex
            align="start"
          >
            <Flex.Item style={{zIndex: 9999}}>
              <TouchableOpacity
                onPress={this.editProfilePicture}
              >
              {this.props.user.profile_picture
                ?
                <Image
                  source={{ uri: this.props.user.profile_picture }}
                  style={styles.userPhoto}
                />
                :
                <Image
                  source={require('../assets/images/profile_photo.png')}
                  style={styles.userPhoto}
                />
              }
              </TouchableOpacity>
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
                Edit Profile
              </Text>
            </Button>
            <Button
              onPressIn={this.handleLogout}
              style={styles.userEditBtn}
            >
              <Text style={{fontSize: 14}}>
                Logout
              </Text>
            </Button>
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
}

function mapStateToProps(state) {
  return { pitches: state.pitches };
}

export default connect(mapStateToProps, { logoutUser, addFollower })(UserInfo);
