import React, { Component } from 'react';
import { Text } from 'react-native';
import { List } from 'antd-mobile';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../styles';

const Item = List.Item;
const Brief = Item.Brief;

// Props
// username : username of the user
// points : points that the user has earned in the specific game

class NotificationItem extends Component {
  constructor(props) {
    super(props);

    this.handleUserPress = this.handleUserPress.bind(this);
  }

  handleUserPress() {
    this.props.getNotificationUser(this.props.actor);
  }

  render() {
    return (
      <Item
        arrow="horizontal"
        multipleLine
        onClick={this.handleUserPress}
      >
        {this.props.message}
        <Brief>
          Example subtitle
        </Brief>
      </Item>
    )
  }
}

export default NotificationItem;
