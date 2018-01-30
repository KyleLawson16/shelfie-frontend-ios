import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { List, InputItem, Button } from 'antd-mobile';
import { createForm } from 'rc-form';
import styles from '../styles';

import { connect } from 'react-redux';
import { loginUser } from '../actions';

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    this.props.form.validateFields((error, value) => {
      console.log(value);
      this.props.loginUser(value.username, value.password)
      .then ((response) => {
        console.log(response, 'login');
      })
    });
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
          <Button
            style={styles.authFormBtn}
            type="primary"
            onClick={() => this.handleSubmit()}
          >Sign In</Button>
        </List>
      </View>
    )
  }
}

function mapStateToProps(state) {
  return { pitches: state.pitches };
}

const SignInForm = createForm()(SignIn);

export default connect(mapStateToProps, { loginUser })(SignInForm);
