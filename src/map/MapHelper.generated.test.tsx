import '@testing-library/jest-dom'
// import { getGapInMinutes } from "../TimeHelper";
import { addRouteLineLayer, addLiveBusMarkerLayer, addRouteMarkerLayer } from "./MapHelper";

jest.mock("mapbox-gl");
jest.mock("./map.css");
jest.mock("../TimeHelper");

describe('addRouteLineLayer', () => {
  it('should expose a function', () => {
		expect(addRouteLineLayer).toBeDefined();
	});
  
  it('addRouteLineLayer should return expected output', () => {
    // const retValue = addRouteLineLayer(map,routeData);
    expect(false).toBeTruthy();
  });
});
describe('addLiveBusMarkerLayer', () => {
  it('should expose a function', () => {
		expect(addLiveBusMarkerLayer).toBeDefined();
	});
  
  it('addLiveBusMarkerLayer should return expected output', async () => {
    // const retValue = await addLiveBusMarkerLayer(map,routeData);
    expect(false).toBeTruthy();
  });
});
describe('addRouteMarkerLayer', () => {
  it('should expose a function', () => {
		expect(addRouteMarkerLayer).toBeDefined();
	});
  
  it('addRouteMarkerLayer should return expected output', () => {
    // const retValue = addRouteMarkerLayer(map,routeData);
    expect(false).toBeTruthy();
  });
});