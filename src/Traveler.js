class Traveler {
  constructor(travelerData, trips) {
    this.id = travelerData.id;
    this.name = travelerData.name;
    this.travelerType = travelerData.travelerType;
    this.trips = trips;
  }

  returnUserFirstName() {
    if (this.name === undefined) {
      return "Oops it looks like your name is missing from our database";
    } else {
      const splitName = this.name.split(" ");
      return splitName[0];
    }
  }
}

export default Traveler;
