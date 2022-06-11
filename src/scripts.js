//Imports//
import "./css/styles.css";
import { travelers } from "../src/sampleData/travelers";
import { trips } from "../src/sampleData/trips";
import { destinations } from "../src/sampleData/destinations";
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
  startApplication(currentTraveler);
};

const startApplication = (user) => {
  showWelcome(user);
  createTripObjects(user, destinations);
};

const showWelcome = (user) => {
  let welcome = document.querySelector(".welcome");
  welcome.innerText = `Welcome back ${user.returnUserFirstName()}`;
};

const createTripObjects = (user, destinationsArray) => {
  let displayArray = user.trips.reduce((acc, curr) => {
    destinationsArray.forEach((dest) => {
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
  console.log(displayArray);
  return displayArray;
};
