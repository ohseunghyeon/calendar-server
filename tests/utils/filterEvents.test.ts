import { Event } from '../../db';
import filterEventsByTime from '../../controllers/util/filterEventsByTime';

describe('function filterEventsByTime', () => {
  it('should return filterd events properly', () => {
    const events: Event[] = [
      {
        id: 1,
        title: 'meeting friends',
        start: 0,
        end: 10,
      },
      {
        id: 2,
        title: 'watching movie',
        start: 10,
        end: 30,
      },
      {
        id: 3,
        title: 'reading a book',
        start: 40,
        end: 50,
      },
      {
        id: 4,
        title: 'listening songs',
        start: 70,
        end: 100,
      },
    ];

    let filteredEvents: Event[];

    filteredEvents = filterEventsByTime(events, { start: 0, end: 10 });
    expect(Array.isArray(filteredEvents)).toBe(true);
    expect(filteredEvents.length).toBe(1);

    filteredEvents = filterEventsByTime(events, { start: 0, end: 30 });
    expect(Array.isArray(filteredEvents)).toBe(true);
    expect(filteredEvents.length).toBe(2);

    filteredEvents = filterEventsByTime(events, { start: 0, end: 45 });
    expect(Array.isArray(filteredEvents)).toBe(true);
    expect(filteredEvents.length).toBe(3);

    filteredEvents = filterEventsByTime(events, { start: 5, end: 30 });
    expect(Array.isArray(filteredEvents)).toBe(true);
    expect(filteredEvents.length).toBe(2);

    filteredEvents = filterEventsByTime(events, { start: 5, end: 25 });
    expect(Array.isArray(filteredEvents)).toBe(true);
    expect(filteredEvents.length).toBe(2);

    filteredEvents = filterEventsByTime(events, { start: 5, end: 90 });
    expect(Array.isArray(filteredEvents)).toBe(true);
    expect(filteredEvents.length).toBe(4);

    filteredEvents = filterEventsByTime(events, { start: 0, end: 5000 });
    expect(Array.isArray(filteredEvents)).toBe(true);
    expect(filteredEvents.length).toBe(4);
  });
});