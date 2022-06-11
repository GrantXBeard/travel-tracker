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

//Event Listeners//
window.addEventListener("load", (event) => {
  loadData();
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
  createTripObjects(user, destinationsData);
  displayTrips();
  console.log(user);
};

const showWelcome = (user) => {
  let welcome = document.querySelector(".welcome");
  welcome.innerText = `Welcome back ${user.returnUserFirstName()}`;
};

const createTripObjects = (user, destinationsData) => {
  let displayArray = user.trips.reduce((acc, curr) => {
    destinationsData.forEach((dest) => {
      if (dest.id === curr.destinationID) {
        const flightCost = dest.estimatedFlightCostPerPerson * curr.duration;
        const lodgeCost = dest.estimatedLodgingCostPerDay * curr.duration;
        const obj = {
          img: dest.image,
          alt: dest.alt,
          name: dest.destination,
          dates: curr.date,
          price: (flightCost + lodgeCost) * curr.travelers,
          status: curr.status,
          amountTravelers: curr.travelers,
        };
        acc.push(obj);
      }
    });
    return acc;
  }, []);
  user.displayArray = displayArray;
};

const displayTrips = () => {
  let savedCardsGrid = document.querySelector(".saved-cards-grid");
  currentTraveler.displayArray.forEach((trip) => {
    savedCardsGrid.innerHTML += `
      <article class="trip-card">
        <img
          class="card-img"
          src="${trip.img}"
          alt="${trip.alt}"
        />
        <p class="card">${trip.name}</p>
        <p class="card">Durration: <b>9</b> days</p>
        <p class="card">${trip.dates}</p>
        <p class="card">${trip.price}</p>
        <p class="card">${trip.status}</p>
        <p class="card">Travelers: <b>${trip.amountTravelers}</b></p>
      </article>`;
  });
};
