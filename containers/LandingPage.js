import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Button, Flex, WhiteSpace } from 'antd-mobile';
import styles from '../styles';

import SignInForm from './SignIn';
import SignUpForm from './SignUp';

class LandingPage extends Component {
  constructor(props) {
    super(props);

    this.state = { authType: false };

    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.getUser = this.getUser.bind(this);
  }

  handleSignIn() {
    this.setState({ authType: 'signIn' });
  }
  handleSignUp(value) {
    this.setState({ authType: 'signUp' });
  }

  getUser(user) {
    console.log(user, 'landing page');
    this.props.handleUser(user); // pass user data to parent component (App)
  }

  render() {
    if (this.state.authType == 'signIn') {
      return (
        <SignInForm getUser={this.getUser} handleSignUp={this.handleSignUp} />
      )
    }
    else if (this.state.authType == 'signUp') {
      return (
        <SignUpForm getUser={this.getUser} handleSignIn={this.handleSignIn} />
      )
    }
    else {
      return (
        <View style={[styles.container, styles.verticalCenter]}>
          <Flex
            style={styles.landingContent}
            align="center"
            justify="center"
          >
            <Flex.Item>
              <Text>SHELFIE</Text>
              <Button
                style={styles.authFormBtn}
                onPressIn={this.handleSignIn}
                type="primary">
                Sign In
              </Button>
              <Button
                style={styles.authFormBtn}
                onPressIn={this.handleSignUp}
                type="primary">
                Sign Up
              </Button>
            </Flex.Item>
          </Flex>
        </View>
      )
    }
  }
}

export default LandingPage;
