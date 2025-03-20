import axios from "axios";

const API_KEY = import.meta.env.VITE_GOOGLE_PLACE_API_KEY;
const BASE_URL = 'https://places.googleapis.com/v1/places:searchText'

const config = {
    headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': API_KEY,
        'X-Goog-FieldMask': 'places.photos,places.displayName,places.id'
    }
};

export const GetPlaceDetails = async (data) => {
    try {
        const requestBody = {
            textQuery: data.textQuery,
            languageCode: "en",
            maxResultCount: 1,
            locationBias: {
                circle: {
                    center: {
                        latitude: 0,
                        longitude: 0
                    },
                    radius: 20000.0
                }
            }
        };

        const response = await axios.post(BASE_URL, requestBody, config);
        return response;
    } catch (error) {
        console.error('Places API Error:', error.response?.data || error);
        throw error;
    }
};

export const getPhotoUrl = (photoName) => {
    if (!photoName) return '/AI-TRIP-PLANNER/placeholder.jpg';
    const url = `https://places.googleapis.com/v1/${photoName}/media`;
    return `${url}?key=${API_KEY}&maxHeightPx=800&maxWidthPx=800`;
};

export const getPhotoRefUrl = (name) => 
    `https://places.googleapis.com/v1/${name}/media?maxHeightPx=1600&maxWidthPx=1600&key=${API_KEY}`;


export const fetchImageFromCustomSearch = async (query) => {
    try {
      const CUSTOM_API_KEY = import.meta.env.VITE_GOOGLE_CUSTOM_SEARCH_API_KEY;
      const SEARCH_ENGINE_ID = import.meta.env.VITE_GOOGLE_SEARCH_ENGINE_ID;
  
      if (!query || !CUSTOM_API_KEY || !SEARCH_ENGINE_ID) {
        return "/placeholder.jpg";
      }
  
      const refinedQuery = `${query} famous landmark scenic view photography 4k`;
  
      const response = await axios.get("https://www.googleapis.com/customsearch/v1", {
        params: {
          key: CUSTOM_API_KEY,
          cx: SEARCH_ENGINE_ID,
          q: refinedQuery,
          searchType: "image",
          imgType: "photo",   
          imgSize: "xlarge",
          fileType: "jpg", 
          num: 5,
        },
      });
  
      const items = response.data?.items || [];
      return items.length ? items[0].link : "/AI-TRIP-PLANNER/placeholder.jpg";
    } catch (error) {
      console.error("Image fetch error:", error);
      return "/AI-TRIP-PLANNER/placeholder.jpg";
    }
  };