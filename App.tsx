import React from 'react';
import { StyleSheet } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const App = (): JSX.Element => {

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={styles.container}
        edges={{ top: 'maximum' }}
      >
        <AppNavigator/>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
