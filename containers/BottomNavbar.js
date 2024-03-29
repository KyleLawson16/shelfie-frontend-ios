import React, { Component } from 'react';
import { Text, View, AsyncStorage, TabBarIOS } from 'react-native';
import { TabBar, Flex, Badge } from 'antd-mobile';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../styles';

import { connect } from 'react-redux';
import { fetchNotifications } from '../actions';

import GamesPage from './GamesPage';
import GamePage from './GamePage';
import UserPage from './UserPage';
import NotificationsPage from './NotificationsPage';
import TopNavbar from '../components/TopNavbar';

// Props
// game : ID of the active game
// getGame : Changes state of game

class BottomNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'homeTab',
      hidden: false,
      fullScreen: false,
      backBtn: false,
      editMode: false,
      profilePicture: false,
      notifications: false,
      activeNotifications: false,
      notificationUser: false,
    };

    this.getGame = this.getGame.bind(this);
    this.beginSubmission = this.beginSubmission.bind(this);
    this.getPostUser = this.getPostUser.bind(this);
    this.getSelectedPost = this.getSelectedPost.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.editProfilePicture = this.editProfilePicture.bind(this);
    this.finishEdit = this.finishEdit.bind(this);
    this.refreshNotifications = this.refreshNotifications.bind(this);
    this.showBackBtn = this.showBackBtn.bind(this);
    this.getNotificationUser = this.getNotificationUser.bind(this);
  }

  componentWillMount() {
    this.props.fetchNotifications(this.props.token, this.props.user.random_user_id)
    .then((res) => {
      console.log(res);
      activeNotifications = [];
      notifications = [];
      res.payload.data.forEach(notification => {
        if (notification['active'] == true) {
          activeNotifications.push(notification);
        }
        else {
          notifications.push(notification);
        }
      });
      this.setState({ notifications: notifications, activeNotifications: activeNotifications });
    });
  }

  refreshNotifications() {
    this.props.fetchNotifications(this.props.token, this.props.user.random_user_id)
    .then((res) => {
      console.log(res);
      activeNotifications = [];
      notifications = [];
      res.payload.data.forEach(notification => {
        if (notification['active'] == true) {
          activeNotifications.push(notification);
        }
        else {
          notifications.push(notification);
        }
      })
      this.setState({ notifications: notifications, activeNotifications: activeNotifications });
    });
  }

  getGame(game) {
    this.props.getGame(game);
  }

  beginSubmission(submission) {
    this.props.submission(submission);
  }

  getPostUser(value) {
    this.props.getPostUser(value);
  }
  getNotificationUser(value) {
    this.setState({ notificationUser: value });
  }

  getSelectedPost(post) {
    this.props.getSelectedPost(post);
    this.setState({ backBtn: true });
  }
  handleBack() {
    if (this.state.editMode == true) {
      this.setState({ editMode: false, exitBtn: false });
    }
    else if (this.state.profilePicture) {
      this.setState({ profilePicture: false, exitBtn: false });
    }
    else if (this.state.notificationUser && this.props.selectedPost) {
      this.props.getSelectedPost(false);
    }
    else {
      this.props.getSelectedPost(false);
      this.getNotificationUser(false);
      this.setState({ exitBtn: false, backBtn: false });
    }
  }
  handleEdit(value) {
    this.setState({ exitBtn: value, editMode: value });
  }
  handleLogout() {
    this.props.handleLogout();
  }
  editProfilePicture() {
    this.setState({ exitBtn: true, profilePicture: true });
  }
  finishEdit() {
    this.setState({ profilePicture: false, exitBtn: false });
  }
  showBackBtn() {
    this.setState({ backBtn: true });
  }

  renderContent(pageKey) {
    if (pageKey == 'home') {
      if (!this.props.game) {
        return (
          <GamesPage
            token={this.props.token}
            handleGame={this.getGame}
          />
        );
      }
      else {
        return (
          <GamePage
            token={this.props.token}
            user={this.props.user}
            game={this.props.game}
            postUser={this.props.postUser}
            submission={this.beginSubmission}
            getPostUser={this.getPostUser}
            selectedPost={this.props.selectedPost}
            getSelectedPost={this.getSelectedPost}
            leaveGame={this.getGame}
            handleLogout={this.handleLogout}
          />
        );
      }
    }
    else if (pageKey == 'user') {
      return (
        <View style={styles.container}>
          <TopNavbar
            token={this.state.token}
            handleBack={this.handleBack}
            backBtn={this.state.backBtn}
            exitBtn={this.state.exitBtn}
          />
          <UserPage
            token={this.props.token}
            user={this.props.user}
            activeUser={this.props.user}
            selectedPost={this.props.selectedPost}
            editMode={this.state.editMode}
            profilePicture={this.state.profilePicture}
            getSelectedPost={this.getSelectedPost}
            getPostUser={this.getPostUser}
            handleEdit={this.handleEdit}
            handleLogout={this.handleLogout}
            editProfilePicture={this.editProfilePicture}
            finishEdit={this.finishEdit}
            other={false}
          />
        </View>
      )
    }
    else if (pageKey == 'notification') {
      return (
        <View style={styles.container}>
          <TopNavbar
            token={this.state.token}
            handleBack={this.handleBack}
            backBtn={this.state.backBtn}
            exitBtn={this.state.exitBtn}
          />
          <NotificationsPage
            token={this.props.token}
            user={this.props.user}
            notifications={this.state.notifications}
            notificationUser={this.state.notificationUser}
            activeNotifications={this.state.activeNotifications}
            getNotificationUser={this.getNotificationUser}
            refreshNotifications={this.refreshNotifications}
            getSelectedPost={this.getSelectedPost}
            selectedPost={this.props.selectedPost}
            showBackBtn={this.showBackBtn}
          />
      </View>
      )
    }
  }

  render() {
    return (
        <TabBarIOS
          tintColor="#000"
          barTintColor="#f9f9f9"
          unselectedItemTintColor="#ccc"
          translucent={false}
          style={styles.bottomNavbar}
        >
          <Icon.TabBarItem
            iconName="md-home"
            selectedIconName="md-home"
            selected={this.state.selectedTab === 'homeTab'}

            onPress={() => {
              this.setState({
                selectedTab: 'homeTab',
                backBtn: false
              });
              this.props.getSelectedPost(false);
              this.props.getPostUser(false);
            }}
          >
            {this.renderContent('home')}
          </Icon.TabBarItem>
          <Icon.TabBarItem
            iconName="md-person"
            selectedIconName="md-person"
            selected={this.state.selectedTab === 'userTab'}

            onPress={() => {
              this.setState({
                selectedTab: 'userTab',
                backBtn: false,
              });
              this.props.getSelectedPost(false);
              this.props.getPostUser(false);
            }}
          >
            {this.renderContent('user')}
          </Icon.TabBarItem>
          {this.state.activeNotifications.length == 0
            ?
          <Icon.TabBarItem
            iconName="md-notifications"
            selectedIconName="md-notifications"
            selected={this.state.selectedTab === 'notificationTab'}

            onPress={() => {
              this.setState({
                selectedTab: 'notificationTab',
                backBtn: false,
                notificationUser: false,
              });
              this.props.handleBackBtn(false);
            }}
          >
            {this.renderContent('notification')}

          </Icon.TabBarItem>
          :
          <Icon.TabBarItem
            iconName="md-notifications"
            selectedIconName="md-notifications"
            selected={this.state.selectedTab === 'notificationTab'}
            badge={this.state.activeNotifications.length}

            onPress={() => {
              this.setState({
                selectedTab: 'notificationTab',
                backBtn: false,
                notificationUser: false,
              });
              this.props.handleBackBtn(false);
            }}
          >
            {this.renderContent('notification')}

          </Icon.TabBarItem>
        }
        </TabBarIOS>
    )
  }
}

function mapStateToProps(state) {
  return { pitches: state.pitches };
}

export default connect(mapStateToProps, { fetchNotifications })(BottomNavbar);
