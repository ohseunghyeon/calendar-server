import express from 'express';
import db, { Event } from '../db';
import { isTimeOccupied } from './util';
import { ERROR } from '../contants';

const updateEvents = (req: express.Request, res: express.Response) => {
  const { id, title, start, end }: Event = req.body;

  if ([id, title, start, end].filter(p => p === undefined).length > 0) {
    res.status(400);
    return res.json({ error: ERROR.EVENT_PROPS_NEEDED });
  }

  const events: Event[] = db.select();
  const filtered = events.filter(event => event.id === id);

  if (filtered.length === 0) {
    res.status(400);
    return res.json({ error: ERROR.WRONG_ID });
  }

  if (isTimeOccupied(events, { start, end })) {
    res.status(400);
    return res.json({ error: ERROR.OCCUPIED_TIME });
  }

  const filteredEvent = filtered[0];

  filteredEvent.title = title;
  filteredEvent.start = start;
  filteredEvent.end = end;

  res.json(filteredEvent);
};

export default updateEvents;
