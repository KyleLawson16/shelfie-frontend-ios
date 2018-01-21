import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { List, InputItem, Button } from 'antd-mobile';
import { createForm } from 'rc-form';
import styles from '../styles';

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [
        {
          username: "KyleLawson16",
          email: "kyle.lawson7@yahoo.com",
          password: "password"
        },
        {
          username: "ToughGuy",
          email: "brendan@shelfiechallenge.com",
          password: "password"
        }
      ]
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    this.props.form.validateFields((error, value) => {
      console.log(value);
      let formUser;
      for (i=0; i < this.state.users.length; i++) {
        if (this.state.users[i].username == value.usernameEmail) {
          formUser = this.state.users[i];
        }
      }
      if (!formUser) {
        alert("The username you entered is not valid");
      } else if (formUser.password == value.password) {
        console.log(formUser, "Login");
        this.setState({ user: formUser });
        this.props.handleSignIn(formUser);
      } else {
        alert("Incorrect password");
      }
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
            {...getFieldProps('usernameEmail', {
              rules: [
                {required: true, message: 'Please enter a username'},
              ],
            })}
            type="text"
            placeholder="Username or email"
            labelNumber={5}
            error={getFieldError('usernameEmail')}
            onErrorClick={() => {
              alert(getFieldError('usernameEmail'));
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

const SignInForm = createForm()(SignIn);

export default SignInForm;
