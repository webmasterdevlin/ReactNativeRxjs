import React from 'react';
import {
  useNavigationContainerRef,
  NavigationContainer,
} from '@react-navigation/native';

import HomeNavigator from './app/navigators/HomeNavigator';

const App = () => {
  const navigationRef = useNavigationContainerRef();

  return (
    <NavigationContainer ref={navigationRef}>
      <HomeNavigator />
    </NavigationContainer>
  );
};

export default App;
