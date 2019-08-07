export interface Event {
  id?: number;
  title: string;
  start: number;
  end: number;
}

export const events: Event[] = [
  {
    id: 1,
    title: 'meeting friends',
    start: new Date('2019-08-06T01:00:00').getTime(),
    end: new Date('2019-08-06T02:00:00').getTime(),
  },
  {
    id: 2,
    title: 'watching movie',
    start: new Date('2019-08-07T05:00:00').getTime(),
    end: new Date('2019-08-07T07:00:00').getTime(),
  },
  {
    id: 3,
    title: 'reading a book',
    start: new Date('2019-08-06T08:00:00').getTime(),
    end: new Date('2019-08-06T09:00:00').getTime(),
  },
  {
    id: 4,
    title: 'listening songs',
    start: new Date('2019-08-08T02:00:00').getTime(),
    end: new Date('2019-08-08T03:00:00').getTime(),
  },
];

export let nextId = 5;

function insert({ title, start, end }: Event): Event {
  events.push({
    id: nextId++,
    title,
    start,
    end,
  });

  return events[events.length - 1];
}

function select(): Event[] {
  return events;
}

function remove(id: number) {
  const index = events.findIndex(event => event.id === id);
  return events.splice(index, 1)[0];
}

export default {
  insert,
  select,
  remove,
};
