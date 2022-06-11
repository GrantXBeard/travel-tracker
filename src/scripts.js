//Imports//
import "./css/styles.css";

import { fetchAll } from "./apiCalls.js";
import { travelers } from "../src/sampleData/travelers";
import { trips } from "../src/sampleData/trips";
import { destinations } from "../src/sampleData/destinations";
import TravelersRepository from "../src/TravelersRepository";
import TripsRepository from "../src/TripsRepository";
import Traveler from "../src/Traveler.js";

//Global variables//
let currentTraveler, destinationsArray;

//Query Selectors//
const allTripsButton = document.querySelector(".all-trips-button");
const futureTripsButton = document.querySelector(".future-trips-button");
const pendingTripsButton = document.querySelector(".pending-trips-button");

//Event Listeners//
window.addEventListener("load", (event) => {
  loadData();
});

allTripsButton.addEventListener("click", (event) => {
  displayTrips(currentTraveler.displayArray);
});

futureTripsButton.addEventListener("click", (event) => {
  displayTrips(currentTraveler.createStatusArray("approved"));
});

pendingTripsButton.addEventListener("click", (event) => {
  displayTrips(currentTraveler.createStatusArray("pending"));
});

//Functions//
const getRandomIndex = (array) => {
  return Math.floor(Math.random() * array.length);
};

const loadData = () => {
  fetchAll()
    .then((data) => {
      const id = 30;
      const [travelersData, tripsData, destinationsDataObj] = data;
      const destinationsData = destinationsDataObj.destinations;
      const travelersRepository = new TravelersRepository(
        travelersData.travelers
      );
      const traveler11Data = travelersRepository.getSingleTraveler(id);
      const tripsRepository = new TripsRepository(tripsData.trips);
      const traveler11Trips = tripsRepository.getTrips(id);
      currentTraveler = new Traveler(traveler11Data, traveler11Trips);
      // console.log(destinationsData);
      return { currentTraveler, destinationsData };
    })
    .then(({ currentTraveler, destinationsData }) => {
      startApplication(currentTraveler, destinationsData);
    })
    .catch((error) => console.log(`There has been an error! ${error}`));
};

const startApplication = (user, destinationsData) => {
  showWelcome(user);
  user.createDisplayArray(destinationsData);
  displayTrips(user.displayArray);
  console.log(user);
};

const showWelcome = (user) => {
  let welcome = document.querySelector(".welcome");
  welcome.innerText = `Welcome back ${user.returnUserFirstName()}`;
};

const displayTrips = (array) => {
  let savedCardsGrid = document.querySelector(".saved-cards-grid");
  let newHTML = "";
  array.forEach((trip) => {
    newHTML += `
      <article class="trip-card">
        <img
          class="card-img"
          src="${trip.img}"
          alt="${trip.alt}"
        />
        <p class="card">${trip.name}</p>
        <p class="card">${trip.dates}</p>
        <p class="card">Durration: <b>${trip.duration}</b> days</p>
        <p class="card">Price: $${trip.price}</p>
        <p class="card">Status: ${trip.status}</p>
        <p class="card">Travelers: <b>${trip.amountTravelers}</b></p>
      </article>`;
  });
  savedCardsGrid.innerHTML = newHTML;
};
