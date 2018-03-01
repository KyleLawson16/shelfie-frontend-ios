import React, { Component } from 'react';
import { View, Text, FlatList, ScrollView, RefreshControl, Dimensions } from 'react-native';
import { Flex, List } from 'antd-mobile';
import ActivityIndicator from 'react-native-activity-indicator';
import styles from '../styles';

import { connect } from 'react-redux';
import { updateNotifications } from '../actions';

import NotificationItem from '../components/NotificationItem';

class NotificationsPage extends Component {
  constructor(props) {
    super(props);

    this.state = { refreshing: false, };
    this.getNotificationUser = this.getNotificationUser.bind(this);

  }

  componentDidMount() {
    activeNotification_ids = [];
    this.props.activeNotifications.forEach(notification => {
      activeNotification_ids.push(notification.random_notification_id);
    });
    this.props.updateNotifications(this.props.token, activeNotification_ids)
    .then((res) => {
      console.log(res);
    })
  }

  componentWillReceiveProps() {
    this.setState({ refreshing: false });
  }

  _onRefresh() {
    this.setState({ refreshing: true });
    activeNotification_ids = [];
    this.props.activeNotifications.forEach(notification => {
      activeNotification_ids.push(notification.random_notification_id);
    });
    this.props.updateNotifications(this.props.token, activeNotification_ids)
    .then((res) => {
      console.log(res);
    })
    this.props.refreshNotifications();

  }

  getNotificationUser(user) {
    this.props.getNotificationUser(user);
  }

  render() {
    console.log(this.props.activeNotifications, "active notifications");
    console.log(this.props.notifications, "cool");
    return (
      <ScrollView
        style={styles.containerBackground}
        refreshControl={
          <RefreshControl
            tintColor="transparent"
            colors={['transparent']}
            style={{backgroundColor: 'transparent'}}
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh.bind(this)}
          />
        }
      >
        {this.state.refreshing
        ?
        <View
          style={{position:'absolute', top: -55,
            width:Dimensions.get('window').width, height:60,
            alignItems:'center', justifyContent:'center'}}>
            <ActivityIndicator
              animating={true}
              size={50}
              thickness={1}
              color="rgb(0,206,202)"
            />
        </View>
        :
        null
        }
        <Flex justify="center" style={styles.greyHeaderBar}>
          <Text style={styles.challengeHeader}>Notifications</Text>
        </Flex>
        <List>
          <FlatList
            data={this.props.activeNotifications}
            renderItem={({item}) =>
              <NotificationItem
                actorPhoto={item.actor.profile_picture}
                message={item.message}
                category={item.category}
                getNotificationUser={this.getNotificationUser}
                active={true}
              />
            }
            keyExtractor={(item, index) => index}
          />
        </List>
        <List>
          <FlatList
            data={this.props.notifications}
            renderItem={({item}) =>
              <NotificationItem
                actorPhoto={item.actor.profile_picture}
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

function mapStateToProps(state) {
  return { pitches: state.pitches };
}

export default connect(mapStateToProps, { updateNotifications })(NotificationsPage);
