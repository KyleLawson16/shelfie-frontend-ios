import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Flex, Icon, WingBlank, WhiteSpace } from 'antd-mobile';

class TopNavbar extends Component {
  render() {
    return (
      <View>
        <WhiteSpace />
        <WingBlank size="md">
          <Flex>
            <Flex.Item>
              <Text><Icon type={"\ue66a"} /></Text>
            </Flex.Item>
            <Flex.Item>
              <Text style={{ textAlign: 'center' }}>SHELFIE</Text>
            </Flex.Item>
            <Flex.Item>
              <Text style={{ textAlign: 'right' }}><Icon type={"\ue670"} /></Text>
            </Flex.Item>
          </Flex>
        </WingBlank>
        <WhiteSpace />
      </View>
    )
  }
}

export default TopNavbar;
