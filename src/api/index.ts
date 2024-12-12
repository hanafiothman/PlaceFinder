import { PlaceDetails, Prediction } from '../models';
import Config from 'react-native-config';

export const getLocationsByKeyword = async (keyword: string): Promise<Prediction[]> => {
  try {
    const res = await fetch(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURI(keyword)}&key=${Config.GOOGLE_API_KEY}`);

    if (!res.ok) {
      throw new Error(`Response status: ${res.status}`);
    }

    const resJson = await res.json();

    if (resJson) {
      const { predictions } = resJson;
      return predictions;
    }

    return [];
  } catch(e) {
    console.log(e);
    throw e;
  }
};

export const getLocationDetails = async (placeId: string): Promise<PlaceDetails|null> => {
  try {
    const res = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${Config.GOOGLE_API_KEY}`);

    if (!res.ok) {
      throw new Error(`Response status: ${res.status}`);
    }

    const resJson = await res.json();

    if (resJson) {
      const { result } = resJson;
      return result;
    }

    return null;
  } catch(e) {
    console.log(e);
    throw e;
  }
};
