import express from 'express';
import {
  getEvents,
  createEvents,
  updateEvents,
  removeEvents,
} from '../controllers';

const router = express.Router();

router.get('/events', getEvents);
router.post('/events', createEvents);
router.put('/events', updateEvents);
router.delete('/events', removeEvents);

export default router;
