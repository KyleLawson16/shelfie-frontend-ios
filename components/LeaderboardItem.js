import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList, TouchableHighlight } from 'react-native';
import { WhiteSpace, List, Icon } from 'antd-mobile';
import styles from '../styles';

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
    }
    this.handleFollow = this.handleFollow.bind(this);
  }
  handleFollow() {
    if (this.state.followed) {
      this.setState({ followed: false });
    } else {
      this.setState({ followed: true });
    }
  }
  render() {
    return (
      <Item
        thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
        extra={
          <TouchableHighlight onPress={this.handleFollow}>
            <Text>
              <Icon type={this.state.followed ? '\ue6c0' : '\ue645'} size={28} />
            </Text>
          </TouchableHighlight>
        }
        onClick={() => {}}
      >
        {this.props.username}
        <Brief>
          {this.props.points} points
        </Brief>
      </Item>
    )
  }
}

export default LeaderboardItem;
