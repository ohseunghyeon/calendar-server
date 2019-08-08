import express from 'express';
import db, { Event } from '../db';
import { filterEventsByTime } from './util';
import { ERROR } from '../contants';

const getEvents = (req: express.Request, res: express.Response) => {
  const { start, end }: Event = req.query;

  if (start === undefined || end === undefined) {
    res.status(400);
    return res.json({ error: ERROR.START_END_NEEDED });
  }
  
  const events = db.select();
  
  const filteredEvents = filterEventsByTime(events, { start, end });
  
  res.json(filteredEvents);
};

export default getEvents;
