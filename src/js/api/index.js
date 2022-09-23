import axios from 'axios';
const API_KEY = '30103797-b372b085155e032bf027815af';
const searchParams = new URLSearchParams({
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  per_page: 40,
});

export function getData(path, page) {
  return axios.get(
    `https://pixabay.com/api/?key=${API_KEY}&q=${path}&${searchParams}&page=${page}`
  );
}
