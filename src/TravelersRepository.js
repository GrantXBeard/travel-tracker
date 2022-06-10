class TravelersRepository {
  constructor(travelers) {
    this.travelers = travelers;
  }
  getSingleTraveler(id) {
    return this.travelers.find((traveler) => traveler.id === id);
  }
}

export default TravelersRepository;
