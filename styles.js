import { Dimensions, StyleSheet, Text, View, Image } from 'react-native';

let WINDOW_WIDTH = Dimensions.get('window').width;
let WINDOW_HEIGHT = Dimensions.get('window').height;
let THEME_COLOR = '#19e6a9';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 10,
    height: WINDOW_HEIGHT
  },
  greyHeaderBar: {
    backgroundColor: '#f5f5f9',
    height: 43,
    borderBottomWidth: .6,
    borderBottomColor: '#ddd',
  },

  // GamePage Styles
  gameInfoHeader: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold'
  },
  gameInfoDate: {
    textAlign: 'center',
    fontSize: 16
  },

  // UserPage Styles
  userPhoto: {
    width: 90,
    height: 90,
    borderWidth: 2,
    borderRadius: 50,
    borderColor: '#fff',
    zIndex: 9999,
  },
  userStats: {
    textAlign: 'center',
    marginTop: 10
  },
  userStatsNum: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  userStatsLabel: {
    fontSize: 12,
    color: 'grey'
  },
  userEditBtn: {
    width: '60%',
    height: 25,
    marginRight: '6.5%',
    marginTop: -50
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 16
  },
  userPhotoGrid: {
    width: WINDOW_WIDTH / 3,
    height: WINDOW_WIDTH / 3
  },
  userSubmissionPhoto: {
    width: WINDOW_WIDTH / 3,
    height: WINDOW_WIDTH / 3,
    resizeMode: 'contain',
    borderWidth: 1,
    borderColor: 'white',
  },

  // Challenge Styles
  challengeSubmissionPhoto: {
    width: WINDOW_WIDTH,
    height: WINDOW_WIDTH / 1.116,
    aspectRatio: 1.116,
    resizeMode: 'contain'
  },
  challengeHeader: {
    textAlign: 'center',
    fontSize: 20,
  },
  challengePointHeading: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold'
  },
  challengeCarouselName: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 60
  },
  challengeCarouselDescription: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  challengeCarouselNumber: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'right',
    marginTop: 2,
    marginRight: 5
  },

  // Prize styles
  prizeCarousel: {
    height: WINDOW_HEIGHT,
    backgroundColor: 'rgba(0,0,0,.3)'
  },
  prizeCarouselName: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: (WINDOW_HEIGHT / 2) - 220
  },
  prizeCarouselDescription: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default styles;
