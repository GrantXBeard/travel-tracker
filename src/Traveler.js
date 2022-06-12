const dayjs = require("dayjs");

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

  createDisplayArray(destinationsArray) {
    this.displayArray = this.trips.reduce((acc, cur) => {
      destinationsArray.forEach((dest) => {
        if (dest.id === cur.destinationID) {
          const flightCost = dest.estimatedFlightCostPerPerson * cur.duration;
          const lodgeCost = dest.estimatedLodgingCostPerDay * cur.duration;
          const price = (flightCost + lodgeCost) * cur.travelers;
          const fee = (flightCost + lodgeCost) * cur.travelers * 0.1;
          const obj = {
            img: dest.image,
            alt: dest.alt || dest.destination,
            name: dest.destination,
            dates: cur.date,
            duration: cur.duration,
            price: price + fee,
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

  createPastArray() {
    let today = dayjs().format("YYYY/MM/DD");
    return this.displayArray.filter((trip) => trip.dates < today);
  }

  createPresentArray() {
    let today = dayjs().format("YYYY/MM/DD");
    return this.displayArray.filter((trip) => trip.dates === today);
  }

  createFutureArray() {
    let today = dayjs().format("YYYY/MM/DD");
    return this.displayArray.filter((trip) => trip.dates > today);
  }
}

export default Traveler;
