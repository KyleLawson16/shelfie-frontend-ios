import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { List, InputItem, Button, Flex } from 'antd-mobile';
import ActivityIndicator from 'react-native-activity-indicator';
import { createForm } from 'rc-form';
import styles from '../styles';

import { connect } from 'react-redux';
import { loginUser } from '../actions';

import Storage from 'react-native-storage';
import { AsyncStorage } from 'react-native';

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      errorMessage: false
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.navigate = this.navigate.bind(this);
  }

  handleSignUp() {
    this.props.handleSignUp();
  }

  handleSubmit() {
    this.setState({ loading: true });
    this.props.form.validateFields((error, value) => {
      console.log(value);
      this.props.loginUser(value.username, value.password)
      .then ((response) => {
        console.log(response, 'login');
        this.setState({ loading: false });
        this.navigate(response);
      })
    });
  }

  navigate(response) {
    if (!response.payload.response) { // If no response (success)
      this.setState({ errorMessage: false });
      this.props.getUser(response.payload.data); // Send response data to parent LandingPage and navigate
    }
    else {
      var errorList = [];
      var errors = response.payload.response.data;
      for (key in errors) { // for each item in response object
        errorList.push(errors[key]); // add error description to list
      }
      this.setState({ errorMessage: errorList }); // Set the list of errors as errorMessage
    }
  }

  render() {
    let errors;
    const { getFieldProps, getFieldError } = this.props.form;

    return (
      <View style={styles.container}>
        <Text style={styles.authFormHeader}>Sign In</Text>
        <List style={styles.authForm}>
          <InputItem
            {...getFieldProps('username', {
              rules: [
                {required: true, message: 'Please enter a username'},
              ],
            })}
            type="text"
            placeholder="Username"
            labelNumber={5}
            error={getFieldError('username')}
            onErrorClick={() => {
              alert(getFieldError('username'));
            }}
          >Username</InputItem>
          <InputItem
            {...getFieldProps('password', {
              rules: [
                {required: true, message: 'Please enter a password'},
              ],
            })}
            type="password"
            placeholder="*******"
            labelNumber={5}
            error={getFieldError('password')}
            onErrorClick={() => {
              alert(getFieldError('password'));
            }}
          >Password</InputItem>
          {this.state.errorMessage
            ? <Text style={{ color: 'red' }}>{this.state.errorMessage}</Text>
            : null
          }
          <Button
            style={styles.authFormBtn}
            type="primary"
            onClick={() => this.handleSubmit()}
          >Sign In</Button>
        </List>
        <TouchableOpacity
          onPress={this.handleSignUp.bind(this)}
          style={styles.authChangeSignIn}
        >
          <Text style={{textAlign: 'center'}}>Don&rsquo;t have an account? Tap here to create one</Text>
        </TouchableOpacity>
          {this.state.loading
            ?
            <View
              style={{
                alignItems: 'center',
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-around'
              }}>
              <ActivityIndicator
                size={50}
                thickness={1}
                color="rgb(0,206,202)"
              />
            </View>
            : null
          }
      </View>
    )
  }
}

function mapStateToProps(state) {
  return { pitches: state.pitches };
}

const SignInForm = createForm()(SignIn);

export default connect(mapStateToProps, { loginUser })(SignInForm);
