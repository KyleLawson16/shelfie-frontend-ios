import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { List, InputItem, TextareaItem, Button } from 'antd-mobile';
import { createForm } from 'rc-form';
import styles from '../styles';

import { connect } from 'react-redux';
import { updateUser } from '../actions';

class UserForm extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    this.setState({ loading: true });
    this.props.form.validateFields((error, value) => {
      var firstName = value.name.split(" ")[0]; // Separate first & last name from full name
      var lastName = value.name.split(" ")[1];
      this.props.updateUser( // Send new user to API
        this.props.token,
        this.props.user.random_user_id,
        firstName,
        lastName,
        value.username,
        value.email,
        value.phone
      ).then((res) => { // Get response
        console.log(res);
        this.setState({ loading: false });
        this.props.handleSave(res); // Pass user data to parent component (LandingPage)
      });
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
    console.log(this.props.user.username);
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
              initialValue: `${this.props.user.first_name} ${this.props.user.last_name}`,
            })}
            type="text"
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
              initialValue: this.props.user.username,
            })}
            type="text"
            labelNumber={7}
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
              initialValue: this.props.user.email,
            })}
            type="email"
            labelNumber={7}
            error={getFieldError('email')}
            onErrorClick={() => {
              alert(getFieldError('email'));
            }}
          >Email</InputItem>
          <InputItem
            {...getFieldProps('phone', {
              rules: [
                {required: true},
              ],
              initialValue: this.props.user.phone_number,
            })}
            type="phone"
            placeholder="603 9724 367"
            labelNumber={7}
            maxLength={12}
          >Phone Number</InputItem>
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

function mapStateToProps(state) {
  return { pitches: state.pitches };
}

export default connect(mapStateToProps, { updateUser })(UserFormWrapper);
