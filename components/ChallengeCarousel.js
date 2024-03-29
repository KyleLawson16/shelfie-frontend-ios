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
      <View style={styles.backgroundOffColor}>
        <Text style={styles.challengePointHeading}>{this.props.ptValue} Points</Text>
        <Carousel
          slideWidth={1}
          dots={true}
          beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
          afterChange={index => this.setState({ slideIndex: index })}
        >
          {this.props.challenges.map((challenge) => (
            <View
              key={challenge.name}
            >
              <Flex>
              <Image
                style={{
                  width: '100%',
                  height: 220,
                }}
                source={{ uri: challenge.background_photo }}
              />
                <Flex.Item style={{ position: 'absolute', width: '100%', height: 220}}>
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
