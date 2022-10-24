"use strict";

// prettier-ignore
const form = document.querySelector(".form");
const containerWorkouts = document.querySelector(".workouts");
const inputType = document.querySelector(".form__input--type");
const inputDistance = document.querySelector(".form__input--distance");
const inputDuration = document.querySelector(".form__input--duration");
const inputCadence = document.querySelector(".form__input--cadence");
const inputElevation = document.querySelector(".form__input--elevation");

let map, mapEvent;

class App {
  constructor() {}

  _getPosition() {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(
        
        () => {
          alert("Couldn't get current position");
        }
      );
  }

  _loadMap(position) {

    
        console.log(position);

        //destructuring, this creates longitude and latitude variable based on the coords object, basically it takes the values as they are
        const { longitude } = position.coords;
        const { latitude } = position.coords;

        console.log(longitude, latitude);

        const coords = [latitude, longitude];

        map = L.map("map").setView(coords, 13);

        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="https://www.openstreetmap.fr/hot/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);

        //handle Map clicks
        map.on("click", (mapE) => {
          mapEvent = mapE;
          form.classList.remove("hidden");
          inputDistance.focus();
        });
    

  }

  _showForm() {}

  _toggleElevationField() {}

  _newWorkout() {}
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  //Clesar input fields
  inputCadence.value =
    inputDistance.value =
    inputDuration.value =
    inputElevation.value =
      "";

  //display marker

  const { lat, lng } = mapEvent.latlng;

  L.marker([lat, lng])
    .addTo(map)
    .bindPopup(
      L.popup({
        maxWidth: 250,
        minWidth: 100,
        autoClose: false,
        closeOnClick: false,
        className: "running-popup",
      })
    )
    .setPopupContent("workout")
    .openPopup();
});

inputType.addEventListener("change", () => {
  inputElevation.closest(".form__row").classList.toggle("form__row--hidden");
  inputCadence.closest(".form__row").classList.toggle("form__row--hidden");
});
