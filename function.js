const cityForm = document.querySelector("#weatherForm");

const getWeatherConditions = async(city) => {

    await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=9fd7a449d055dba26a982a3220f32aa2`)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        
        let div = document.createElement("div");
        div.setAttribute("id", "conditions");
        let city = document.createElement("h2");
        let cityNode = document.createTextNode(data.name);
        city.appendChild(cityNode);

        div.setAttribute("id", "conditions");
        let country = document.createElement("h1");
        let countryNode = document.createTextNode(data.sys.country);
        country.appendChild(countryNode);

        let temp = document.createElement("div");
        let celciusTemp = Math.round(data.main.temp - 273.15);
        let tempNode = document.createTextNode("\t"+ celciusTemp + " °C ");
        temp.appendChild(tempNode);

        let desc = document.createElement("div");
        let descNode = document.createTextNode("| \t   "+data.weather[0].description);
        desc.appendChild(descNode);

        let sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString("en-US", { timeZone: "Asia/Kolkata" }); //to change the sunrise to local india time based on city
        let rise = document.createElement("div");
        let riseLabelNode = document.createTextNode("🌇| \t   Sunset: ");
        rise.appendChild(riseLabelNode);
        let riseTimeNode = document.createTextNode(sunrise);
        rise.appendChild(riseTimeNode);

        let sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString("en-US", { timeZone: "Asia/Kolkata" });//to change the sunset to local india time based on city
        let sunsetLabelNode = document.createTextNode("🌄 | \t   Sunrise:  ");
        let sunsetTimeNode = document.createTextNode(sunset);
        let set = document.createElement("div");
        set.appendChild(sunsetLabelNode);
        set.appendChild(sunsetTimeNode);
        
        div.appendChild(city);
        div.appendChild(country);
        div.appendChild(temp);
        div.appendChild(desc);
        div.appendChild(rise);
        div.appendChild(set);
        document.querySelector("main").appendChild(div);
    }).catch(err => console.log(err))

}

document.addEventListener("DOMContentLoaded", (e) => {
    cityForm.addEventListener("submit", (e) => {
        e.preventDefault();
        if(document.querySelector("#city").value != ""){
            let conditionsDiv = document.querySelector("#conditions");
            if(conditionsDiv){
                document.querySelector("main").removeChild(conditionsDiv);
            }
            getWeatherConditions(document.getElementById("city").value);
        }else{
            console.log("You must provide a city");
        }
    })
})

const mealForm = document.querySelector('#meal-form');
const mealInput = document.querySelector('#meal');
const mealList = document.querySelector('#meal-list');

mealForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const searchQuery = mealInput.value.trim();
  if (searchQuery) {
    const apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        mealList.innerHTML = '';

        if (data.meals) {
          data.meals.forEach(meal => {
            const newMeal = document.createElement('li');
            newMeal.innerHTML = `
              <div class="first-cont"> 
                <h2>${meal.strMeal}</h2>
                <p style="margin-top: 20px; font-size: 16px;">Category: ${meal.strCategory}</p>
                <div class="image-food" style="display: flex;">
                  <img src="${meal.strMealThumb}" alt="${meal.strMeal}"> 
                </div>
                <div class="food-ingrd">
                  <h3>Food Ingredients</h3>
                  <ul style="list-style-type: none;">
                    ${Object.keys(meal)
                      .filter(key => key.startsWith('strIngredient') && meal[key])
                      .map(key => `<li>${meal[key]}</li>`)
                      .join('')}
                  </ul>
                </div>
                <div class="food-recipe">
                  <h3>Recipe</h3>
                  <p>${meal.strInstructions}</p>
                </div>
              </div>
            `;
            mealList.appendChild(newMeal);
          });
        } else {
          mealList.innerHTML = `<li>No meals found for "${searchQuery}".</li>`;
        }
      })
      .catch(error => {
        mealList.innerHTML = `<li>There was an error: ${error}</li>`;
      });
  }
});


