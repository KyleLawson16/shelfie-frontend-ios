import React, { Component } from 'react';
import { Text, FlatList, ScrollView, RefreshControl } from 'react-native';
import { Flex, List } from 'antd-mobile';
import ActivityIndicator from 'react-native-activity-indicator';
import styles from '../styles';

import NotificationItem from '../components/NotificationItem';

class NotificationsPage extends Component {
  constructor(props) {
    super(props);

    this.state = { refreshing: false, };
    this.getNotificationUser = this.getNotificationUser.bind(this);

  }

  getNotificationUser(user) {
    this.props.getNotificationUser(user);
  }

  render() {
    return (
      <ScrollView
        style={styles.containerBackground}
      >
        <Flex justify="center" style={styles.greyHeaderBar}>
          <Text style={styles.challengeHeader}>Notifications</Text>
        </Flex>
        <List>
          <FlatList
            data={this.props.notifications}
            renderItem={({item}) =>
              <NotificationItem
                actor={item.actor}
                message={item.message}
                category={item.category}
                getNotificationUser={this.getNotificationUser}
              />
            }
            keyExtractor={(item, index) => index}
          />
        </List>
      </ScrollView>
    )
  }
}

export default NotificationsPage;
