import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { WhiteSpace } from 'antd-mobile';
import styles from '../styles';

import { connect } from 'react-redux';
import { fetchPosts } from '../actions';

import UserInfo from '../components/UserInfo';
import UserSubmissions from '../components/UserSubmissions';
import UserFormWrapper from '../components/UserForm';

class UserPage extends Component {
  constructor(props) {
    super(props);

    this.state = { editMode: false, userPosts: false, totalPoints: 0 };

    this.handleEditBtn = this.handleEditBtn.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  componentWillMount() {
    this.props.fetchPosts(this.props.token, 'user', this.props.user.random_user_id)
    .then((res) => {
      console.log(res);
      var totalPoints = 0;
      res.payload.data.forEach(post => {
        totalPoints += post.challenge.point_value;
      })
      this.setState({ userPosts: res.payload.data, totalPoints: totalPoints });
    });
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
                totalPoints={this.state.totalPoints}
              />
              <WhiteSpace />
              <UserSubmissions
                token={this.props.token}
                user={this.props.user}
                userPosts={this.state.userPosts}
              />
            </ScrollView>
          }
      </View>
    )
  }
}

function mapStateToProps(state) {
  return { pitches: state.pitches };
}

export default connect(mapStateToProps, { fetchPosts })(UserPage);
