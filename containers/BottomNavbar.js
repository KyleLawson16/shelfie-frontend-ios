import React, { Component } from 'react';
import { Text, View, AsyncStorage } from 'react-native';
import { TabBar, Icon, Flex } from 'antd-mobile';
import styles from '../styles';

import GamesPage from './GamesPage';
import GamePage from './GamePage';
import UserPage from './UserPage';

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
    };

    this.getGame = this.getGame.bind(this);
    this.beginSubmission = this.beginSubmission.bind(this);
    this.getPostUser = this.getPostUser.bind(this);
    this.getSelectedPost = this.getSelectedPost.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
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

  getSelectedPost(post) {
    this.props.getSelectedPost(post);
  }

  handleLogout() {
    this.props.handleLogout();
  }

  renderContent(pageKey) {
    if (pageKey == 'home') {
      if (!this.props.game) {
        return (
          <GamesPage
            token={this.props.token}
            handleGame={this.getGame} />
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
          />
        );
      }
    }
    else if (pageKey == 'user') {
      return (
        <UserPage
          token={this.props.token}
          user={this.props.user}
          activeUser={this.props.user}
          selectedPost={this.props.selectedPost}
          getSelectedPost={this.getSelectedPost}
          handleLogout={this.handleLogout}
          other={false}
        />
      )
    }
    else if (pageKey == 'notification') {
      return (
        <Text>Notifications</Text>
      )
    }
  }

  render() {
    return (
        <TabBar
            unselectedTintColor="#000"
            tintColor="#000"
            barTintColor="white"
          >
            <TabBar.Item
              key="home"
              icon={require('../assets/images/home.png')}
              selected={this.state.selectedTab === 'homeTab'}

              onPress={() => {
                this.setState({
                  selectedTab: 'homeTab',
                });
                this.props.handleBackBtn(this.props.game);
              }}
            >
              {this.renderContent('home')}
            </TabBar.Item>
            <TabBar.Item

              key="user"
              icon={require('../assets/images/user.png')}
              selected={this.state.selectedTab === 'userTab'}

              onPress={() => {
                this.setState({
                  selectedTab: 'userTab',
                });
                this.props.handleBackBtn(false);
              }}
            >
              {this.renderContent('user')}
            </TabBar.Item>
            <TabBar.Item

              key="notification"
              icon={require('../assets/images/notification.png')}
              selected={this.state.selectedTab === 'notificationTab'}

              onPress={() => {
                this.setState({
                  selectedTab: 'notificationTab',
                });
                this.props.handleBackBtn(false);
              }}
            >
              {this.renderContent('notification')}
            </TabBar.Item>
          </TabBar>

    )
  }
}

export default BottomNavbar;
