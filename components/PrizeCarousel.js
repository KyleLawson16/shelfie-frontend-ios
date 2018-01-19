import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { WhiteSpace, WingBlank, Flex, Carousel } from 'antd-mobile';
import styles from '../styles';

// Props
// ptValue : The pt value of the group of challenges
// challenges : A list of challenges with the same ptValue
// challenges.name : The name of each challenge
// challenges.description : The description of each challenge

class PrizeCarousel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      slideIndex: 1,
    }
  }

  render() {
    const totalPrizes = this.props.prizes.length;
    return (
        <Carousel
          frameOverflow="visible"
          cellSpacing={20}
          slideWidth={0.8}
          dots={false}
          autoplay
          autoplayInterval={4000}
          infinite
          beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
          afterChange={index => this.setState({ slideIndex: index })}
        >
          {this.props.prizes.map((prize) => (
            <View
              key={prize.name}
            >
              <Flex
                justify="center"
                style={{width: '100%'}}
              >
                <Flex.Item
                  style={styles.prizeCarousel}
                >
                  <Text style={styles.challengeCarouselNumber}>{this.state.slideIndex + 1} / {totalPrizes}</Text>
                  <Text style={styles.prizeCarouselName}>{prize.name}</Text>
                  <Text style={styles.prizeCarouselDescription}>{prize.description}</Text>
                </Flex.Item>
              </Flex>
            </View>
          ))}
        </Carousel>
    )
  }
}

export default PrizeCarousel;