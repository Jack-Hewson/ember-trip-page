import '@testing-library/jest-dom'
import { convertToTime, calculateNearestTime, getStartTime, getEndTime, getGapInMinutes } from '../../TimeHelper';
import { stubQuotesData } from './stubdata';

const setFakeTime = () => {
    jest
        .useFakeTimers()
        .setSystemTime(new Date('2024-04-01T12:06:08Z'));
}

describe('convertToTime', () => {
    it('should expose a function', () => {
        expect(convertToTime).toBeDefined();
    });

    it('convertToTime should return expected output', () => {
        const stringTime = '2024-03-28T15:07:50+20:00'
        const returnedTime = convertToTime(stringTime)
        expect(returnedTime).toEqual("19:07:50");
    })
});

describe('calculateNearestTime', () => {
    it('should expose a function', () => {
        expect(calculateNearestTime).toBeDefined();
    });

    it('calculateNearestTime should return expected output', () => {
        setFakeTime()
        const nearestTime = calculateNearestTime(stubQuotesData)
        expect(nearestTime).toEqual(10);
    });
});

describe('getStartTime', () => {
    it('should expose a function', () => {
        expect(getStartTime).toBeDefined();
    });

    it('getStartTime should return expected output', () => {
        setFakeTime()
        const startTime = getStartTime()
        expect(startTime).toEqual('2024-03-31T23:00:00.000Z');
    });
});

describe('getEndTime', () => {
    it('should expose a function', () => {
        expect(getEndTime).toBeDefined();
    });

    it('getEndTime should return expected output', () => {
        setFakeTime()
        const endtime = getEndTime()
        expect(endtime).toEqual('2024-04-01T22:59:59.000Z');
    });
});

describe('getGapInMinutes', () => {
    it('should expose a function', () => {
        expect(getGapInMinutes).toBeDefined();
    });

    it('getGapInMinutes should return expected output', () => {
        setFakeTime()
        const gap = getGapInMinutes(new Date('2024-04-01T12:02:21Z'))
        expect(gap).toEqual('3 minute/s ago');
    });
});