import express from 'express';
import db, { Event } from '../db';
import { ERROR } from '../contants';

const removeEvents = (req: express.Request, res: express.Response) => {
  const { id }: Event = req.body;

  if (id === undefined) {
    res.status(400);
    return res.json({ error: ERROR.ID_NEEDED });
  }

  const events: Event[] = db.select();
  const filtered = events.filter(event => event.id === id);

  if (filtered.length === 0) {
    res.status(400);
    return res.json({ error: ERROR.WRONG_ID });
  }

  const removedEvent = db.remove(id);

  res.json(removedEvent);
};

export default removeEvents;
