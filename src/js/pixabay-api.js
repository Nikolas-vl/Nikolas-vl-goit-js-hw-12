import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '48845577-5bc33010407b24a578a08aa7f';

export function findImg(searchValue) {
  const params = {
    key: API_KEY,
    q: searchValue,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  };

  return axios
    .get(BASE_URL, { params })
    .then(res => res.data.hits)
    .catch(error => {
      console.error('Error fetching data:', error);
      return [];
    });
}
