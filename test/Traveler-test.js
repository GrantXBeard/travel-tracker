import { expect } from "chai";
import { travelers } from "../src/sampleData/travelers";
import { trips } from "../src/sampleData/trips";
import { destinations } from "../src/sampleData/destinations";
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
    expect(traveler12.trips.length).to.equal(3);
  });

  it("should be able to return the travelers first name", () => {
    expect(traveler12.returnUserFirstName()).to.equal("Lannie");
  });

  it("sould be able to create an array of objects for displaying trips", () => {
    traveler12.createDisplayArray(destinations);
    expect(traveler12.displayArray.length).to.equal(3);
  });

  it("should be able to return the amount spent in the last year", () => {
    traveler12.createDisplayArray(destinations);
    expect(traveler12.returnTotalSpent()).to.equal(2277);
  });

  it("should be able to return a new array of past trips", () => {
    traveler12.createDisplayArray(destinations);
    expect(traveler12.createTimeArray("past")).to.deep.equal([
      {
        img:
          "https://images.unsplash.com/photo-1535776142635-8fa180c46af7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2756&q=80",
        alt: "Toronto, Canada",
        name: "Toronto, Canada",
        startDate: "2022/01/28",
        duration: 18,
        price: 2277,
        status: "approved",
        amountTravelers: 1,
      },
    ]);
  });

  it("should be able to return a new array of present trips", () => {
    traveler12.createDisplayArray(destinations);
    expect(traveler12.createTimeArray("present")).to.deep.equal([]);
  });

  it("should be able to return a new array of future trips", () => {
    traveler12.createDisplayArray(destinations);
    expect(traveler12.createTimeArray("future")).to.deep.equal([
      {
        img:
          "https://images.unsplash.com/photo-1556543697-2fb00d31948a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
        alt:
          "buildings and people crossing the street carrying shoping bags during the day",
        name: "St. Petersburg, Russia",
        startDate: "2022/07/04",
        duration: 6,
        price: 4290,
        status: "pending",
        amountTravelers: 3,
      },
      {
        img:
          "https://images.unsplash.com/photo-1560089168-6516081f5bf1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
        alt: "city with boats on the water during the day time",
        name: "Stockholm, Sweden",
        startDate: "2022/09/25",
        duration: 17,
        price: 3586,
        status: "approved",
        amountTravelers: 2,
      },
    ]);
  });

  it("should be able return a new array based on the status of the trips", () => {
    traveler12.createDisplayArray(destinations);
    expect(traveler12.createStatusArray("approved")).to.deep.equal([
      {
        img:
          "https://images.unsplash.com/photo-1560089168-6516081f5bf1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
        alt: "city with boats on the water during the day time",
        name: "Stockholm, Sweden",
        startDate: "2022/09/25",
        duration: 17,
        price: 3586,
        status: "approved",
        amountTravelers: 2,
      },
      {
        img:
          "https://images.unsplash.com/photo-1535776142635-8fa180c46af7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2756&q=80",
        alt: "Toronto, Canada",
        name: "Toronto, Canada",
        startDate: "2022/01/28",
        duration: 18,
        price: 2277,
        status: "approved",
        amountTravelers: 1,
      },
    ]);
    expect(traveler12.createStatusArray("pending")).to.deep.equal([
      {
        img:
          "https://images.unsplash.com/photo-1556543697-2fb00d31948a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
        alt:
          "buildings and people crossing the street carrying shoping bags during the day",
        name: "St. Petersburg, Russia",
        startDate: "2022/07/04",
        duration: 6,
        price: 4290,
        status: "pending",
        amountTravelers: 3,
      },
    ]);
  });
});
