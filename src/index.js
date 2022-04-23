import './css/styles.css';
import fetchCountries from './fetchCountries';
import Notiflix from 'notiflix';
import Lodash from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;
const refs = {
 CountryList : document.querySelector('.country-list'),
 CountryInfo : document.querySelector('.country-info'),
 searchBox : document.querySelector('#search-box')
}

refs.searchBox.addEventListener('input', Lodash(onSearch, DEBOUNCE_DELAY));
function onSearch(e) {
    e.preventDefault();
    const searchCountries = e.target.value.trim();
    if (searchCountries === '') {
        refs.countryInfo.innerHTML = '';
        refs.countryList.innerHTML = '';
        return;
      }
   fetchCountries(searchCountries).then(countriesRenderInfo)
   .catch(error => Notiflix.Notify.failure('Oops, there is no country with that name'))
}

function countriesRenderInfo(searchCountries) {
    if (searchCountries.length > 10) {
      Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
      refs.countryList.innerHTML = '';
    }


const markup = searchCountries
    .map(({ name, capital, population, flags, languages }) => {
      return `<img src="${flags.svg}" alt="${name.official}" width="30px">
          <h1 class="official-name">${name.official}</h1>
          <p><b>Capital:</b> ${capital}</p>
          <p><b>Population:</b> ${population}</p>
          <p><b>Langueges:</b> ${Object.values(languages)}</p>`;
    })
    .join('');


  refs.CountryInfo.innerHTML = markup;

  if (searchCountries.length > 1) {
    refs.CountryInfo.innerHTML = '';
  }

  countriesRenderInfo(searchCountries);
}

function countriesRenderInfo(searchCountries) {
    if (searchCountries.length >= 2 && searchCountries.length <= 10) {
      const markup = searchCountries
        .map(({ name, flags }) => {
          return `<li>
          <img src="${flags.svg}" alt="${name.official}" width="30px">
          <p class="official-name"><b>${name.official}</b>
        </li>`;
        })
        .join('');
      refs.countryList.innerHTML = markup;
    }
  
    if (searchCountries.length === 1) {
      refs.countryList.innerHTML = '';
    }
  }
 
  