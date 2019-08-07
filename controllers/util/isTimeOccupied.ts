import { Event } from '../../db';

interface TimeProps {
  start: number;
  end: number;
}

function isTimeOccupied(events: Event[], { start, end }: TimeProps): boolean {
  const foundOverlapped = events.find(event => {
    if (event.start < start && event.end > end) return true;
    if (event.start >= start && event.start < end) return true;
    if (event.end > start && event.end <= end) return true;
    return false;
  });

  return foundOverlapped !== undefined;
}

export default isTimeOccupied;