import React, { Component } from 'react';
import { Text, View, AsyncStorage } from 'react-native';
import { TabBar, Icon, Flex } from 'antd-mobile';
import styles from '../styles';

import GamesPage from './GamesPage';
import GamePage from './GamePage';
import UserPage from './UserPage';
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
    };

    this.getGame = this.getGame.bind(this);
    this.beginSubmission = this.beginSubmission.bind(this);
    this.getPostUser = this.getPostUser.bind(this);
    this.getSelectedPost = this.getSelectedPost.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
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
    this.setState({ backBtn: true });
  }
  handleBack() {
    if (this.state.editMode == true) {
      this.setState({ editMode: false, exitBtn: false });
    }
    else {
      this.props.getSelectedPost(false);
      this.setState({ exitBtn: false });
    }
  }
  handleEdit(value) {
    this.setState({ exitBtn: value, editMode: value });
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
            getSelectedPost={this.getSelectedPost}
            getPostUser={this.getPostUser}
            handleEdit={this.handleEdit}
            handleLogout={this.handleLogout}
            other={false}
          />
        </View>
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
                this.props.getSelectedPost(false);
                this.props.getPostUser(false);
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
                this.props.getSelectedPost(false);
                this.props.getPostUser(false);
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
