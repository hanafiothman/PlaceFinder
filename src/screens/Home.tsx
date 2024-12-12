import React, { useEffect, useState } from 'react';
import { Input } from '@ant-design/react-native';
import { FlatList, Keyboard, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import LayoutView from '../layout/LayoutView';
import useDebounce from '../hooks/useDebounce';
import { Prediction } from '../models';
import LocationItem from '../components/LocationItem';
import Map from '../components/Map';
import { shallowEqual, useSelector } from 'react-redux';
import { clearSearchResults, placeDetailsRequest, searchLocationsRequest } from '../../store/actions';
import { RootState, useAppDispatch } from '../../store';
import { useTheme } from '../theme/ThemeProvider';

const Home = (): JSX.Element => {

  const { theme } = useTheme();

  const [searchKeyword, setSearchKeyword] = useState<string>('');

  const debouncedValue = useDebounce(searchKeyword, 500);

  const dispatch = useAppDispatch();

  const searchResults = useSelector((state: RootState) => state.home.searchResults, shallowEqual);
  const selectedLocation = useSelector((state: RootState) => state.home.selectedLocation, shallowEqual);

  const selectLocation = async (location: Prediction) => {
    setSearchKeyword('');
    dispatch(clearSearchResults());
    dispatch(placeDetailsRequest(location.place_id));
  };

  useEffect(() => {
    if (debouncedValue) {
      dispatch(searchLocationsRequest(debouncedValue));
    } else {
      dispatch(clearSearchResults());
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
            style={{ ...styles.input, backgroundColor: theme.colors.grayBackground }}
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

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
  },
  input: {
    paddingHorizontal: 10,
    paddingVertical: 2.5,
    borderRadius: 10,
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
