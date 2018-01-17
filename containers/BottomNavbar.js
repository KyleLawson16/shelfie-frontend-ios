import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { TabBar, Icon, Flex } from 'antd-mobile';

import GamePage from './GamePage';

class BottomNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'feedTab',
      hidden: false,
      fullScreen: false,
    };
  }

  renderContent(pageKey) {
    if (pageKey == 'game') {
      return (
        <GamePage />
      );
    }
  }

  render() {
    return (
        <TabBar
            unselectedTintColor="#949494"
            tintColor="#33A3F4"
            barTintColor="white"
          >
            <TabBar.Item

              key="feed"
              icon="down"
              selected={this.state.selectedTab === 'feedTab'}

              onPress={() => {
                this.setState({
                  selectedTab: 'feedTab',
                });
              }}
            >
              {this.renderContent('game')}
            </TabBar.Item>
            <TabBar.Item
              key="challenges"
              icon={require('../assets/images/challenges.png')}
              selected={this.state.selectedTab === 'challengesTab'}

              onPress={() => {
                this.setState({
                  selectedTab: 'challengesTab',
                });
              }}
            >
              {this.renderContent('Life')}
            </TabBar.Item>
            <TabBar.Item
              key="leaderboard"
              icon={require('../assets/images/leaderboard.png')}
              selected={this.state.selectedTab === 'leaderboardTab'}

              onPress={() => {
                this.setState({
                  selectedTab: 'leaderboardTab',
                });
              }}
            >
              {this.renderContent('Life')}
            </TabBar.Item>
            <TabBar.Item
              key="prizes"
              icon={require('../assets/images/prizes.png')}
              selected={this.state.selectedTab === 'prizesTab'}

              onPress={() => {
                this.setState({
                  selectedTab: 'prizesTab',
                });
              }}
            >
              {this.renderContent('Life')}
            </TabBar.Item>
          </TabBar>

    )
  }
}

export default BottomNavbar;
