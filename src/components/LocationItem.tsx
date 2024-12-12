import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from '@ant-design/react-native';
import { Prediction } from '../models';

interface LocationItemProps {
  item: Prediction,
  onPress: () => void;
}

const LocationItem = ({ item, onPress }: LocationItemProps): JSX.Element => {

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
  >
      <View style={styles.locationIcon}>
        <Icon name={'environment'} color={'#FFCF00'} />
      </View>
      <View style={styles.locationName}>
        <Text>{item.structured_formatting.main_text}</Text>
        <Text style={styles.locationNameSecondary}>
          {item.structured_formatting.secondary_text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  locationIcon: {
    backgroundColor: '#F4F7FC',
    borderRadius: 7.5,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 7.5,
    marginRight: 10,
  },
  locationName: {
    flex: 1,
  },
  locationNameSecondary: {
    color: '#7D7C8E',
  },
});

export default LocationItem;
