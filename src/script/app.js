console.log("Welcome 👋🏻!");

const localKey = "travel-planner";
// Global variables
let countryHolder, amountHolder = "";
let allItems = [];
const hasItem = key => {
  var countries = getAllItems();
  return countries.includes(key)
};
const addItem = key => {
  let countries = getAllItems();
  countries.push(key);
  localStorage.setItem(localKey, JSON.stringify(countries));

};

const getAllItems = () => {
  return JSON.parse(localStorage.getItem(localKey)) || [];
}
const removeItem = key => {
  const index = getAllItems().indexOf(key); // Waar staat het land wat weg mag?
  let savedCountries = getAllItems(); // Verwijder dat item in de array?
  savedCountries.splice(index, 1);
  console.log(savedCountries);
  localStorage.setItem(localKey, JSON.stringify(savedCountries));


}; //
const countItems = key => {
  return getAllItems().length;
}; //returns int 0 ... 250

const updateCounter = () => {
  amountHolder.innerHTML = countItems();
}

const addListenersToCountries = function (classSelector) {
  const countries = document.querySelectorAll(classSelector);
  for (const country of countries) {
    country.addEventListener("click", function () {
      const countryKey = this.getAttribute('for');
      if (hasItem(countryKey)) {
        removeItem(countryKey);
      } else {
        addItem(countryKey);
      }
      updateCounter();
      console.log("You clicked me ", this);
    });
  }
};


const showCountries = data => {
  // #1. Loop the data
  let countries = "";

  for (const c of data) {
    // #2. Build an HTML-string for each country
    countries += `
            <article>
            <input type="checkbox" class="o-hide c-country-input" name="" id="${c.cioc}-${c.alpha2Code}" ${(hasItem(c.cioc + '-'+c.alpha2Code)) ? 'checked="checked"' : ''}/>

            <label for="${c.cioc}-${c.alpha2Code}" class="c-country js-country">
                <div class="c-country-header">
                    <h2 class="c-country-header__name">${c.name}</h2>
                    <img class="c-country-header__flag" src="${c.flag}" alt="The flag of Belgium." title="The flag of ${c.name}.">
                </div>
                <p class="c-country__native-name">${c.nativeName}</p>
            </label>
            </article>
`;
  }

  countryHolder.innerHTML = countries;

  addListenersToCountries(".js-country");
  // #3. Adjust CSS -> screen.css:
  //     - Click on country :checked
  //     - Flag correct height
};

const fetchCountries = region => {
  fetch(`https://restcountries.eu/rest/v2/region/${region}`)
    .then(response => response.json())
    .then(data => showCountries(data))
    .catch(err => console.error(`An error occured 😭, ${err}`));
};

const enableListeners = () => {
  // #1. Get some buttons
  const regionButtons = document.querySelectorAll(".js-region-select");

  // #2. Listen to the clicks
  for (const button of regionButtons) {
    button.addEventListener("click", function () {
      // #3. Look up the data property
      const region = this.getAttribute("data-region");

      console.log(region);

      // #4. Get data from API
      fetchCountries(region);
    });
  }

  countryHolder = document.querySelector(".js-country-holder");
  amountHolder = document.querySelector('.js-amount');

  // Always start with Europe
  fetchCountries("europe");
};

const init = () => {
  console.log("DOM is ingeladen 🚀");

  enableListeners();
};

document.addEventListener("DOMContentLoaded", init);