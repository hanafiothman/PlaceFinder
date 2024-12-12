import React, { useEffect, useRef } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { Location, PlaceDetails } from '../models';
import { Alert, Linking, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from '@ant-design/react-native';

interface MapProps {
  locationDetails: PlaceDetails;
}

const Map = ({ locationDetails }: MapProps): JSX.Element => {
  const mapRef = useRef<MapView>(null);

  const zoomToLocation = (location: Location) => {
		if (mapRef.current) {
      mapRef.current.animateToRegion({
				latitude: location.lat,
        longitude: location.lng,
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
    if (locationDetails) {
      zoomToLocation(locationDetails.geometry.location);
    }
  }, [locationDetails]);

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
            latitude: locationDetails.geometry.location.lat,
            longitude: locationDetails.geometry.location.lng,
          }}
        />
      </MapView>
      <View style={styles.details}>
        <View style={styles.address}>
          <Text>{locationDetails.name}</Text>
          <Text style={styles.addressText}>
            {locationDetails.formatted_address}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => getDirections(locationDetails.geometry.location)}
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
