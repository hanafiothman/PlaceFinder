import React, { PropsWithChildren } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';

const LayoutView: React.FC<PropsWithChildren> = ({ children }) => {

  const { theme } = useTheme();

  return (
    <View style={{ ...styles.container, backgroundColor: theme.colors.background }}>
      { children }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    borderWidth: 1,
  },
});

export default LayoutView;
