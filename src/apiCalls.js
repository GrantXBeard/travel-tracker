let apiTravelersData, apiTripsData, apiDestinationsDataObj;

const fetchData = (dataSet) => {
  return fetch(`http://localhost:3001/api/v1/${dataSet}`)
    .then((response) => response.json())
    .catch((error) => console.log(dataSet));
};

export const fetchAll = () => {
  apiTravelersData = fetchData("travelers");
  apiTripsData = fetchData("trips");
  apiDestinationsDataObj = fetchData("destinations");
  return Promise.all([apiTravelersData, apiTripsData, apiDestinationsDataObj]);
};

export const postNewTrip = (formData) => {
  fetch("http://localhost:3001/api/v1/trips", {
    methos: "POST",
    body: JSON.stringify({
      id: formData.id,
      userID: formData.userID,
      destinationID: formData.destinationID,
      travelers: formData.travelers,
      date: formData.date,
      duration: formData.duration,
      status: formData.status,
      suggestedActivities: [],
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
