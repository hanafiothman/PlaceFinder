import React from 'react';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { PlaceDetails } from '../models';
import LayoutView from '../layout/LayoutView';
import HistoryItem from '../components/HistoryItem';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { BottomTabParamList } from '../navigation/AppNavigator';
import { clearSearchHistory, placeDetailsSuccess } from '../store/actions';
import { Icon } from '@ant-design/react-native';
import { RootState, useAppDispatch } from '../store';
import { shallowEqual, useSelector } from 'react-redux';
import { useTheme } from '../theme/ThemeProvider';

const SearchHistory: React.FC<BottomTabScreenProps<BottomTabParamList, 'Search History'>> = ({ navigation }) => {
  const { theme } = useTheme();

  const dispatch = useAppDispatch();

  const searchHistory = useSelector((state: RootState) => state.searchHistory, shallowEqual);

  const selectHistoryItem = async (item: PlaceDetails) => {
    dispatch(placeDetailsSuccess(item));
    navigation.navigate('Home');
  };

  const clearAllHistory = () => {
    Alert.alert('Clear all search history', 'Are you sure to proceed?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => dispatch(clearSearchHistory()),
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <LayoutView>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => clearAllHistory()}
          disabled={!searchHistory.length}
        >
          <Text style={{ color: searchHistory.length ? theme.colors.primary : theme.colors.grayInactive }}>
            Clear all
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        style={styles.list}
        horizontal={false}
        data={searchHistory}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <HistoryItem
            item={item}
            onPress={() => selectHistoryItem(item)}
          />
        )}
        keyExtractor={(_, index) => index.toString()}
        ListEmptyComponent={
          <View style={styles.listEmptyContainer}>
            <Icon
              name={'history'}
              size={'lg'}
            />
            <Text style={{ ...styles.listEmptyText, color: theme.colors.gray }}>
              Your search history is empty.
              Start searching for locations on the Home page.
            </Text>
          </View>
        }
      />
    </LayoutView>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingBottom: 10,
    alignItems: 'flex-end',
  },
  list: {
    flex: 1,
  },
  listEmptyContainer: {
    alignItems: 'center',
    padding: 10,
  },
  listEmptyText: {
    textAlign: 'center',
    marginTop: 10,
  },
});

export default SearchHistory;
