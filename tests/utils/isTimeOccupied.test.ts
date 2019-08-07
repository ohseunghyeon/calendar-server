import { Event } from '../../db';
import isTimeOccupied from '../../controllers/util/isTimeOccupied';

describe('function filterOverlapedEvent', () => {
  it('should return true if there is an event on provided time', () => {
    const events: Event[] = [
      {
        id: 2,
        title: 'watching movie',
        start: 30,
        end: 50,
      },
    ];

    let isOverlapped: boolean;

    // start is smaller and end is between the existing event time
    isOverlapped = isTimeOccupied(events, { start: 20, end: 40 });
    expect(isOverlapped).toBe(true);

    // start is the same and end is between the existing start and end
    isOverlapped = isTimeOccupied(events, { start: 30, end: 40 });
    expect(isOverlapped).toBe(true);

    // both start and end is between existing start and end
    isOverlapped = isTimeOccupied(events, { start: 35, end: 45 });
    expect(isOverlapped).toBe(true);

    // start is between existing start and end and end is the same 
    isOverlapped = isTimeOccupied(events, { start: 40, end: 50 });
    expect(isOverlapped).toBe(true);

    // start is between existing start and end and end is bigger
    isOverlapped = isTimeOccupied(events, { start: 40, end: 60 });
    expect(isOverlapped).toBe(true);

    // start is smaller and end is bigger
    isOverlapped = isTimeOccupied(events, { start: 20, end: 60 });
    expect(isOverlapped).toBe(true);

    // not overlapped
    isOverlapped = isTimeOccupied(events, { start: 50, end: 60 });
    expect(isOverlapped).toBe(false);

    // not overlapped
    isOverlapped = isTimeOccupied(events, { start: 20, end: 30 });
    expect(isOverlapped).toBe(false);
  });
});