import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { BouncingBallRN, BouncingBallNative, TouchableExample } from '../screenConfig';

const Drawer = createDrawerNavigator();

const MainNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="TouchableExample">
      <Drawer.Screen name="BouncingBallRN" component={BouncingBallRN} options={{ title: 'Bouncing Ball RN' }} />
      <Drawer.Screen name="BouncingBallNative" component={BouncingBallNative} options={{ title: 'Bouncing Ball Native' }} />
      <Drawer.Screen name="TouchableExample" component={TouchableExample} options={{ title: 'Touchable Example' }} />
    </Drawer.Navigator>
  )
};

export { MainNavigator }