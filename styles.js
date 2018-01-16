import { Dimensions, StyleSheet, Text, View, Image } from 'react-native';

let WINDOW_WIDTH = Dimensions.get('window').width;
let WINDOW_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 30,
    height: WINDOW_HEIGHT
  },

  // UserPage Styles
  userPhoto: {
    width: 90,
    height: 90,
    borderWidth: 2,
    borderRadius: 50,
    borderColor: '#fff',
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
    fontWeight: 'bold'
  },
  userPhotoGrid: {
    width: WINDOW_WIDTH / 3,
    height: WINDOW_WIDTH / 3
  },
  userSubmissionPhoto: {
    width: WINDOW_WIDTH / 3,
    height: WINDOW_WIDTH / 3,
  },

  // Challenge Styles
  challengeSubmissionPhoto: {
    width: WINDOW_WIDTH,
    aspectRatio: 1.28,
    resizeMode: 'contain'
  }
});

export default styles;
