//Imports//
import "./css/styles.css";
import { travelers } from "../src/sampleData/travelers";
import { trips } from "../src/sampleData/trips";
import TravelersRepository from "../src/TravelersRepository";
import TripsRepository from "../src/TripsRepository";
import Traveler from "../src/Traveler.js";

//Global variables//

//Event Listeners//
window.addEventListener("load", (event) => {
  loadData();
});

//Functions//
const getRandomIndex = (array) => {
  return Math.floor(Math.random() * array.length);
};

const loadData = () => {
  let travelersRepository = new TravelersRepository(travelers);
  let randomIndex = getRandomIndex(travelersRepository.travelers);
  let randomTavelerData = travelersRepository.getSingleTraveler(randomIndex);
  let tripsRepository = new TripsRepository(trips);
  let randomTavelerTrips = tripsRepository.getTrips(randomIndex);
  let currentTraveler = new Traveler(randomTavelerData, randomTavelerTrips);
  console.log(currentTraveler);
};
