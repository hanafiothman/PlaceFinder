import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Home from '../screens/Home';
import SearchHistory from '../screens/SearchHistory';
import BottomTabBar from './BottomTabBar';

export type BottomTabParamList = {
  'Home': undefined,
  'Search History': undefined,
};

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

const AppNavigator = (): JSX.Element => {

  return (
    <NavigationContainer>
      <BottomTab.Navigator
        initialRouteName={'Home'}
        tabBar={BottomTabBar}
        screenOptions={{ headerShown: false }}
      >
        <BottomTab.Screen
          name={'Home'}
          component={Home}
        />
        <BottomTab.Screen
          name={'Search History'}
          component={SearchHistory}
        />
      </BottomTab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
