import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList } from 'react-native';
import { WhiteSpace, List, Icon } from 'antd-mobile';
import styles from '../styles';

const Item = List.Item;
const Brief = Item.Brief;

class LeaderboardItem extends Component {
  render() {
    return (
      <Item
        thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
        extra={<Icon type={'\ue645'} />}
        onClick={() => {}}
      >
        Username
        <Brief>
          # of points
        </Brief>
      </Item>
    )
  }
}

export default LeaderboardItem;
