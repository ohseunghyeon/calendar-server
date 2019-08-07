import request from 'supertest';
import app from '../../app';
import db, { Event } from '../../db';
import { ERROR } from '../../contants';

describe('PUT /events, controller updateEvent', () => {
  it('should return status 400 if id is not provided', done => {
    request(app)
      .put('/events')
      .send({ title: '책 읽기', start: 1, end: 10 })
      .expect(400)
      .expect({ error: ERROR.EVENT_PROPS_NEEDED }, done);
  });

  it('should return status 400 if title is not provided', done => {
    request(app)
      .put('/events')
      .send({ id: 1, start: 1, end: 10 })
      .expect(400)
      .expect({ error: ERROR.EVENT_PROPS_NEEDED }, done);
  });

  it('should return status 400 if start is not provided', done => {
    request(app)
      .put('/events')
      .send({ id: 1, title: '책 읽기', end: 10 })
      .expect(400)
      .expect({ error: ERROR.EVENT_PROPS_NEEDED }, done);
  });

  it('should return status 400 if end is not provided', done => {
    request(app)
      .put('/events')
      .send({ id: 1, title: '책 읽기', start: 1 })
      .expect(400)
      .expect({ error: ERROR.EVENT_PROPS_NEEDED }, done);
  });

  it('should return status 400 if provided id does not exist', done => {
    request(app)
      .put('/events')
      .send({ id: 0, title: '바꿀 이름', start: 1, end: 10 })
      .expect(400)
      .expect({ error: ERROR.WRONG_ID }, done);
  });

  it('should return updated event', done => {
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

        const NEW_TITLE = '바뀐 타이틀';
        const NEW_START = 1000;
        const NEW_END = 2000;

        event.title = NEW_TITLE;
        event.start = NEW_START;
        event.end = NEW_END;

        request(app)
          .put('/events')
          .send(event)
          .expect(200)
          .expect(event, done);
      });
  });

  it('should return status 400 if the provided time is already occupied', done => {
    const event1: Event = { title: '추가할 이벤트1', start: 3000, end: 4000 };
    const event2: Event = { title: '추가할 이벤트2', start: 6000, end: 8000 };

    request(app)
      .post('/events')
      .send(event1)
      .expect(200)
      .end((err, res) => {
        if (err) done(err);

        event1.id = res.body.id;
        request(app)
          .post('/events')
          .send(event2)
          .expect(200)
          .end((err, res) => {
            if (err) done(err);

            request(app)
              .put('/events')
              .send({
                id: event1.id,
                title: '책 보기',
                start: event2.start,
                end: event2.end,
              })
              .expect(400)
              .expect({ error: ERROR.OCCUPIED_TIME }, done);
          });
      });
  });
});
