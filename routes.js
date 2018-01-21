import React from 'react';
import { StackNavigator } from 'react-navigation';

import LandingPage from './containers/LandingPage';
import SignIn from './containers/SignIn';
import SignUp from './containers/SignUp';
import GamesPage from './containers/GamesPage';
import GamePage from './containers/GamePage';
import UserPage from './containers/UserPage';
import BottomNavbar from './containers/BottomNavbar';

const MainNavigation = StackNavigator({
    Landing: {
        screen: LandingPage,
    },
    SignIn: {
        screen: SignIn,
    },
    SignUp: {
        screen: SignUp,
    },
    Home: {
      screen: BottomNavbar,
    },
}, {headerMode:'none', initialRouteName: 'Home'});

export default MainNavigation;
