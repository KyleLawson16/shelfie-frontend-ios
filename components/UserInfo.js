import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { Flex, WhiteSpace, WingBlank, Button, Modal } from 'antd-mobile';
import styles from '../styles';

import { connect } from 'react-redux';
import { logoutUser, addFollower, deleteFollower, fetchUser } from '../actions';

const alert = Modal.alert;

class UserInfo extends Component {
  constructor(props) {
    super(props);

    this.state = { followed: false };

    this.handleLogout = this.handleLogout.bind(this);
    this.handleFollow = this.handleFollow.bind(this);
    this.editProfilePicture = this.editProfilePicture.bind(this);
  }

  componentDidMount() {
    console.log(this.props.activeUser);
    if (this.props.other) {
        var followers = this.props.user.followers;
        followers.forEach(user => {
          if (user.random_user_id == this.props.activeUser.random_user_id) {
            this.setState({ followed: true });
          }
        });
    }
  }

  handleLogout() {
    this.props.logoutUser(this.props.token)
    .then((res) => {
      this.props.handleLogout();
    })
  }

  handleFollow() {
    if (this.state.followed) {
      this.props.deleteFollower(this.props.token, this.props.activeUser.random_user_id, this.props.user.random_user_id)
      .then((res) => {
        console.log(res);
        this.setState({ followed: false });
      });
    }
    else {
      this.props.addFollower(this.props.token, this.props.activeUser.random_user_id, this.props.user.random_user_id)
      .then((res) => {
        console.log(res);
        this.setState({ followed: true });
      });
    }
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
            <Flex.Item style={{zIndex: 9999 }}>
                <Image
                  source={{ uri: this.props.user.profile_picture }}
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
                <Text style={styles.userStatsNum}>{this.props.user.followers.length}{"\n"}</Text>
                <Text style={styles.userStatsLabel}>followers</Text>
              </Text>
            </Flex.Item>
            <Flex.Item>
              <Text style={styles.userStats}>
                <Text style={styles.userStatsNum}>{this.props.user.following.length}{"\n"}</Text>
                <Text style={styles.userStatsLabel}>following</Text>
              </Text>
            </Flex.Item>
          </Flex>
          <Flex
            justify="end"
          >
              {this.state.followed
              ?
              <Button
                onPressIn={this.handleFollow}
                style={styles.userFollowedBtn}
              >
                <Text style={{fontSize: 14}}>
                  Following
                </Text>
              </Button>
              :
              <Button
                onPressIn={this.handleFollow}
                style={styles.userFollowBtn}
              >
                <Text style={{fontSize: 14}}>
                  Follow
                </Text>
              </Button>
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
                <Image
                  source={{ uri: this.props.user.profile_picture }}
                  style={styles.userPhoto}
                />
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
                <Text style={styles.userStatsNum}>{this.props.user.followers.length}{"\n"}</Text>
                <Text style={styles.userStatsLabel}>followers</Text>
              </Text>
            </Flex.Item>
            <Flex.Item>
              <Text style={styles.userStats}>
                <Text style={styles.userStatsNum}>{this.props.user.following.length}{"\n"}</Text>
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
              onPressIn={() => alert('', 'Logout of Shelfie?', [
                { text: 'Cancel', onPress: () => console.log('cancel') },
                { text: 'Ok', onPress: this.handleLogout },
              ])}
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

export default connect(mapStateToProps, { logoutUser, addFollower, deleteFollower, fetchUser })(UserInfo);
