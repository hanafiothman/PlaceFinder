import React from 'react';
import { Icon, TabBar } from '@ant-design/react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { OutlineGlyphMapType } from '@ant-design/icons-react-native';
import { useTheme } from '../theme/ThemeProvider';
import { StyleSheet, View } from 'react-native';

const BottomTabBar: React.FC<BottomTabBarProps> = ({ state: { routes, index }, navigation }) => {

  const { theme } = useTheme();

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
    <View style={styles.container}>
      <TabBar
        unselectedTintColor={theme.colors.gray}
        tintColor={theme.colors.primary}
        barTintColor={theme.colors.grayBackground}
        // @ts-ignore
        styles={{
          tabs: {
            flexGrow: 1,
          },
        }}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.1,
  },
});

export default BottomTabBar;
