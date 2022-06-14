//Imports//
import "./css/styles.css";

import { fetchAll, postNewTrip } from "./apiCalls.js";
import TravelersRepository from "../src/TravelersRepository";
import TripsRepository from "../src/TripsRepository";
import Traveler from "../src/Traveler.js";

//Global variables//
let currentTraveler, tripsRepository, destinationsArray, formDataObj;

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
const formWrapper = document.querySelector(".form-wrapper");
const mockUpDisplay = document.querySelector(".display-submission");

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
  displayTrips(currentTraveler.createTimeArray("past"));
});

currentTripsButton.addEventListener("click", (event) => {
  displayTrips(currentTraveler.createTimeArray("present"));
});

futureTripsButton.addEventListener("click", (event) => {
  displayTrips(currentTraveler.createTimeArray("future"));
});

pendingTripsButton.addEventListener("click", (event) => {
  displayTrips(currentTraveler.createStatusArray("pending"));
});

submitFormButton.addEventListener("click", (event) => {
  event.preventDefault();
  showMockUp(createFormDataObj());
});

formPage.addEventListener("click", (event) => {
  checkClick(event);
});

//Functions//
const loadData = () => {
  fetchAll()
    .then((data) => {
      const id = 8;
      const [travelersData, tripsData, destinationsDataObj] = data;
      destinationsArray = destinationsDataObj.destinations;
      const travelersRepository = new TravelersRepository(
        travelersData.travelers
      );
      const currentTravelerData = travelersRepository.getSingleTraveler(id);
      tripsRepository = new TripsRepository(tripsData.trips);
      const currentTravelerTrips = tripsRepository.getTrips(id);
      currentTraveler = new Traveler(currentTravelerData, currentTravelerTrips);
      return { currentTraveler, destinationsArray };
    })
    .then(({ currentTraveler, destinationsArray }) => {
      startApplication(currentTraveler, destinationsArray);
    })
    .catch((error) => console.log(`There has been an error! ${error}`));
};

export const reloadData = () => {
  console.log("hi");
  fetchAll().then((data) => {
    const [travelersData, tripsData, destinationsDataObj] = data;
    const travelersRepository = new TravelersRepository(
      travelersData.travelers
    );
    const currentTravelerData = travelersRepository.getSingleTraveler(
      currentTraveler.id
    );
    tripsRepository = new TripsRepository(tripsData.trips);
    const currentTravelerTrips = tripsRepository.getTrips(currentTraveler.id);
    currentTraveler = new Traveler(currentTravelerData, currentTravelerTrips);
    startApplication(currentTraveler, destinationsArray);
    showtrips();
  });
};

const startApplication = (user, destinationsArray) => {
  addDestinationListToForm(getDestinationList());
  user.createDisplayArray(destinationsArray);
  showWelcome(user);
  displayTrips(user.displayArray);
  console.log(user);
};

const showWelcome = (user) => {
  const welcome = document.querySelector(".welcome");
  const total = document.querySelector(".total");
  welcome.innerText = `Welcome back ${user.returnUserFirstName()}`;
  total.innerText = `Total spent this year: $${user.returnTotalSpent()}`;
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
  formDataObj = {
    img: destination.image,
    alt: destination.alt || destination.destination,
    name: destination.destination,
    price: price + fee,
    id: tripsRepository.trips.length + 1,
    userID: currentTraveler.id,
    destinationID: destination.id,
    travelers: parseInt(numbTravelers.value),
    date: startDate.value.split("-").join("/"),
    duration: parseInt(duration.value),
    status: "pending",
    suggestedActivities: [],
  };
  return formDataObj;
};

const showMockUp = (formObj) => {
  let newHTML = `
  <article class="mock-up">
    <img class="card-img" src="${formObj.img}" alt="${formObj.alt}" />
    <p class="card"><b>${formObj.name}</b></p>
    <p class="card">Start date: ${formObj.date}</p>
    <p class="card">Durration: <b>${formObj.duration}</b> days</p>
    <p class="card">Travelers: <b>${formObj.travelers}</b></p>
    <p class="card">After agent fees, the total cost of this trip will be $<b>${formObj.price}</b>
  </article>
  <button class="form-choice" id="request">Submit Request</button>
  <button class="form-choice" id="cancel">Cancel</button>`;
  mockUpDisplay.innerHTML = newHTML;
  addHidden(formWrapper);
};

const checkClick = (event) => {
  let form = document.querySelector(".add-trip-form");
  if (event.target.id === "request") {
    alert("Thank you! 😎");
    postNewTrip(formDataObj);
    form.reset();
    removeHidden(formWrapper);
    mockUpDisplay.innerHTML = "";
  }
  if (event.target.id === "cancel") {
    mockUpDisplay.innerHTML = "";
    removeHidden(formWrapper);
  }
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
