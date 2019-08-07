import { Event } from '../../db';

interface filterEventsProps {
  start: number;
  end: number;
}

function filterEventsByTime(
  events: Event[],
  { start, end }: filterEventsProps
): Event[] {
  return events.filter(event => {
    if (event.start >= start && event.start < end) return true;
    if (event.end <= end && event.end > start) return true;
    return false;
  });
}

export default filterEventsByTime;
