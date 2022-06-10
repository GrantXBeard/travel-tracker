import { expect } from "chai";
import TripsRepository from "../src/TripsRepository";
import { trips } from "../src/sampleData/trips";

describe("Trips Repository", () => {
  let tripsRepository;

  beforeEach(() => {
    tripsRepository = new TripsRepository(trips);
  });

  it("should be a function", () => {
    expect(TripsRepository).to.be.a("function");
  });

  it("should be an instance of TripsRepository", () => {
    expect(tripsRepository).to.be.an.instanceof(TripsRepository);
  });

  it("should hold all trips", () => {
    expect(tripsRepository.trips).to.equal(trips);
  });

  it("should return a travelers trips when given that travelers ID", () => {
    expect(tripsRepository.getTrips(33)).to.deep.equal([
      {
        id: 12,
        userID: 33,
        destinationID: 33,
        travelers: 6,
        date: "2022/10/17",
        duration: 6,
        status: "approved",
        suggestedActivities: [],
      },
      {
        id: 30,
        userID: 33,
        destinationID: 29,
        travelers: 1,
        date: "2020/07/17",
        duration: 5,
        status: "approved",
        suggestedActivities: [],
      },
    ]);
  });
});
