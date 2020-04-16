import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { BouncingBallRN, BouncingBallNative, TouchableExample, Instagram } from '../screenConfig';

const Drawer = createDrawerNavigator();

const MainNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="Instagram">
      <Drawer.Screen name="BouncingBallRN" component={BouncingBallRN} options={{ title: 'Bouncing Ball RN' }} />
      <Drawer.Screen name="BouncingBallNative" component={BouncingBallNative} options={{ title: 'Bouncing Ball Native' }} />
      <Drawer.Screen name="TouchableExample" component={TouchableExample} options={{ title: 'Touchable Example' }} />
      <Drawer.Screen name="Instagram" component={Instagram} options={{ title: 'Instagram Profile' }} />
    </Drawer.Navigator>
  )
};

export { MainNavigator }