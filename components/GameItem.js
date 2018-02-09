import React, { Component } from 'react';
import { Text, View, FlatList, Image } from 'react-native';
import { WhiteSpace, Flex } from 'antd-mobile';
import moment from 'moment';
import styles from '../styles';

class GameItem extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <View>
        <View>
          <Flex>
            <Flex.Item>
              <Text style={styles.gameDateShort}>{moment.parseZone(this.props.date).format('MM/DD/YY')}</Text>
            </Flex.Item>
            <Flex.Item>
              <Text style={styles.gameFans}>
                {this.props.fans.length == 1 ? `${this.props.fans.length} fan` : `${this.props.fans.length} fans`}
              </Text>
            </Flex.Item>
          </Flex>
          <Flex>
            <View style={styles.gameLogoColumn}>
              <Image
                source={{ uri: this.props.awayTeam.logo_url }}
                style={{ width: 50, height: 50 }}
              />
            </View>
            <View style={{ width: '60%' }}>
              <Text style={styles.gameTeams}>{this.props.awayTeam.name} @ {this.props.homeTeam.name}</Text>
              <Text style={styles.gameLocation}>{this.props.location}</Text>
              <Text style={styles.gameDateLong}>{moment.parseZone(this.props.date).calendar()}</Text>
            </View>
            <View style={styles.gameLogoColumn}>
              <Image
                source={{ uri: this.props.homeTeam.logo_url }}
                style={{ width: 50, height: 50 }}
              />
            </View>
          </Flex>
        </View>
      </View>
    )
  }
}

export default GameItem;
