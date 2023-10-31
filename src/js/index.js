import { fetchBreeds, fetchCatByBreed } from './cat-api';
import {
  setActiveClass,
  removeActiveClass,
  setInactiveClass,
  removeInactiveClass,
} from './class-functions';
import '../css/styles.css';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css';

const refs = {
  select: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
  catInfo: document.querySelector('.cat-info'),
};

Notiflix.Loading.init({
  svgColor: 'white',
});

init();

function init() {
  // setActiveClass(refs.loader);
  Notiflix.Loading.standard('Loading data, please wait...');
  fetchBreeds()
    .then(response => {
      makeSelectMarkup(response);
      setActiveClass(refs.select);
      new SlimSelect({
        select: '.breed-select',
      });
    })
    .catch(error => {
      setActiveClass(refs.error);
    })
    .finally(() => {
      Notiflix.Loading.remove();
      // removeActiveClass(refs.loader);
    });

  refs.select.addEventListener('change', onSelectChange);
}

function makeSelectMarkup(arr) {
  const markup = arr
    .map(({ id, name }) => `<option value="${id}">${name}</option>`)
    .join('');
  refs.select.insertAdjacentHTML('beforeend', markup);
}

function onSelectChange(event) {
  const breedId = event.currentTarget.value;

  // removeActiveClass(refs.error);
  setInactiveClass(refs.catInfo);
  setActiveClass(refs.loader);

  fetchCatByBreed(breedId)
    .then(response => {
      makeCatInfoMarkup(response);
      removeInactiveClass(refs.catInfo);
    })
    .catch(() => {
      Notiflix.Report.failure(
        'Opps!',
        'Something went wrong! Try again or select another cat!',
        'Okay'
      );
      // setActiveClass(refs.error);
    })
    .finally(() => {
      removeActiveClass(refs.loader);
    });
}

function makeCatInfoMarkup(response) {
  const cat = response[0];
  const markup = `
    <div class="cat-img-container">
        <img src="${cat.url}" alt="${cat.breeds[0].name}" />
    </div>
    <div class="cat-info-wrapper">
        <h1 class="cat-title">${cat.breeds[0].name}</h1>
        <p class="cat-desciption">${cat.breeds[0].description}</p>
        <h3>Temperament:</h3>
        <p class="cat-temperament">${cat.breeds[0].temperament}</p>
    </div>`;
  refs.catInfo.innerHTML = markup;
}
