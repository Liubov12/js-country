import './css/styles.css';
import refs from './js/refs';
import fetchCountries from './js/fetchCountries';
import Lodash from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;


refs.input.addEventListener('input', Lodash(onSearch, DEBOUNCE_DELAY));

function onSearch (e) {
 
    const countries = e.target.value.trim();
  
    if(countries ==='') {
      refs.countryInfo.innerHTML ='';
      refs.countryList.innerHTML ='';
      return
    }

    fetchCountries(countries)
    .then(renderCountriesInfo)
    .catch(error => Notiflix.Notify.failure(`Oops, there is no country with that name.`));
}

    function renderCountriesInfo(countries) {
      if (countries.length > 10) {
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
        refs.countryList.innerHTML = '';
      }
     

      const markup = countries
      .map(({ name, capital, population, flags, languages }) => {
       return` <li><img src="${flags.svg}" alt="${name.official}" width="50px">
                <h1 class="country_title">${name}</h1></li>
                <p><b>Capital:</b>  ${capital}</p>
                <p><b>Population:</b> ${population}</p>
                <p><b>Languages:</b> ${Object.values(languages.map(language => language.name))}</p>`;
      })

      .join('');
      refs.countryInfo.innerHTML = markup;

      if (countries.length > 1) {
        refs.countryInfo.innerHTML = '';
      }

     renderCountriesList(countries);

    }

    function renderCountriesList(countries) {
    if(countries.length >= 2 && countries.length <= 10){
      const markup = countries
      .map(({ name, flags }) => {
       return `
       <li class="mini_flag">
           <img class="preview_pic" src="${flags.svg}" alt="flag${name.official}" width="30px">
          <h3 class="preview_title" data-name="${name}">${name}</h3>
       </li>`
      }).join('');
      refs.countryList.innerHTML = markup;
      
    }
    
  
    if(countries.length === 1) {
      refs.countryList.innerHTML = ''
}
}
