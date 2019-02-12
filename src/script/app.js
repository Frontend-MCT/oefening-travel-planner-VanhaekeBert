   var region = "africa";
   var countryList = [];
   var countrywrapper = document.getElementById("js-country-holder")


   fetch(`https://restcountries.eu/rest/v2/region/${region}`)
       .then(function (response) {
           return response.json();
       })
       .then(function (myJson) {
           console.log(myJson);
           myJson.forEach(element => {
               console.log(element.name);
               CountryMaker(element);
           });
       });




   function CountryMaker(countryObj) {
       countrywrapper.appendChild()
   }