import axios from 'axios';

const BASE_URL = 'https://api.thecatapi.com/v1';
const options = {};

axios.defaults.headers.common['x-api-key'] =
  'live_J1FUkW1Y1ZYbDpReWelTgSV0fD9NPmuthwA9AF3ZJlAfWoQqvmrmmR3xU08lTjYH';

export function fetchBreeds() {
  const END_POINT = '/breeds';
  const url = `${BASE_URL}${END_POINT}`;

  return fetchAnything(url, options);
}

export function fetchCatByBreed(breedId) {
  const END_POINT = '/images/search';
  const PARAMS = `?breed_ids=${breedId}`;
  const url = `${BASE_URL}${END_POINT}${PARAMS}`;

  return fetchAnything(url, options);
}

function fetchAnything(url, option) {
  return axios.get(url, option).then(response => response.data);
}

///if use fetch

// const options = {
//   headers: {
//     'x-api-key':
//       'live_J1FUkW1Y1ZYbDpReWelTgSV0fD9NPmuthwA9AF3ZJlAfWoQqvmrmmR3xU08lTjYH',
//   },
// };

// function fetchAnything(url, option) {
//   return fetch(url, option).then(response => {
//     if (!response.ok) {
//       throw new Error(response.status);
//     }
//     return response.json();
//   });
// }
