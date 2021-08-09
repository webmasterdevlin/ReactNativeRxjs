import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import SecondScreen from '../screens/SecondScreen';
import FirstScreen from '../screens/FirstScreen';

const HomeStack = createStackNavigator();

const HomeNavigator = () => {
  return (
    <HomeStack.Navigator initialRouteName={'First Screen'}>
      <HomeStack.Screen name="First Screen" component={FirstScreen} />
      <HomeStack.Screen name="Second Screen" component={SecondScreen} />
    </HomeStack.Navigator>
  );
};

export default HomeNavigator;
