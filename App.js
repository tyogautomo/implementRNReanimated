import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { MainNavigator } from './src/navigations/MainNavigator/MainNavigator';

class App extends Component {


  render() {
    return (
      <NavigationContainer>
        {MainNavigator()}
      </NavigationContainer>
    );
  }
};

export default App;
