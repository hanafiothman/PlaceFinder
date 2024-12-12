import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from '@ant-design/react-native';
import { Prediction } from '../models';
import { useTheme } from '../theme/ThemeProvider';

interface LocationItemProps {
  item: Prediction,
  onPress: () => void;
}

const LocationItem: React.FC<LocationItemProps> = ({ item, onPress }) => {

  const { theme } = useTheme();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
  >
      <View style={{ ...styles.locationIcon, backgroundColor: theme.colors.grayBackground }}>
        <Icon name={'environment'} color={theme.colors.primary} />
      </View>
      <View style={styles.locationName}>
        <Text>{item.structured_formatting.main_text}</Text>
        <Text style={{ color: theme.colors.gray }}>
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
    borderRadius: 7.5,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 7.5,
    marginRight: 10,
  },
  locationName: {
    flex: 1,
  },
});

export default LocationItem;
