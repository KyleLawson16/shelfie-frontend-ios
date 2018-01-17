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
    if (pageKey == 'home') {
      return (
        <GamePage />
      );
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

              key="feed"
              icon={require('../assets/images/home.png')}
              selected={this.state.selectedTab === 'feedTab'}

              onPress={() => {
                this.setState({
                  selectedTab: 'feedTab',
                });
              }}
            >
              {this.renderContent('home')}
            </TabBar.Item>
            <TabBar.Item

              key="notification"
              icon={require('../assets/images/notification.png')}
              iconStyle={{ width: 20, height: 20}}
              selected={this.state.selectedTab === 'notificationTab'}

              onPress={() => {
                this.setState({
                  selectedTab: 'notificationTab',
                });
              }}
            >
              {this.renderContent('notification')}
            </TabBar.Item>
          </TabBar>

    )
  }
}

export default BottomNavbar;
