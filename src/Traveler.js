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
          const flightCost = dest.estimatedFlightCostPerPerson * cur.travelers;
          const lodgeCost = dest.estimatedLodgingCostPerDay * cur.duration;
          const price = flightCost + lodgeCost;
          const fee = price * 0.1;
          const obj = {
            img: dest.image,
            alt: dest.alt || dest.destination,
            name: dest.destination,
            startDate: cur.date,
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

  returnTotalSpent() {
    let today = dayjs().format("YYYY/MM/DD");
    let total = this.displayArray.reduce((acc, cur) => {
      if (cur.startDate < today && cur.startDate > "2022/01/01") {
        acc += cur.price;
      }
      return acc;
    }, 0);
    return total;
  }

  createStatusArray(status) {
    return this.displayArray.filter((trip) => trip.status === status);
  }

  createTimeArray(time) {
    let today = dayjs().format("YYYY/MM/DD");
    if (time === "past") {
      return this.displayArray.filter((trip) => trip.startDate < today);
    }
    if (time === "present") {
      return this.displayArray.filter((trip) => trip.startDate === today);
    }
    if (time === "future") {
      return this.displayArray.filter((trip) => trip.startDate > today);
    }
  }
}

export default Traveler;
