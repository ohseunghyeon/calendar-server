import request from 'supertest';
import app from '../../app';
import db, { Event } from '../../db';
import { ERROR } from '../../contants';

describe('DELETE /events, controller removeEvent', () => {
  it('should return status 400 if id is not provided', done => {
    request(app)
      .delete('/events')
      .expect(400)
      .expect({ error: ERROR.ID_NEEDED }, done);
  });

  it('should return status 400 if id is wrong', done => {
    request(app)
      .delete('/events')
      .send({ id: 0 })
      .expect(400)
      .expect({ error: ERROR.WRONG_ID }, done);
  })

  it('should remove the event of id and return the event', (done) => {
    const event: Event = { title: '추가할 이벤트', start: 100, end: 1000 };

    request(app)
      .post('/events')
      .send(event)
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err);
        }

        event.id = res.body.id;

        request(app)
          .delete('/events')
          .send({ id: event.id })
          .expect(200)
          .expect(event, done);
      })
  })

});
