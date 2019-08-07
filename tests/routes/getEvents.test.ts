import request from 'supertest';
import app from '../../app';
import { ERROR } from '../../contants';

describe('GET /events, controller getEvents', () => {
  it('should return array of events', done => {
    request(app)
      .get('/events?start=1565157955751&end=1565161555751')
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(Array.isArray(res.body)).toBe(true);
        return done();
      });
  });

  it('should return statue 400 and error message if no start is provided', done => {
    request(app)
      .get('/events?end=1565161555751')
      .expect(400)
      .expect(ERROR.START_END_NEEDED, done);
  });

  it('should return statue 400 and error message if no end is provided', done => {
    request(app)
      .get('/events?start=1565157955751')
      .expect(400)
      .expect(ERROR.START_END_NEEDED, done);
  });
});
