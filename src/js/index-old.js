import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css';
import '../css/styles.css';

const refs = {
  select: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
  catInfo: document.querySelector('.cat-info'),
};

const BASE_URL = 'https://api.thecatapi.com/v1';
const options = {
  headers: {
    'x-api-key':
      'live_J1FUkW1Y1ZYbDpReWelTgSV0fD9NPmuthwA9AF3ZJlAfWoQqvmrmmR3xU08lTjYH',
  },
};
const ACTIVE_CLASS = 'js-active';
const INACTIVE_CLASS = 'js-inactive';

fetchBreeds();
refs.select.addEventListener('change', onSelectChange);

function fetchBreeds() {
  const END_POINT = '/breeds';
  const url = `${BASE_URL}${END_POINT}`;

  setActiveClass(refs.loader);
  // Notiflix.Loading.standard('Loading data, please wait...');
  fetchSomething(url, options)
    .then(response => {
      makeSelectMarkup(response);
      setActiveClass(refs.select);
      new SlimSelect({
        select: '.breed-select',
      });
    })
    .catch(() => {
      setActiveClass(refs.error);
      Notiflix.Report.failure(
        'Notiflix Failure',
        '"Failure is simply the opportunity to begin again, this time more intelligently." <br/><br/>- Henry Ford',
        'Okay'
      );
    })
    .finally(() => {
      Notiflix.Loading.remove();
      removeActiveClass(refs.loader);
    });
}

function fetchCatByBreed(breedId) {
  const END_POINT = '/images/search';
  const PARAMS = `?breed_ids=${breedId}`;
  const url = `${BASE_URL}${END_POINT}${PARAMS}`;

  removeActiveClass(refs.error);
  setInactiveClass(refs.catInfo);
  setActiveClass(refs.loader);

  fetchSomething(url, options)
    .then(response => {
      makeCatInfoMarkup(response);
      removeInactiveClass(refs.catInfo);
    })
    .catch(() => {
      setActiveClass(refs.error);
    })
    .finally(() => {
      removeActiveClass(refs.loader);
    });
}

function fetchSomething(url, option) {
  return fetch(url, option).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

function makeSelectMarkup(arr) {
  const markup = arr
    .map(({ id, name }) => `<option value="${id}">${name}</option>`)
    .join('');
  refs.select.insertAdjacentHTML('beforeend', markup);
}

function onSelectChange(event) {
  const selectedValue = event.currentTarget.value;

  fetchCatByBreed(selectedValue);
}

function makeCatInfoMarkup(response) {
  const cat = response[0];
  console.log(response[0]);
  const markup = `
    <div class="cat-img-container">
        <img src="${cat.url}" alt="${cat.breeds[0].name}" />
    </div>
    <div class="cat-info-wrapper">
        <h2 class="cat-title">${cat.breeds[0].name}</h2>
        <p class="cat-desciption">${cat.breeds[0].description}</p>
        <p class="cat-temperament">${cat.breeds[0].temperament}</p>
    </div>`;
  refs.catInfo.innerHTML = markup;
}

function setActiveClass(element) {
  element.classList.add(ACTIVE_CLASS);
}

function removeActiveClass(element) {
  element.classList.remove(ACTIVE_CLASS);
}

function setInactiveClass(element) {
  element.classList.add(INACTIVE_CLASS);
}

function removeInactiveClass(element) {
  element.classList.remove(INACTIVE_CLASS);
}