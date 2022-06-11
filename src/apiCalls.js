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
