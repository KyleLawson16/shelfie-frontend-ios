import React, { Component } from 'react';
import { Text, View, FlatList } from 'react-native';
import { Tabs, Icon, Flex } from 'antd-mobile';

import ChallengeSubmissions from '../components/ChallengeSubmissions';
import ChallengePage from './ChallengePage';

// Props
// inactiveTabColor : color of icon when not active
// activeTabColor : color of icon when active

class GameNavbar extends Component {
  constructor(props) {
    super(props);

    this.state = { activeIconColor: [this.props.activeTabColor, this.props.inactiveTabColor, this.props.inactiveTabColor, this.props.inactiveTabColor]} // Initial state of icon colors
  }
  updateIconColor(tab, index) {
    var tabColorList = [
      this.props.inactiveTabColor,
      this.props.inactiveTabColor,
      this.props.inactiveTabColor,
      this.props.inactiveTabColor
    ]; // Create array with all tabs set to inactive color
    tabColorList[index] = this.props.activeTabColor; // Change active tab color
    console.log(tabColorList);
    this.setState({ activeIconColor: tabColorList }); // Add array of tab colors to state
  }
  render() {
    const tabs = [
      { title: <Text><Icon type={'\ue695'} color={this.state.activeIconColor[0]} /></Text> },
      { title: <Text><Icon type={'\ue639'} color={this.state.activeIconColor[1]} /></Text> },
      { title: <Text><Icon type={'\ue638'} color={this.state.activeIconColor[2]} /></Text> },
      { title: <Text><Icon type={'\ue661'} color={this.state.activeIconColor[3]} /></Text> },
    ];
    return (
      <Tabs
        tabs={tabs}
        initialPage={0}
        swipeable={false}
        tabBarUnderlineStyle={{ backgroundColor: this.props.activeTabColor, borderColor: this.props.activeTabColor }}
        onChange={(tab, index) => this.updateIconColor(tab, index)}
      >
        <View>
          <FlatList
            data={[{key: 'a'}, {key: 'b'}, {key: 'c'}]}
            renderItem={({item}) => <ChallengeSubmissions key={item.key} />}
          />
        </View>

        <View>
          <ChallengePage />
        </View>

        <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 250, backgroundColor: '#fff' }}>
          <Text>Content of third tab</Text>
        </View>
        <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 250, backgroundColor: '#fff' }}>
          <Text>Content of fourth tab</Text>
        </View>
      </Tabs>
    )
  }
}

export default GameNavbar;
