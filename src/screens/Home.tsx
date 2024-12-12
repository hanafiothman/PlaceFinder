import React, { useEffect, useState } from 'react';
import { Input } from '@ant-design/react-native';
import { FlatList, Keyboard, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import LayoutView from '../layout/LayoutView';
import useDebounce from '../hooks/useDebounce';
import { getLocationDetails, getLocationsByKeyword } from '../api';
import { PlaceDetails, Prediction } from '../models';
import LocationItem from '../components/LocationItem';
import Map from '../components/Map';
import { connect } from 'react-redux';
import { clearSearchResults, updateSearchHistory, updateSearchResults, updateSelectedLocation } from '../../store/actions';
import { RootState } from '../../store';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { BottomTabParamList } from '../navigation/AppNavigator';

interface HomeScreenProps extends BottomTabScreenProps<BottomTabParamList, 'Home'> {
  searchResults: Prediction[];
  setSearchResults: (results: Prediction[]) => void;
  clearResults: () => void;
  selectedLocation: PlaceDetails;
  setSelectedLocation: (location: PlaceDetails) => void;
  addSearchHistory: (place: PlaceDetails) => void;
}

const Home = ({ searchResults, setSearchResults, clearResults, selectedLocation, setSelectedLocation, addSearchHistory }: HomeScreenProps): JSX.Element => {

  const [searchKeyword, setSearchKeyword] = useState<string>('');

  const debouncedValue = useDebounce(searchKeyword, 500);

  const fetchLocations = async (value: string) => {
    const locations = await getLocationsByKeyword(value);
    if (locations.length) {
      setSearchResults(locations);
    }
  };

  const selectLocation = async (location: Prediction) => {
    clearResults();
    setSearchKeyword('');

    const details = await getLocationDetails(location.place_id);
    if (details) {
      setSelectedLocation(details);
      addSearchHistory(details);
    }
  };

  useEffect(() => {
    if (debouncedValue) {
      fetchLocations(debouncedValue);
    } else {
      clearResults();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  return (
    <LayoutView>
      <TouchableWithoutFeedback
        onPress={Keyboard.dismiss}
        accessible={false}
      >
          <View style={styles.inputContainer}>
            <Input
              placeholder={'Search location here'}
              value={searchKeyword}
              onChangeText={setSearchKeyword}
              style={styles.input}
            />
            { searchResults.length ?
            <View style={styles.listContainer}>
              <FlatList
                style={styles.list}
                horizontal={false}
                data={searchResults}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                  <LocationItem
                    item={item}
                    onPress={() => selectLocation(item)}
                  />
                )}
                keyExtractor={(_, index) => index.toString()}
              />
            </View>
            : selectedLocation.geometry ?
            <View style={styles.mapContainer}>
              <Map
                locationName={selectedLocation.name}
                locationAddress={selectedLocation.formatted_address}
                coordinates={selectedLocation.geometry.location}
              />
            </View>
            :
            null }
        </View>
      </TouchableWithoutFeedback>
    </LayoutView>
  );
};

const mapStateToProps = (state: RootState) => ({
  searchResults: state.home.searchResults,
  selectedLocation: state.home.selectedLocation,
});

const mapDispatchToProps = {
  setSearchResults: updateSearchResults,
  clearResults: clearSearchResults,
  setSelectedLocation: updateSelectedLocation,
  addSearchHistory: updateSearchHistory,
};

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
  },
  input: {
    paddingHorizontal: 10,
    paddingVertical: 2.5,
    borderRadius: 10,
    backgroundColor: '#F4F7FC',
  },
  listContainer: {
    flexGrow: 1,
    marginTop: 10,
  },
  list: {
    flex: 1,
  },
  mapContainer: {
    flexGrow: 1,
    position: 'relative',
    marginTop: 10,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
