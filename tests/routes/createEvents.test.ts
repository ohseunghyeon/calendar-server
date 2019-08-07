import request from 'supertest';
import app from '../../app';
import { ERROR } from '../../contants';

describe('POST /events. controller createEvent', () => {
    it('should create an event and returns the event', done => {
      request(app)
        .post('/events')
        .send({ title: '책 보기', start: 1565157955751, end: 1565161555751 })
        .expect(200, done);
    });

    it('should return status 400 if no title property is provided', done => {
      request(app)
        .post('/events')
        .send({ start: 1565157955751, end: 1565161555751 })
        .expect(400)
        .expect({ error: ERROR.TITLE_START_END_NEEDED }, done);
    });

    it('should return status 400 if no start property is provided', done => {
      request(app)
        .post('/events')
        .send({ title: '책 보기', end: 1565161555751 })
        .expect(400)
        .expect({ error: ERROR.TITLE_START_END_NEEDED }, done);
    });

    it('should return status 400 if no end property is provided', done => {
      request(app)
        .post('/events')
        .send({ title: '책 보기', start: 1565157955751 })
        .expect(400)
        .expect({ error: ERROR.TITLE_START_END_NEEDED }, done);
    });

    it('should return status 400 if end is bigger than start', done => {
      request(app)
        .post('/events')
        .send({ title: '책 보기', start: 1565161555751, end: 1565157955751 })
        .expect(400)
        .expect({ error:  ERROR.END_SHOULD_BE_BIGGER_THAN_START }, done);
    });

    it('should return status 400 if the provided time is already occupied', done => {
      request(app)
        .post('/events')
        .send({ title: '책 보기', start: 1565157955751, end: 1565161555751 })
        .expect(400)
        .expect({ error: ERROR.OCCUPIED_TIME }, done);
    })
});
