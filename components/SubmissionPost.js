import React, { Component } from 'react';
import { Text, View, ScrollView, Image } from 'react-native';
import { WhiteSpace, List, InputItem, Button } from 'antd-mobile';
import { createForm } from 'rc-form';
import Video from 'react-native-video';
import styles from '../styles';

class SubmissionPost extends Component {
  constructor(props) {
    super(props);

  }

  handleSubmit() {
    console.log('submit');
  }

  render() {
    console.log(this.props.path);
    console.log(this.props.type);
    const { getFieldProps, getFieldError } = this.props.form;

    return (
      <ScrollView style={styles.container}>
        <Text style={{ fontSize: 22, textAlign: 'center'}}>Add a caption</Text>
        {this.props.type == "photo"
          ?
          <Image
            source={{uri: this.props.path, isStatic:true}}
            style={{ width: '90%', height: 300, marginLeft: '5%' }}
          />
          :
          <Video source={{uri: this.props.path, mainVer: 1, patchVer: 0}}
            ref={(ref) => {
              this.player = ref
            }}
            rate={1.0}
            volume={1.0}
            muted={false}
            paused={false}
            resizeMode="cover"
            repeat={true}
            style={{ width: '90%', height: 300, marginLeft: '5%'  }}
          />
        }
        <List style={styles.authForm}>
          <InputItem
            {...getFieldProps('team', {
            })}
            type="text"
            placeholder="Wooooo..."
            labelNumber={4}
            maxLength={30}
          >Caption</InputItem>
          <Button
            style={styles.authFormBtn}
            type="primary"
            onClick={() => this.handleSubmit()}
          >Submit Post</Button>
        </List>
      </ScrollView>
    )
  }
}

const SubmissionPostWrapper = createForm()(SubmissionPost);

export default SubmissionPostWrapper;
