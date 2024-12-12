import React, { useEffect, useState } from 'react';
import { Input } from '@ant-design/react-native';
import { FlatList, Keyboard, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import LayoutView from '../layout/LayoutView';
import useDebounce from '../hooks/useDebounce';
import { getLocationDetails, getLocationsByKeyword } from '../api';
import { PlaceDetails, Prediction } from '../models';
import LocationItem from '../components/LocationItem';
import Map from '../components/Map';

const Home = (): JSX.Element => {
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Prediction[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<PlaceDetails>();

  const debouncedValue = useDebounce(searchKeyword, 500);

  const fetchLocations = async (value: string) => {
    const locations = await getLocationsByKeyword(value);
    if (locations.length) {
      setSearchResults(locations);
    }
  };

  const selectLocation = async (location: Prediction) => {
    setSearchResults([]);
    setSearchKeyword('');

    const details = await getLocationDetails(location.place_id);
    if (details) {
      setSelectedLocation(details);
    }
  };

  useEffect(() => {
    if (debouncedValue) {
      fetchLocations(debouncedValue);
    } else {
      setSearchResults([]);
    }
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
            : selectedLocation ?
            <View style={styles.mapContainer}>
              <Map locationDetails={selectedLocation} />
            </View>
            :
            null }
        </View>
      </TouchableWithoutFeedback>
    </LayoutView>
  );
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

export default Home;
