import express from 'express';
import db, { Event } from '../db';
import { isTimeOccupied } from './util';
import { ERROR } from '../contants';

const createEvents = (req: express.Request, res: express.Response) => {
  const { title, start, end }: Event = req.body;

  if (title === undefined || start === undefined || end === undefined) {
    res.status(400);
    return res.json({ error: ERROR.TITLE_START_END_NEEDED });
  }

  if (start >= end) {
    res.status(400);
    return res.json({ error: ERROR.END_SHOULD_BE_BIGGER_THAN_START });
  }

  const events = db.select();

  if (isTimeOccupied(events, { start, end })) {
    res.status(400);
    return res.json({ error: ERROR.OCCUPIED_TIME });
  }

  const event: Event = db.insert({
    title,
    start,
    end,
  });

  res.json(event);
};

export default createEvents;
