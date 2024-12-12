import React from 'react';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { RootState } from '../../store';
import { PlaceDetails } from '../models';
import LayoutView from '../layout/LayoutView';
import HistoryItem from '../components/HistoryItem';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { BottomTabParamList } from '../navigation/AppNavigator';
import { clearSearchHistory, updateSelectedLocation } from '../../store/actions';
import { Icon } from '@ant-design/react-native';

interface SearchHistoryScreenProps extends BottomTabScreenProps<BottomTabParamList, 'Search History'> {
  history: PlaceDetails[];
  setSelectedLocation: (location: PlaceDetails) => void;
  clearHistory: () => void;
}

const SearchHistory = ({ history, setSelectedLocation, clearHistory, navigation }: SearchHistoryScreenProps): JSX.Element => {

  const selectHistoryItem = async (item: PlaceDetails) => {
    setSelectedLocation(item);
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
          onPress: () => clearHistory(),
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
          disabled={!history.length}
        >
          <Text style={history.length ? styles.clearLabel : styles.clearLabelDisabled}>
            Clear all
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        style={styles.list}
        horizontal={false}
        data={history}
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
            <Text style={styles.listEmptyText}>
              Your search history is empty.
              Start searching for locations on the Home page.
            </Text>
          </View>
        }
      />
    </LayoutView>
  );
};

const mapStateToProps = (state: RootState) => ({
  history: state.searchHistory,
});

const mapDispatchToProps = {
  setSelectedLocation: updateSelectedLocation,
  clearHistory: clearSearchHistory,
};

const styles = StyleSheet.create({
  header: {
    paddingBottom: 10,
    alignItems: 'flex-end',
  },
  clearLabel: {
    color: '#FFCF00',
  },
  clearLabelDisabled: {
    color: '#E5E5E5',
  },
  list: {
    flex: 1,
  },
  listEmptyContainer: {
    alignItems: 'center',
    padding: 10,
  },
  listEmptyText: {
    color: '#7D7C8E',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchHistory);
