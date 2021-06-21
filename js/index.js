function createPagination(countries, pages = [[]], page = 0){
   if(pages[page].length === 8) pages[++page] = [];
   pages[page].push(countries.shift());
   return countries.length === 0 ? pages : createPagination(countries, pages, page);
}

function debounce(fn, wait = 500, time){
   return (...args) => clearTimeout(time, time = setTimeout(() => fn(...args), wait));
}

function showOrHideInfoMsg(message) {
   const infoMsg = document.querySelector(".info");
   if (!message) {
      return (infoMsg.style.display = "none");
   }
   document.querySelectorAll(".card").forEach((card) => card.remove());
   const pagination = document.getElementById("pagination");
   pagination && pagination.remove();
   infoMsg.innerText = message;
   infoMsg.style.display = "block";
}

function renderCountryDetails(country){
   const countryDetailsTemplate = document.getElementById('country-detail-template').innerHTML;
   const { 
      flag,
      name, 
      nativeName,
      subregion,
      topLevelDomain,
      currencies,
      languages,
      population,
      region,
      capital,
      borders
   } = country;
   const rendered = Mustache.render(countryDetailsTemplate, {
      flag, name, population, region, capital, subregion, nativeName,
      domain: topLevelDomain.join(', '),
      currencies: () => {
         let strCurrencies = '';
         currencies.forEach((curr, index) => strCurrencies += index > 0 ? `, ${curr.name}` : curr.name);
         return strCurrencies;
      },
      languages: () => {
         let strLanguages = '';
         languages.forEach((lang, index) => strLanguages += index > 0 ? `, ${lang.name}` : lang.name);
         return strLanguages;
      }
   });
   document.querySelector('main').innerHTML += rendered; 
   borders.forEach((border) => document.querySelector('.border-countries').innerHTML += `<a>${border}</a>`);
}

function renderCountries(countries){
   document.querySelectorAll('.card').forEach(card => card.remove());
   countries.forEach(country => {
      const {flag, name, population, region, capital} = country;
      const cardsTemplate = document.getElementById('card-template').innerHTML;
      const rendered = Mustache.render(cardsTemplate, { flag, name, population, region, capital });
      document.querySelector('main').innerHTML += rendered;
   });
}

function renderPagination(qtdPages, currentPage){
   const pagination = document.getElementById('pagination');
   pagination && pagination.remove();
   if(qtdPages <= 1) return;
   const paginationTemplate = document.getElementById('pagination-template').innerHTML;
   const rendered = Mustache.render(paginationTemplate, {
      currentPage: currentPage + 1,
      lastPage: qtdPages
   });
   document.querySelector('main').innerHTML += rendered;
}

function onCountryClick(country){
   const pagination = document.getElementById('pagination');
   pagination && pagination.remove();
   document.querySelectorAll('.card').forEach(card => card.remove());
   document.getElementById('search-section').style.display = 'none';
   renderCountryDetails(country);
}

function onClickBack(pages, currentPage){
   const searchSectionDisplay = window.innerWidth > 765 ? "flex" : "block";
   document.getElementById('search-section').style.display = searchSectionDisplay;
   document.querySelector('.country-detail').remove();
   renderCountries(pages[currentPage]);
   renderPagination(pages.length, currentPage);
   paginationClickEvent(pages, currentPage);
}

function countryClickEvent(pages, currentPage) {
  document.querySelectorAll(".card").forEach((card, index) => {
    card.addEventListener("click", () => {
      onCountryClick(pages[currentPage][index]);
      document.getElementById("back").addEventListener("click", () => {
        onClickBack(pages, currentPage);
        countryClickEvent(pages, currentPage);
      });
    });
  });
}

function onPaginationClick(to, pages, currentPage){
   currentPage = ({
      previous: () => currentPage - 1 < 0 ? currentPage : currentPage - 1,
      first: () => 0,
      last: () => pages.length - 1,
      next: () => currentPage + 1 >= pages.length ? pages.length - 1 : currentPage + 1
   })[to]();
   renderCountries(pages[currentPage]);
   renderPagination(pages.length, currentPage);
   countryClickEvent(pages, currentPage);
   return currentPage;
}

function paginationClickEvent(pages, currentPage) {
  document.querySelectorAll("#pagination a").forEach((a) => {
    a.addEventListener("click", () => {
      a.dataset.to !== 'current' && paginationClickEvent(pages, onPaginationClick(a.dataset.to, pages, currentPage));
    });
  });
}

function onFilterCountry(countries){
   const countryName = document.getElementById('country-input').value;
   const regionName = document.getElementById('region-select').value;
   let filteredCountries = countries.slice();
   if(!(countryName === '' && regionName === '')){
      const regex = new RegExp(countryName, "gi"); 
      const filterBy = countryName === "" && regionName !== "" ? 'region' : countryName !== '' && regionName === '' ? 'countryName' : 'both';
      switch(filterBy){
         case 'region':
            filteredCountries = countries.filter(country => (country.region === regionName));
            break;
         case 'countryName':
            filteredCountries = countries.filter(country => (regex.test(country.name) || regex.test(country.nativeName)));
            break;
         case 'both':
            filteredCountries = countries.filter(country => {
               return ((regex.test(country.name) || regex.test(country.nativeName)) && regionName === country.region)
            })
            break;
      }
   }
   if(filteredCountries.length < 1) return showOrHideInfoMsg('We cant find this country!');
   showOrHideInfoMsg();
   const pages = createPagination(filteredCountries);
   renderCountries(pages[0]);
   renderPagination(pages.length, 0);
   countryClickEvent(pages, 0);
   paginationClickEvent(pages, 0);
}

function filterCountriesEvent(countries){
   document.getElementById('country-input').addEventListener('keyup', debounce(onFilterCountry.bind(null, countries), 500));
   document.getElementById('region-select').addEventListener('change', debounce(onFilterCountry.bind(null, countries), 500));
}

(async () => {
   try{
      const response = await fetch("https://restcountries.eu/rest/v2/all");
      const countries = await response.json();
      console.log(countries);
      const pages = createPagination(countries.slice());
      renderCountries(pages[0]);
      renderPagination(pages.length, 0);
      countryClickEvent(pages, 0);
      paginationClickEvent(pages, 0);
      filterCountriesEvent(countries);
   }catch(err){
      showOrHideInfoMsg("An error has occurred, please try again");
   }
})();
