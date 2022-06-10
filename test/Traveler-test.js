import { expect } from "chai";
import { travelers } from "../src/sampleData/travelers";
import { trips } from "../src/sampleData/trips";
import Traveler from "../src/Traveler.js";

describe("Traveler", () => {
  let traveler12, traveler22, traveler36;

  beforeEach(() => {
    traveler12 = new Traveler();
    traveler22 = new Traveler();
    traveler36 = new Traveler();
  });

  it("should be a function", () => {
    expect(Traveler).to.be.a("function");
  });

  it("should be an instance of Traveler", () => {
    expect(traveler12).to.be.an.instanceof(Traveler);
  });

  // it("should represent a single travelers data", () => {});
});
