import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { BouncingBallRN, BouncingBallNative } from '../screenConfig';

const Drawer = createDrawerNavigator();

const MainNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName='BouncingBallNative'>
      <Drawer.Screen name="BouncingBallRN" component={BouncingBallRN} options={{ title: 'Bouncing Ball RN' }} />
      <Drawer.Screen name="BouncingBallNative" component={BouncingBallNative} options={{ title: 'Bouncing Ball Native' }} />
    </Drawer.Navigator>
  )
};

export { MainNavigator }