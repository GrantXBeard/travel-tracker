import { reloadData } from "./scripts.js";

let apiTravelersData, apiTripsData, apiDestinationsDataObj;

const fetchData = (dataSet) => {
  return fetch(`http://localhost:3001/api/v1/${dataSet}`).then((response) =>
    response.json()
  );
};

export const fetchAll = () => {
  apiTravelersData = fetchData("travelers");
  apiTripsData = fetchData("trips");
  apiDestinationsDataObj = fetchData("destinations");
  return Promise.all([apiTravelersData, apiTripsData, apiDestinationsDataObj]);
};

export const postNewTrip = (formData) => {
  fetch("http://localhost:3001/api/v1/trips", {
    method: "POST",
    body: JSON.stringify({
      id: formData.id,
      userID: formData.userID,
      destinationID: formData.destinationID,
      travelers: formData.travelers,
      date: formData.date,
      duration: formData.duration,
      status: formData.status,
      suggestedActivities: formData.suggestedActivities,
    }),
    headers: { "Content-type": "application/json" },
  })
    .then((res) => throwError(res))
    .then((json) => reloadData())
    .catch((error) => {
      console.log(error.message);
      displayErrorMessage(error);
    });
};

const throwError = (res) => {
  if (!res.ok) {
    throw new Error("Please make sure all fields are filled out.");
  } else {
    return res.json();
  }
};

const displayErrorMessage = (error) => {
  const postError = document.querySelector(".error-box");
  if (error.message === "Failed to fetch") {
    return (postError.innerText = "OOPS something went wrong");
  } else {
    return (postError.innerText = error.message);
  }
};
