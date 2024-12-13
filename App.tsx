import React from 'react';
import { StyleSheet } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Provider as ReduxProvider } from 'react-redux';
import store from './src/store';
import ThemeProvider from './src/theme/ThemeProvider';

const App = (): JSX.Element => {

  return (
    <ThemeProvider>
      <ReduxProvider store={store}>
        <SafeAreaProvider>
          <SafeAreaView
            style={styles.container}
            edges={{ top: 'maximum' }}
          >
            <AppNavigator />
          </SafeAreaView>
        </SafeAreaProvider>
      </ReduxProvider>
    </ThemeProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
