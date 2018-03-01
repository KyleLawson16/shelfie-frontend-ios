import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
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
    if (this.props.active) {
      return (
        <Item
          arrow="horizontal"
          multipleLine
          wrap
          align="middle"
          thumb={<Image style={styles.notificationPhoto} source={{ uri: this.props.actorPhoto}} />}
          onClick={this.handleUserPress}
        >
          <Text style={[styles.notificationContent, { fontWeight: 'bold', fontSize: 16}]}>{this.props.message}</Text>
        </Item>
      )
    }
    else {
      return (
        <Item
          arrow="horizontal"
          multipleLine
          wrap
          align="middle"
          thumb={<Image style={styles.notificationPhoto} source={{ uri: this.props.actorPhoto}} />}
          onClick={this.handleUserPress}
        >
          <Text style={[styles.notificationContent, { fontSize: 14 }]}>{this.props.message}</Text>
        </Item>
      )
    }
  }
}

export default NotificationItem;
