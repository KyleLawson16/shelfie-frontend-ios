import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { List, InputItem, Button } from 'antd-mobile';
import { createForm } from 'rc-form';
import styles from '../styles';

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    this.props.form.validateFields((error, value) => {
      console.log(value);
      this.props.handleSignUp(value); // Pass user data to parent component (LandingPage)
    });
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
          <Button
            style={styles.authFormBtn}
            type="primary"
            onClick={() => this.handleSubmit()}
          >Sign Up</Button>
        </List>
      </View>
    )
  }
}

const SignUpForm = createForm()(SignUp);

export default SignUpForm;
