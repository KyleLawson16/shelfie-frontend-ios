import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { List, InputItem, TextareaItem, Button } from 'antd-mobile';
import { createForm } from 'rc-form';
import styles from '../styles';

class UserForm extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    this.props.form.validateFields((error, value) => {
      console.log(value);
      this.props.handleSave(value); // Pass user data to parent component (LandingPage)
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

  render() {
    let errors;
    const { getFieldProps, getFieldError } = this.props.form;

    return (
      <View style={styles.container}>
        <Text style={styles.authFormHeader}>Edit Your Info</Text>
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
            labelNumber={7}
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
            labelNumber={7}
            error={getFieldError('username')}
            onErrorClick={() => {
              alert(getFieldError('username'));
            }}
          >Username</InputItem>
          <InputItem
            {...getFieldProps('team', {
            })}
            type="text"
            placeholder="Horned Toads"
            labelNumber={7}
            maxLength={30}
          >Favorite Team</InputItem>
          <Button
            style={styles.authFormBtn}
            type="primary"
            onClick={() => this.handleSubmit()}
          >Save Changes</Button>
        </List>
      </View>
    )
  }
}

const UserFormWrapper = createForm()(UserForm);

export default UserFormWrapper;
