import { Event } from '../../db';

interface filterEventsProps {
  start: number;
  end: number;
}

/**
 * filter로 사용할 start, end에 의해서 검색하려는 일정들의 시간 일부라도 겹치면 filter하게 됩니다.
 */
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
