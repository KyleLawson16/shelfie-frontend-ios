import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { WhiteSpace, WingBlank, Flex, Carousel, Button } from 'antd-mobile';
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
      slideIndex: 0,
    }
  }

  render() {
    const totalChallenges = this.props.challenges.length;
    return (
      <View>
        <WhiteSpace size="lg" />
        <WhiteSpace size="md" />
        <Text style={styles.challengePointHeading}>{this.props.ptValue} Points</Text>
        <WhiteSpace size="md" />
        <Carousel
          frameOverflow="visible"
          cellSpacing={20}
          slideWidth={0.8}
          dots={false}
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
                style={{width: '100%'}}
              >
                <Flex.Item
                  style={{
                    height: 220,
                    backgroundColor: 'rgba(0,0,0,.3)'
                  }}
                >
                  <Text style={styles.challengeCarouselNumber}>{this.state.slideIndex + 1} / {totalChallenges}</Text>
                  <Text style={styles.challengeCarouselName}>{challenge.name}</Text>
                  <Text style={styles.challengeCarouselDescription}>{challenge.description}</Text>
                  <Button
                    type="ghost"
                    style={styles.challengeSubmissionBtn}
                    onPressIn={() => {this.props.submission(challenge)}}
                  >
                    <Text style={{color: 'white'}}>Add Submission</Text>
                  </Button>
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
