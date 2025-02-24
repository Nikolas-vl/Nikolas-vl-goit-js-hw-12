import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '48845577-5bc33010407b24a578a08aa7f';

export async function findImg(searchValue, page) {
  const params = {
    key: API_KEY,
    q: searchValue,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: page,
    per_page: 40,
  };

  try {
    const res = await axios.get(BASE_URL, { params });
    return {
      hits: res.data.hits,
      totalHits: res.data.totalHits,
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return { hits: [], totalHits: 0 };
  }
}
