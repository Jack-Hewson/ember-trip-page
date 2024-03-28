import axios from "axios";
import { getEndTime, getStartTime } from "../TimeHelper";
import { requestQuotes, requestRoutes } from "./ApiHelper";

jest.mock("axios");
jest.mock("../TimeHelper");

describe('requestQuotes', () => {
  it('should expose a function', () => {
		expect(requestQuotes).toBeDefined();
	});
  
  it('requestQuotes should return expected output', () => {
    // const retValue = requestQuotes(setQuotes);
    expect(false).toBeTruthy();
  });
});
describe('requestRoutes', () => {
  it('should expose a function', () => {
		expect(requestRoutes).toBeDefined();
	});
  
  it('requestRoutes should return expected output', () => {
    // const retValue = requestRoutes(quotes,nearestTime,currentRoute,setRoute);
    expect(false).toBeTruthy();
  });
});