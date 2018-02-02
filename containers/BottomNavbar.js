import React, { Component } from 'react';
import { Text, View, AsyncStorage } from 'react-native';
import { TabBar, Icon, Flex } from 'antd-mobile';

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
  }

  getGame(game) {
    this.props.getGame(game);
  }

  beginSubmission(submission) {
    this.props.submission(submission);
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
            game={this.props.game}
            submission={this.beginSubmission}
          />
        );
      }
    }
    else if (pageKey == 'user') {
      return (
        <UserPage
          user={this.props.user}
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
            tintColor="rgb(93,188,210)"
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
