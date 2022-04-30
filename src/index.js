import './css/styles.css';

// import countryTpl from './templates/countryInfo.hbs';
// import previewCountryTpl from './templates/country-list.hbs';
// import Notiflix from 'notiflix';

import Lodash from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;


const refs = {
  countryList : document.querySelector('.country-list'),
  countryInfo : document.querySelector('.country-info'),
  input : document.querySelector('#search-box')
 }


refs.input.addEventListener('input', Lodash(onSearch, DEBOUNCE_DELAY));

function onSearch (e) {
 
    const countryName = e.target.value.trim();
  
    if(countryName ==='' && countryName ==='.') {
      refs.countryInfo.innerHTML ='';
      refs.countryList.innerHTML ='';
    }
    return
}

const BASE_URL = 'https://restcountries.com/rest/v2';

 const fetchCountries = countryName => {
        return fetch(`${BASE_URL}/name/${countryName}`)
    .then(response => {
        if(!response.ok) {
            throw new Error(response);
        }
        return response.json();
    })
    .then(data => console.log(data))

    }
  
