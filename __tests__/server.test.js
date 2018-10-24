const mongoose = require('mongoose');
const MongodbMemoryServer = require('mongodb-memory-server').MongoMemoryServer;
const request = require('supertest');
const server = require('../server');
const { make_token } = require('../api/utils/auth');
const http = require('http');

const PORT = 9000;
const mongod = new MongodbMemoryServer();
const testServer = http.createServer(server);

describe('User', () => {
  const testuser = {
    username: 'theTestAccount',
    password: '123456',
    email: 'email@email.com'
  };
  // Connect to the mongodb before tests are run
  beforeAll(async () => {
    const uri = await mongod.getConnectionString();
    await mongoose.connect(
      uri,
      { useNewUrlParser: true }
    );
  });

  // Disconnect from mongodb after all tests are completed
  afterAll(async () => {
    await mongoose.disconnect();
    mongod.stop();
  });

  beforeEach(() => {
    testServer.listen(PORT);
  });

  afterEach(() => {
    testServer.close();
  });

  //need to add tests to add checking for 0 character values

  describe('post routes', () => {
    describe('registration', () => {
      it('detects invalid password', async () => {
        const user = {
          username: 'Pikachu',
          password: 'p',
          email: 'pika@gmail.com'
        };
        const response = await request(server)
          .post('/api/register')
          .send(user);

        expect(response.status).toBe(400);
      });

      it('detects undefined password', async () => {
        const user = { username: 'Pikachu', email: 'pika@gmail.com' };
        const response = await request(server)
          .post('/api/register')
          .send(user);

        expect(response.status).toBe(400);
      });

      it('detects undefined username', async () => {
        const user = { password: 'pasdfsadfasdfsdf', email: 'pika@gmail.com' };
        const response = await request(server)
          .post('/api/register')
          .send(user);

        expect(response.status).toBe(400);
      });

      it('detects undefined username', async () => {
        const user = { username: 'Pikachu', password: 'pasdfsadfasdfsdf' };
        const response = await request(server)
          .post('/api/register')
          .send(user);

        expect(response.status).toBe(400);
      });

      it('rejects non-unique username', async () => {
        const user1 = {
          username: 'Pikachu',
          password: 'pasdfsadfasdfsdf',
          email: 'pika@gmail.com'
        };

        const user2 = {
          username: 'Pikachu',
          password: 'khlfahkldas',
          email: 'pika@me.com'
        };

        const response1 = await request(server)
          .post('/api/register')
          .send(user1);

        const response2 = await request(server)
          .post('/api/register')
          .send(user2);

        expect(response1.status).toBe(200);
        expect(response2.status).toBe(500);
      });

      it('rejects non-unique email', async () => {
        const user1 = {
          username: 'Frodo',
          password: 'pasdfsadfasdfsdf',
          email: 'lotr@gmail.com'
        };

        const user2 = {
          username: 'Gandalf',
          password: 'kljdaljkgsd',
          email: 'lotr@gmail.com'
        };

        const response1 = await request(server)
          .post('/api/register')
          .send(user1);

        const response2 = await request(server)
          .post('/api/register')
          .send(user2);

        expect(response1.status).toBe(200);
        expect(response2.status).toBe(500);
      });

      it('successfully creates new user', async () => {
        const user = {
          username: 'patrick',
          password: 'pasdfsadfasdfsdf',
          email: 'patrick@gmail.com'
        };

        const response = await request(server)
          .post('/api/register')
          .send(user);

        expect(response.status).toBe(200);
      });
    });

    describe('login', () => {
      it('authorization success', async () => {
        const user = { username: 'patrick', password: 'pasdfsadfasdfsdf' };
        const response = await request(server)
          .post('/api/login')
          .send(user);

        expect(response.status).toBe(200);
      });

      it('authorization fail', async () => {
        const user = { username: 'patrick', password: 'pasdfsadfassdf' };
        const response = await request(server)
          .post('/api/login')
          .send(user);

        expect(response.status).toBe(401);
      });
    });
  });
});
