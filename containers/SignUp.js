import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { List, InputItem, Button } from 'antd-mobile';
import ActivityIndicator from 'react-native-activity-indicator';
import { createForm } from 'rc-form';
import styles from '../styles';

import { connect } from 'react-redux';
import { createUser, loginUser } from '../actions';

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      errorMessage: false
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.navigate = this.navigate.bind(this);
  }

  handleSignIn() {
    this.props.handleSignIn();
  }

  handleSubmit() {
    this.setState({ loading: true });
    this.props.form.validateFields((error, value) => {
      var firstName = value.name.split(" ")[0]; // Separate first & last name from full name
      var lastName = value.name.split(" ")[1];
      this.props.createUser( // Send new user to API
        firstName,
        lastName,
        value.username,
        value.email,
        value.password,
        value.confirm,
      ).then((response) => { // Get response
        this.setState({ loading: false });
        this.navigate(response, value.username, value.password); // Call navigate function
      });
    });
  }

  navigate(response, username, password) {
    if (!response.payload.response) { // If no response (success)
      console.log(response.payload.response);
      this.setState({ errorMessage: false });
      this.props.loginUser(username, password)
      .then ((response) => {
        console.log(response, 'login');
        this.props.getUser(response.payload.data); // Send response data to parent LandingPage and navigate
      });
    }
    else {
      console.log(response.payload.response);
      var errorList = [];
      var errors = response.payload.response.data;
      for (key in errors) { // for each item in response object
        errorList.push(errors[key]); // add error description to list
      }
      this.setState({ errorMessage: errorList }); // Set the list of errors as errorMessage
    }
  }

  checkName = (rule, value, callback) => {
    const form = this.props.form;
    const nameRegex = /^[a-zA-Z ]+$/;
    if (!value.includes(' ')) { // Check name input for a space (to indicate it is a full name)
      callback('Please enter your first and last name');
    } else if (!value.match(nameRegex)) { // Check name input for any special characters
      callback('Names can only include letters and spaces');
    } else {
      callback();
    }
  }

  checkUsername = (rule, value, callback) => {
    //
    const form = this.props.form;
    const usernameRegex = /^[a-zA-Z0-9]+$/;
    if (!value.match(usernameRegex)) { // Check username for any special characters (can have numbers)
      callback('Usernames can only include letters and numbers');
    } else {
      callback();
    }
  }

  checkPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) { // Compare passwords to ensure they match
      callback('The passwords entered do not match');
    } else {
      callback();
    }
  }

  render() {
    let errors;
    const { getFieldProps, getFieldError } = this.props.form;

    return (
      <View style={styles.container}>
        <Text style={styles.authFormHeader}>Create an Account</Text>
          {this.state.loading
            ? <ActivityIndicator style={{ marginTop: 300 }} toast text="loading" />
            : null
          }
        <List style={styles.authForm}>
          <InputItem
            {...getFieldProps('name', {
              rules: [
                {required: true, message: 'Please enter your full name'},
                {validator: this.checkName}
              ],
            })}
            type="text"
            placeholder="Johnny Appleseed"
            labelNumber={5}
            error={getFieldError('name')}
            onErrorClick={() => {
              alert(getFieldError('name'));
            }}
          >Full Name</InputItem>
          <InputItem
            {...getFieldProps('username', {
              rules: [
                {required: true, message: 'Please enter a username'},
                {validator: this.checkUsername}
              ],
            })}
            type="text"
            placeholder="Tough Guy"
            labelNumber={5}
            error={getFieldError('username')}
            onErrorClick={() => {
              alert(getFieldError('username'));
            }}
          >Username</InputItem>
          <InputItem
            {...getFieldProps('email', {
              rules: [
                {required: true, message: 'Please enter your email address'},
                {type: 'email', message: 'Please enter a valid email address'}
              ],
            })}
            type="email"
            placeholder="example@email.com"
            labelNumber={5}
            error={getFieldError('email')}
            onErrorClick={() => {
              alert(getFieldError('email'));
            }}
          >Email</InputItem>
          <InputItem
            {...getFieldProps('password', {
              rules: [
                {required: true, message: 'Please enter a password'},
                {min: 6, message: 'Your password must be at least 6 characters'},
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
          <InputItem
            {...getFieldProps('confirm', {
              rules: [
                {required: true, message: 'Please confirm your password'},
                {validator: this.checkPassword}
              ],
            })}
            type="password"
            placeholder="Confirm password"
            labelNumber={5}
            error={getFieldError('confirm')}
            onErrorClick={() => {
              alert(getFieldError('confirm'));
            }}
          >Password</InputItem>
          {this.state.errorMessage
            ? <Text style={{ color: 'red' }}>{this.state.errorMessage}</Text>
            : null
          }
          <Button
            style={styles.authFormBtn}
            type="primary"
            onClick={this.handleSubmit}
          >Sign Up</Button>
        </List>
        <TouchableOpacity
          onPress={this.handleSignIn.bind(this)}
          style={styles.authChangeSignUp}
        >
          <Text style={{textAlign: 'center'}}>Already have an account? Tap here to sign in</Text>
        </TouchableOpacity>
        {this.state.loading
          ?
          <View style={[styles.activityIndicatorCenter, styles.activityIndicatorBackground]}>
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

const SignUpForm = createForm()(SignUp);

export default connect(mapStateToProps, { createUser, loginUser })(SignUpForm);
