class TripsRepository {
  constructor(trips) {
    this.trips = trips;
  }

  getTrips(id) {
    let singleUserTrips = [];
    this.trips.forEach((trip) => {
      if (trip.userID === id) {
        singleUserTrips.push(trip);
      }
    });
    return singleUserTrips;
  }
}

export default TripsRepository;
