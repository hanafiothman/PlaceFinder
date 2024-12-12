import React, { PropsWithChildren } from 'react';
import { StyleSheet, View } from 'react-native';

const LayoutView = ({ children }: PropsWithChildren): JSX.Element => {

  return (
    <View style={styles.container}>
      { children }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
});

export default LayoutView;
