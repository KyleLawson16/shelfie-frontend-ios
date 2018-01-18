import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { WhiteSpace, WingBlank, Flex, Carousel } from 'antd-mobile';
import styles from '../styles';

// Props
// ptValue : The pt value of the group of challenges
// challenges : A list of challenges with the same ptValue
// challenges.name : The name of each challenge
// challenges.description : The description of each challenge

class ChallengeCarousel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      slideIndex: 1,
    }
  }

  render() {
    return (
      <View>
        <WhiteSpace size="md" />
        <Text style={styles.challengePointHeading}>{this.props.ptValue} Points</Text>
        <Carousel className="space-carousel"
          frameOverflow="visible"
          cellSpacing={20}
          slideWidth={0.8}
          autoplay
          autoplayInterval={4000}
          infinite
          beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
          afterChange={index => this.setState({ slideIndex: index })}
        >
          {this.props.challenges.map((challenge) => (
            <View
              key={challenge.name}
            >
              <Flex
                justify="center"
                style={{width: '95%', marginLeft: '2.5%'}}
              >
                <Flex.Item
                  style={{
                    height: 200,
                    backgroundColor: 'rgba(0,0,0,.3)'
                  }}
                >
                  <Text style={styles.challengeCarouselName}>{challenge.name}</Text>
                  <Text style={styles.challengeCarouselDescription}>{challenge.description}</Text>
                </Flex.Item>
              </Flex>
            </View>
          ))}
        </Carousel>
      </View>
    )
  }
}

export default ChallengeCarousel;
