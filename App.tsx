import React from 'react';
import { StyleSheet } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Provider as ReduxProvider } from 'react-redux';
import store from './store';

const App = (): JSX.Element => {

  return (
    <ReduxProvider store={store}>
      <SafeAreaProvider>
        <SafeAreaView
          style={styles.container}
          edges={{ top: 'maximum' }}
        >
          <AppNavigator/>
        </SafeAreaView>
      </SafeAreaProvider>
    </ReduxProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
