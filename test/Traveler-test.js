import { expect } from "chai";
import { travelers } from "../src/sampleData/travelers";
import { trips } from "../src/sampleData/trips";
import TravelersRepository from "../src/TravelersRepository";
import TripsRepository from "../src/TripsRepository";
import Traveler from "../src/Traveler.js";

describe("Traveler", () => {
  let travelersRepository,
    tripsRepository,
    traveler12,
    traveler12Data,
    traveler12Trips;

  beforeEach(() => {
    travelersRepository = new TravelersRepository(travelers);
    tripsRepository = new TripsRepository(trips);
    traveler12Data = travelersRepository.getSingleTraveler(12);
    traveler12Trips = tripsRepository.getTrips(12);
    traveler12 = new Traveler(traveler12Data, traveler12Trips);
  });

  it("should be a function", () => {
    expect(Traveler).to.be.a("function");
  });

  it("should be an instance of Traveler", () => {
    expect(traveler12).to.be.an.instanceof(Traveler);
  });

  it("should represent a single travelers data", () => {
    expect(traveler12.id).to.equal(12);
    expect(traveler12.name).to.equal("Lannie Heynel");
    expect(traveler12.travelerType).to.equal("history buff");
    expect(traveler12.trips).to.deep.equal([
      {
        id: 21,
        userID: 12,
        destinationID: 10,
        travelers: 1,
        date: "2022/01/28",
        duration: 18,
        status: "approved",
        suggestedActivities: [],
      },
    ]);
  });
});
