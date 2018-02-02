import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { WhiteSpace } from 'antd-mobile';
import styles from '../styles';

import UserInfo from '../components/UserInfo';
import UserSubmissions from '../components/UserSubmissions';
import UserFormWrapper from '../components/UserForm';

class UserPage extends Component {
  constructor(props) {
    super(props);

    this.state = { editMode: false };

    this.handleEditBtn = this.handleEditBtn.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  handleEditBtn(editMode) {
    this.setState({ editMode: editMode });
  }
  handleSave(value) {
    this.setState({ editMode: false });
  }

  render() {
    return (
      <View style={styles.container}>
          {
            this.state.editMode
            ?
            <ScrollView>
              <UserFormWrapper handleSave={this.handleSave} />
            </ScrollView>
            :
            <ScrollView>
              <UserInfo
                user={this.props.user}
                handleEditBtn={this.handleEditBtn}
              />
              <WhiteSpace />
              <UserSubmissions />
            </ScrollView>
          }
      </View>
    )
  }
}

export default UserPage;
