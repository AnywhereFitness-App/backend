const request = require('supertest');
const server = require('./server');
const db = require('./../data/dbConfig');
const User = require('./users/users-model');
const Class = require('./classes/classes-model');

beforeAll(async () => {
    await db.migrate.rollback();
    await db.migrate.latest(); 
});
beforeEach(async () => {
    await db('users').truncate();
});
afterAll(async () => { 
    await db.destroy();
}) 

const daniel = { email: 'daniel@yahoo.com', password: '1234', role: 1 };
const danielLogin = { email: 'daniel@yahoo.com', password: '1234' }
const bob = { email: 'bob@yahoo.com' };

describe('endpoints', () => {
  describe('[POST] /api/users/register', () => {
    it('adds a new user to the database', async () => {
      await User.createRole({ role: 'client' });
      await User.createRole({ role: 'instructor' });
      let res = await request(server).post('/api/users/register').send(daniel);
      expect(res.status).toBe(201); 
      // res = await User.getAll();
      // expect(res.body).toHaveLength(1); 
    })
    it('responds with the newly created user', async () => {
      let res = await request(server).post('/api/users/register').send(daniel);
      expect(res.body.email).toBe('daniel@yahoo.com');
    }) 
    it('responds with a 400 if invalid credentials', async () => {
      let res = await request(server).post('/api/users/register').send(bob);
      expect(res.status).toBe(400);
    })
  })

  describe('[POST] /api/users/login', () => {
    it('responds with the logged in user and a token', async () => {
      let res = await request(server).post('/api/users/register').send(daniel); 
      res = await request(server).post('/api/users/login').send(danielLogin); 
      expect(res.body.message.substring(9)).toBe('daniel@yahoo.com');
      expect(res.body.token).toBeTruthy(); 
    }) 
    it('responds with a 400 if invalid credentials', async () => {
      let res = await request(server).post('/api/users/login').send(bob);
      expect(res.status).toBe(400);
    })
  })

  describe('[GET] /api/classes', () => {
    it('it responds with 200 OK if token valid', async () => {
      await request(server).post('/api/users/register').send(daniel); 
      const { body: { token } } = await request(server).post('/api/users/login').send(daniel)
      const res = await request(server).get('/api/classes').set('Authorization', token)
      expect(res.status).toBe(200);
    })    
    it('it responds with 401 if no token', async () => {
      let res = await request(server).get('/api/classes');
      expect(res.status).toBe(401);
    })
  })
});