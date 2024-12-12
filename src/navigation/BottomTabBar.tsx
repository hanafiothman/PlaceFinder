import React from 'react';
import { Icon, TabBar } from '@ant-design/react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { OutlineGlyphMapType } from '@ant-design/icons-react-native';

const BottomTabBar = ({ state: { routes, index }, navigation }: BottomTabBarProps): JSX.Element => {

  const getIcon = (routeName: string): OutlineGlyphMapType => {
    switch(routeName) {
      case 'Home':
        return 'home';
      case 'Search History':
        return 'history';
      default:
        return 'home';
    }
  };

  const onPress = (routeKey: string, isFocused: boolean, routeName: string) => {
    const event = navigation.emit({
      type: 'tabPress',
      target: routeKey,
      canPreventDefault: true,
    });

    if(!isFocused && !event.defaultPrevented) {
      navigation.navigate(routeName);
    }
  };
  return (
    <TabBar
      unselectedTintColor={'#7D7C8E'}
      tintColor={'#FFCF00'}
      barTintColor={'#F4F7FC'}
    >
      {routes.map((route, idx) => {
        const isFocused = idx === index;

        return (
          <TabBar.Item
            key={route.key}
            title={route.name}
            icon={<Icon name={getIcon(route.name)} />}
            selected={isFocused}
            onPress={() => onPress(route.key, isFocused, route.name)}
          />
        );
      })}
    </TabBar>
  );
};

export default BottomTabBar;
