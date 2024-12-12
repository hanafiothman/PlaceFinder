import React, { useEffect, useRef } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { Location } from '../models';
import { Alert, Linking, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from '@ant-design/react-native';

interface MapProps {
  locationName: string;
  locationAddress: string;
  coordinates: Location;
}

const Map = ({ locationName, locationAddress, coordinates }: MapProps): JSX.Element => {
  const mapRef = useRef<MapView>(null);

  const zoomToLocation = ({ lat, lng }: Location) => {
		if (mapRef.current) {
      mapRef.current.animateToRegion({
				latitude: lat,
        longitude: lng,
        latitudeDelta: 0.002,
        longitudeDelta: 0.004,
			}, 1000);
    }
	};

  const getDirections = ({ lat, lng }: Location) => {
    const url = Platform.select({
      ios: `maps://?daddr=${lat},${lng}`,
      android: `geo:0,0?q=${lat},${lng}`,
    });

    if (url) {
      Linking.openURL(url).catch(() =>
        Alert.alert('Error', 'Unable to open the map.')
      );
    }
  };

  useEffect(() => {
    if (coordinates) {
      zoomToLocation(coordinates);
    }
  }, [coordinates]);

  return (
    <>
      <MapView
        provider={undefined}
        ref={mapRef}
        toolbarEnabled={true}
        showsPointsOfInterest={true}
        loadingEnabled={true}
        showsScale={true}
        showsBuildings={true}
        showsMyLocationButton={false}
        showsTraffic={false}
        showsIndoors={false}
        moveOnMarkerPress={true}
        showsUserLocation={false}
        style={styles.map}
      >
        <Marker
          coordinate={{
            latitude: coordinates.lat,
            longitude: coordinates.lng,
          }}
        />
      </MapView>
      <View style={styles.details}>
        <View style={styles.address}>
          <Text>{locationName}</Text>
          <Text style={styles.addressText}>
            {locationAddress}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => getDirections(coordinates)}
        >
          <Icon name={'environment'} color={'#FFCF00'} />
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  details: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  address: {
    flex: 1,
    marginRight: 10,
  },
  addressText: {
    color: '#7D7C8E',
    marginTop: 5,
  },
});

export default Map;
