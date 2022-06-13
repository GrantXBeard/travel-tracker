//Imports//
import "./css/styles.css";

import { fetchAll, postNewTrip } from "./apiCalls.js";
import TravelersRepository from "../src/TravelersRepository";
import TripsRepository from "../src/TripsRepository";
import Traveler from "../src/Traveler.js";

//Global variables//
let currentTraveler, destinationsArray, tripID, formDataObj;

//Query Selectors//
const showTripsButton = document.querySelector(".trips-button");
const showFormButton = document.querySelector(".create-button");
const allTripsButton = document.querySelector(".all-trips-button");
const pastTripsButton = document.querySelector(".past-trips-button");
const currentTripsButton = document.querySelector(".current-trips-button");
const futureTripsButton = document.querySelector(".future-trips-button");
const pendingTripsButton = document.querySelector(".pending-trips-button");
const submitFormButton = document.querySelector(".submit");
const tripsPage = document.querySelector(".trips");
const formPage = document.querySelector(".create-trip");
const form = document.querySelector(".form-wrapper");

//Event Listeners//
window.addEventListener("load", (event) => {
  loadData();
});

showTripsButton.addEventListener("click", (event) => {
  showtrips();
});

showFormButton.addEventListener("click", (event) => {
  showForm();
});

allTripsButton.addEventListener("click", (event) => {
  displayTrips(currentTraveler.displayArray);
});

pastTripsButton.addEventListener("click", (event) => {
  displayTrips(currentTraveler.createPastArray());
});

currentTripsButton.addEventListener("click", (event) => {
  displayTrips(currentTraveler.createPresentArray());
});

futureTripsButton.addEventListener("click", (event) => {
  displayTrips(currentTraveler.createFutureArray());
});

pendingTripsButton.addEventListener("click", (event) => {
  displayTrips(currentTraveler.createStatusArray("pending"));
});

submitFormButton.addEventListener("click", (event) => {
  event.preventDefault();
  showMockUp(createFormDataObj());
});

//Functions//
const loadData = () => {
  fetchAll()
    .then((data) => {
      const id = 1;
      const [travelersData, tripsData, destinationsDataObj] = data;
      tripID = tripsData.trips.length;
      destinationsArray = destinationsDataObj.destinations;
      const travelersRepository = new TravelersRepository(
        travelersData.travelers
      );
      const traveler11Data = travelersRepository.getSingleTraveler(id);
      const tripsRepository = new TripsRepository(tripsData.trips);
      const traveler11Trips = tripsRepository.getTrips(id);
      currentTraveler = new Traveler(traveler11Data, traveler11Trips);
      return { currentTraveler, destinationsArray };
    })
    .then(({ currentTraveler, destinationsArray }) => {
      startApplication(currentTraveler, destinationsArray);
    })
    .catch((error) => console.log(`There has been an error! ${error}`));
};

const startApplication = (user, destinationsArray) => {
  addDestinationListToForm(getDestinationList());
  showWelcome(user);
  user.createDisplayArray(destinationsArray);
  displayTrips(user.displayArray);
  console.log(user);
};

const showWelcome = (user) => {
  let welcome = document.querySelector(".welcome");
  welcome.innerText = `Welcome back ${user.returnUserFirstName()}`;
};

const getDestinationList = () => {
  let names = destinationsArray.map((dest) => dest.destination);
  let namesHTML = names.map(
    (name) => `<option value="${name}">${name}</option>`
  );
  return namesHTML;
};

const addDestinationListToForm = (array) => {
  let choiceDropdown = document.querySelector(".destination");
  let newHTML = `<option value="">Select a Destination (required)</option>`;
  array.forEach((element) => (newHTML += element));
  choiceDropdown.innerHTML = newHTML;
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
        <p class="card"><b>${trip.name}</b></p>
        <p class="card">Start date: ${trip.startDate}</p>
        <p class="card">Durration: <b>${trip.duration}</b> days</p>
        <p class="card">Price: $${trip.price}</p>
        <p class="card">Status: ${trip.status}</p>
        <p class="card">Travelers: <b>${trip.amountTravelers}</b></p>
      </article>`;
  });
  savedCardsGrid.innerHTML = newHTML;
};

const createFormDataObj = () => {
  const destinationInput = document.querySelector(".destination");
  const destination = destinationsArray.find(
    (dest) => dest.destination === destinationInput.value
  );
  const startDate = document.querySelector(".calendar-start");
  const duration = document.querySelector(".number-of-days");
  const numbTravelers = document.querySelector(".number-of-travelers");
  const flightCost =
    destination.estimatedFlightCostPerPerson * parseInt(numbTravelers.value);
  const lodgeCost =
    destination.estimatedLodgingCostPerDay * parseInt(duration.value);
  const price = flightCost + lodgeCost;
  const fee = price * 0.1;
  const formDataObj = {
    img: destination.image,
    alt: destination.alt || destination.destination,
    name: destination.destination,
    price: price + fee,
    id: tripID + 1,
    userID: currentTraveler.id,
    destinationID: destination.id,
    travelers: parseInt(numbTravelers.value),
    date: startDate.value,
    duration: parseInt(duration.value),
    status: "pending",
    suggestedActivities: [],
  };
  return formDataObj;
};

const showMockUp = (formObj) => {
  const mockUpDisplay = document.querySelector(".display-submission");
  let newHTML = `
  <article class="mock-up">
    <img class="card-img" src="${formObj.img}" alt="${formObj.alt}" />
    <p class="card"><b>${formObj.name}</b></p>
    <p class="card">Start date: ${formObj.date}</p>
    <p class="card">Durration: <b>${formObj.duration}</b> days</p>
    <p class="card">Travelers: <b>${formObj.travelers}</b></p>
    <p class="card">After agent fees, the total cost of this trip will be $<b>${formObj.price}</b>
  </article>
  <button class="form-choice">Submit Request</button>
  <button class="form-choice">Cancel</button>`;
  mockUpDisplay.innerHTML = newHTML;
  addHidden(form);
};

const addHidden = (variable) => {
  variable.classList.add("hidden");
};

const removeHidden = (variable) => {
  variable.classList.remove("hidden");
};

const showForm = () => {
  removeHidden(formPage);
  addHidden(tripsPage);
};

const showtrips = () => {
  removeHidden(tripsPage);
  addHidden(formPage);
};
