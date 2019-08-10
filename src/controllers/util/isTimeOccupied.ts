import { Event } from '../../db';

interface TimeProps {
  id?: number; 
  start: number;
  end: number;
}

function isTimeOccupied(events: Event[], { id, start, end  }: TimeProps): boolean {
  const foundOverlapped = events.find(event => {
    // on update. ignore its own event.
    if (id && id === event.id) return false;

    if (event.start < start && event.end > end) return true;
    if (event.start >= start && event.start < end) return true;
    if (event.end > start && event.end <= end) return true;
    return false;
  });

  return foundOverlapped !== undefined;
}

export default isTimeOccupied;
