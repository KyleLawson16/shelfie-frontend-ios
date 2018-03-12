import { Dimensions, StyleSheet, Text, View, Image } from 'react-native';

let WINDOW_WIDTH = Dimensions.get('window').width;
let WINDOW_HEIGHT = Dimensions.get('window').height;
let THEME_COLOR = 'rgb(0,206,202)';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  containerBackground: {
    flex: 1,
    marginTop: -1,
    backgroundColor: '#f5f5f9',
    height: WINDOW_HEIGHT
  },
  flex1: {
    flex: 1
  },
  containerPaddingTop: {
    paddingTop: 45
  },
  activityIndicatorCenter: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  activityIndicatorTopCenter: {
    position: 'absolute',
    top: '-15%',
    left: 0,
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
    justifyContent: 'center',
    flex: 1,
  },
  activityIndicatorBackground: {
    backgroundColor: '#fff',
    opacity: 0.7,
  },
  backgroundOffColor: {
    backgroundColor: '#fff',
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
    height: 75,
    // transform: [{ skewY: '-1.5deg' }],
  },
  topNavbarLogo:  {
    width: '140%',
    resizeMode: 'contain',
    left: '-20%'
  },
  bottomNavbar: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -.5 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    zIndex: 99999,
  },

  // Authentication Styles
  landingContent: {
    width: '90%',
    marginLeft: '5%',
  },
  landingFoamFinger:  {
    width: '40%',
    height: '40%',
    left: '30%',
    resizeMode: 'contain',
  },
  landingLogo:  {
    width: '65%',
    left: '17.5%',
    resizeMode: 'contain',
    marginBottom: 100,
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
  userPhotoEdit: {
    width: 150,
    height: 150,
    borderWidth: 2,
    borderRadius: 75,
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
    backgroundColor: 'grey',
  },
  userSubmissionVideo: {
    width: WINDOW_WIDTH / 3,
    height: WINDOW_WIDTH / 3,
    borderWidth: .5,
    borderColor: 'white',
    backgroundColor: 'grey',
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
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    backgroundColor: 'transparent',
  },
  challengeCarouselName: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 40,
    backgroundColor: 'transparent',
  },
  challengeCarouselDescription: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    backgroundColor: 'transparent',
  },
  challengeCarouselNumber: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'right',
    marginTop: 2,
    marginRight: 5,
    backgroundColor: 'transparent',
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
    width: '100%',
    height: WINDOW_HEIGHT - 310,
  },
  prizeCarouselName: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: (WINDOW_HEIGHT / 2) - 220,
    backgroundColor: 'transparent',
  },
  prizeCarouselDescription: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    backgroundColor: 'transparent',
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
  },

  // Leaderboard styles
  leaderboardPhoto: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  leaderboardPosition: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  leaderboardName: {
    fontSize: 16,
  },

  // Notification styles
  notificationPhoto: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
    marginTop: 10,
  },
  notificationContent: {
    paddingTop: 14,
    paddingBottom: 15,
  },
});

export default styles;
