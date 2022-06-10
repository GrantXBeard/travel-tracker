class Traveler {
  constructor(travelerData, trips) {
    this.id = travelerData.id;
    this.name = travelerData.name;
    this.travelerType = travelerData.travelerType;
    this.trips = trips;
  }
}

export default Traveler;
