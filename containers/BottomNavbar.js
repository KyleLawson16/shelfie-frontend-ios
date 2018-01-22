import React, { Component } from 'react';
import { Text, View } from 'react-native';
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
  }

  getGame(game) {
    this.props.getGame(game);
  }

  renderContent(pageKey) {
    if (pageKey == 'home') {
      if (!this.props.game) {
        return (
          <GamesPage handleGame={this.getGame} />
        );
      }
      else {
        return (
          <GamePage game={this.props.game} />
        );
      }
    }
    else if (pageKey == 'user') {
      return (
        <UserPage />
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
            tintColor="#33A3F4"
            barTintColor="white"
          >
            <TabBar.Item

              key="home"
              icon={require('../assets/images/home.png')}
              iconStyle={{ width: 25, height: 25}}
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
              iconStyle={{ width: 19, height: 25}}
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
              iconStyle={{ width: 25, height: 25}}
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
