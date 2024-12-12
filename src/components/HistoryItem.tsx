import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from '@ant-design/react-native';
import { PlaceDetails } from '../models';
import { useTheme } from '../theme/ThemeProvider';

interface HistoryItemProps {
  item: PlaceDetails,
  onPress: () => void;
}

const HistoryItem: React.FC<HistoryItemProps> = ({ item, onPress }) => {

  const { theme } = useTheme();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
  >
      <View style={{ ...styles.locationIcon, backgroundColor: theme.colors.grayBackground }}>
        <Icon name={'history'} color={theme.colors.primary} />
      </View>
      <View style={styles.locationName}>
        <Text>{item.name}</Text>
        <Text style={{ color: theme.colors.gray }}>
          {item.formatted_address}
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

export default HistoryItem;
