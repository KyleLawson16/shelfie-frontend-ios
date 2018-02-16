import { Dimensions, StyleSheet, Text, View, Image } from 'react-native';

let WINDOW_WIDTH = Dimensions.get('window').width;
let WINDOW_HEIGHT = Dimensions.get('window').height;
let THEME_COLOR = 'rgb(0,206,202)';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    height: WINDOW_HEIGHT
  },
  containerBackground: {
    flex: 1,
    backgroundColor: '#f5f5f9',
    height: WINDOW_HEIGHT
  },
  verticalCenter: {
    justifyContent: 'center',
  },
  greyHeaderBar: {
    backgroundColor: '#f5f5f9',
    height: 43,
    borderBottomWidth: .6,
    borderBottomColor: '#ddd',
  },
  topNavbar: {
    backgroundColor: '#f9f9f9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: .5 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    zIndex: 9999,
    // transform: [{ skewY: '-1.5deg' }],
  },
  bottomNavbar: {
    backgroundColor: '#f9f9f9',
    borderTopWidth: 0,
    borderColor: '#fff',
    borderStyle: 'solid',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: .5 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },

  // Authentication Styles
  landingContent: {
    width: '90%',
    marginLeft: '5%',
  },
  authForm: {
    width: '90%',
    marginLeft: '5%',
  },
  authFormHeader: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    marginTop: 50,
  },
  authFormBtn: {
    marginTop: 15,
    backgroundColor: THEME_COLOR,
    borderColor: THEME_COLOR,
  },
  authChangeSignIn: {
    marginTop: 10,
    width: '90%',
    marginLeft: '5%',
    height: 20,
  },
  authChangeSignUp: {
    marginTop: 10,
    width: '90%',
    marginLeft: '5%',
    height: 20,
  },

  // GamesPage Styles
  gameDivider: {
    backgroundColor: '#f5f5f9',
  },
  gameDateShort: {
    textAlign: 'left',
    fontSize: 14,
    marginLeft: 10,
    marginTop: 8,
  },
  gameFans: {
    textAlign: 'right',
    fontSize: 14,
    marginRight: 10,
    marginTop: 8,
  },
  gameTeams: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 15,
  },
  gameLogoColumn: {
    width: '20%',
    alignItems: 'center',
  },
  gameLocation: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  gameDateLong: {
    textAlign: 'center',
    fontSize: 14,
    marginBottom: 20,
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
    borderRadius: 45,
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
    width: '30%',
    height: 25,
    marginRight: '4%',
    marginTop: -50
  },
  userFollowBtn: {
    width: '40%',
    height: 30,
    marginRight: '14%',
    marginTop: -45,
    borderColor: THEME_COLOR,
  },
  userFollowedBtn: {
    width: '40%',
    height: 30,
    marginRight: '14%',
    marginTop: -45,
    borderColor: THEME_COLOR,
    backgroundColor: THEME_COLOR,
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
    resizeMode: 'cover',
    borderWidth: .5,
    borderColor: 'white',
  },
  userSubmissionVideo: {
    width: WINDOW_WIDTH / 3,
    height: WINDOW_WIDTH / 3,
    borderWidth: .5,
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
    fontSize: 18,
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
    marginTop: 40
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
  challengeSubmissionBtn: {
    width: '50%',
    height: 35,
    marginLeft: '25%',
    marginTop: 10,
    borderColor: 'white',
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

  // Submission styles
  cameraContainer: {
    flex: 1,
    marginTop: -10,
    height: WINDOW_HEIGHT
  },
  cameraBox: {
    flex: 1,
  },
  iconBackground: {
    backgroundColor: 'transparent',
  },
  cameraSwitch: {
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    marginTop: 25,
    marginRight: 15,
    marginLeft: 15,
    flex: 1,
  },
  cameraBottomNav: {
    alignItems: 'center',
    height: 120,
  }
});

export default styles;
