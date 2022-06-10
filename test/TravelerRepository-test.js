import { expect } from "chai";
import TravelersRepository from "../src/TravelersRepository";
import { travelers } from "../src/sampleData/travelers";

describe("Travelers Repository", () => {
  let travelersRepository;

  beforeEach(() => {
    travelersRepository = new TravelersRepository(travelers);
  });

  it("should be a function", () => {
    expect(TravelersRepository).to.be.a("function");
  });

  it("should be an instance of TripsRepository", () => {
    expect(travelersRepository).to.be.an.instanceof(TravelersRepository);
  });

  it("should hold all travelers", () => {
    expect(travelersRepository.travelers).to.equal(travelers);
  });

  it("should return a specific travelers data when given that travelers ID", () => {
    expect(travelersRepository.getSingleTraveler(37)).to.deep.equal({
      id: 37,
      name: "Jorry Adamczewski",
      travelerType: "thrill-seeker",
    });
  });
});
