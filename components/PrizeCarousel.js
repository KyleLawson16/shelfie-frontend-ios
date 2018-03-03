import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { WhiteSpace, WingBlank, Flex, Carousel } from 'antd-mobile';
import styles from '../styles';

// Props
// prizes : A list of prizes
// prizes.name : The name of each prize
// prizes.description : The description of each prize

class PrizeCarousel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      slideIndex: 0,
    }
  }

  render() {
    const totalPrizes = this.props.prizes.length;
    return (
        <Carousel
          frameOverflow="visible"
          cellSpacing={20}
          slideWidth={0.8}
          dots={true}
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
              <Image
                style={styles.prizeCarousel}
                source={{ uri: prize.background_photo }}
              />
                <Flex.Item style={[styles.prizeCarousel, { position: 'absolute' }]}>
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
