import './css/styles.css';
import fetchCountries from '../src/js/fetchCountries';
// import countryTpl from './templates/countryInfo.hbs';
// import previewCountryTpl from './templates/country-list.hbs';
import Notiflix from 'notiflix';

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
      return
    }

    fetchCountries(countryName)
    .then(renderCountriesInfo)
    .catch(error => Notiflix.Notify.failure('Oops, there is no country with that name'));
}

    function renderCountriesInfo(countryName) {
      if (countryName.length > 10) {
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
        refs.countryList.innerHTML = '';
      }

      const markup = countryName
      .map(({name, capital, population, flags, languages}) => {
       return`<h2 class="country_title"> ${name} </h2>
        <div class="country-info">
            <ul class="country">
                <li> <strong style="bold"> Capital: </strong> ${capital} </li>
                <li> <strong style="bold"> Population: </strong> ${population} </li>
                <li> <strong style="bold"> Languages: </strong ${Object.values(languages)}</li>
            </ul>
            <img class="main_flag" src="${flags.svg}" alt="${name}flag" width="380">
        </div>`
      })
      .join('');
      refs.countryInfo.innerHTML = markup;

      if (countries.length > 1) {
        refs.countryInfo.innerHTML = '';
      }

      renderCountriesInfo(countryName);

    }

    function renderCountriesList(countryName) {
    if(countryName.length >= 2 && countryName.length <= 10){
      const markup = countryName
      .map(({name, flags}) => {
       return `<ul class="country-list">
    
       <li class="mini_flag">
           <img class="preview_pic" src="${flags.svg}}" alt="flag${name.official}" width="100">
          <h3 class="preview_title" data-name="${name}">${name.official}</h3>
       </li>
   </ul>`
      }).join('');
      refs.countryList.innerHTML = markup;
      
    }
    
  
    if(countryName.length === 1) {
      refs.countryList.innerHTML = ''
}
}
