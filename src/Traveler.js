class Traveler {
  constructor(travelerData, trips) {
    this.id = travelerData.id;
    this.name = travelerData.name;
    this.travelerType = travelerData.travelerType;
    this.trips = trips;
    this.displayArray = null;
  }

  returnUserFirstName() {
    if (this.name === undefined) {
      return "Oops it looks like your name is missing from our database";
    } else {
      const splitName = this.name.split(" ");
      return splitName[0];
    }
  }

  createDisplayArray(destinationsData) {
    this.displayArray = this.trips.reduce((acc, cur) => {
      destinationsData.forEach((dest) => {
        if (dest.id === cur.destinationID) {
          const flightCost = dest.estimatedFlightCostPerPerson * cur.duration;
          const lodgeCost = dest.estimatedLodgingCostPerDay * cur.duration;
          const obj = {
            img: dest.image,
            alt: dest.alt || dest.destination,
            name: dest.destination,
            dates: cur.date,
            duration: cur.duration,
            price: (flightCost + lodgeCost) * cur.travelers,
            status: cur.status,
            amountTravelers: cur.travelers,
          };
          acc.push(obj);
        }
      });
      return acc;
    }, []);
  }

  createStatusArray(status) {
    return this.displayArray.filter((trip) => trip.status === status);
  }
}

export default Traveler;
