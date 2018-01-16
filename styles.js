import { Dimensions, StyleSheet, Text, View } from 'react-native';

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
    marginRight: '7%',
    marginTop: -50
  }
});

export default styles;
