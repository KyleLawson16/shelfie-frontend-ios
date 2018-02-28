import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList, TouchableOpacity, Image } from 'react-native';
import { WhiteSpace, List } from 'antd-mobile';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../styles';

import { connect } from 'react-redux';
import { addFollower, deleteFollower } from '../actions';

const Item = List.Item;
const Brief = Item.Brief;

// Props
// username : username of the user
// points : points that the user has earned in the specific game

class LeaderboardItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      followed: false
    };
    this.handleFollow = this.handleFollow.bind(this);
    this.handleUserPress = this.handleUserPress.bind(this);
  }

  componentDidMount() {
    var followers = this.props.user.followers;
    followers.forEach(user => {
      if (user == this.props.activeUser.random_user_id) {
        this.setState({ followed: true });
      }
    });
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

  handleUserPress() {
    this.props.getLeaderboardUser(this.props.user);
  }

  render() {
    return (
      <Item
        thumb={<Image style={styles.notificationPhoto} source={{ uri: this.props.user.profile_picture}} />}
        extra={
          <TouchableOpacity onPress={this.handleFollow}>
            <Text>
              <Icon
                name="md-person-add"
                size={25}
                color={this.state.followed ? '#000' : '#ccc'}  />
            </Text>
          </TouchableOpacity>
        }
        onClick={this.handleUserPress}
      >
        {this.props.user.username}
        <Brief>
          {this.props.user.points} points
        </Brief>
      </Item>
    )
  }
}

function mapStateToProps(state) {
  return { pitches: state.pitches };
}

export default connect(mapStateToProps, { addFollower, deleteFollower })(LeaderboardItem);
