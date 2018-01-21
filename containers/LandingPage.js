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
  handleSignUp() {
    this.setState({ authType: 'signUp' });
  }

  getUser(user) {
    console.log(user, 'landing page');
    this.props.handleUser(user); // pass user data to parent component (App)
  }

  render() {
    console.log(this.state.authType);
    if (this.state.authType == 'signIn') {
      return (
        <View>
          <SignInForm handleSignIn={this.getUser} />
          <TouchableOpacity
          onPress={this.handleSignUp}
          style={styles.authChangeSignIn}>
            <Text style={{textAlign: 'center'}}>Don&rsquo;t have an account? Tap here to create one</Text>
          </TouchableOpacity>
        </View>
      )
    }
    else if (this.state.authType == 'signUp') {
      return (
        <View>
          <SignUpForm handleSignUp={this.getUser} />
          <TouchableOpacity
          onPress={this.handleSignIn}
          style={styles.authChangeSignUp}>
            <Text style={{textAlign: 'center'}}>Already have an account? Tap here to sign in</Text>
          </TouchableOpacity>
        </View>
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
              <Button onPressIn={this.handleSignIn} type="primary">Sign In</Button>
              <WhiteSpace />
              <Button onPressIn={this.handleSignUp} type="primary">Sign Up</Button>
            </Flex.Item>
          </Flex>
        </View>
      )
    }
  }
}

export default LandingPage;
