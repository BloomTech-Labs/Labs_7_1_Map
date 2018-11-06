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
  beforeAll(async () => {
    // Connect to the mongodb before all tests are run
    const uri = await mongod.getConnectionString();
    await mongoose.connect(
      uri,
      { useNewUrlParser: true }
    );
  });

  afterAll(async () => {
    // Disconnect from mongodb after all tests are completed
    await mongoose.disconnect();
    mongod.stop();
  });

  let initialTestUser;

  // Save an initial test user
  const initialTestUserInfo = {
    username: 'initialTestUser',
    password: '123456',
    email: 'email@email.com'
  };

  beforeEach(async () => {
    testServer.listen(PORT);

    initialTestUser = await request(server)
      .post('/api/register')
      .send(initialTestUserInfo);
  });

  afterEach(async () => {
    // Clear test DB after each test
    const collections = await mongoose.connection.db.collections();

    for (let collection of collections) {
      await collection.remove();
    }
    testServer.close();
  });

  //need to add tests to add checking for 0 character values

  describe('POST routes', () => {
    describe('/register', () => {
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

      it('fails if password is not provided', async () => {
        const user = { username: 'Pikachu', email: 'pika@gmail.com' };
        const response = await request(server)
          .post('/api/register')
          .send(user);

        expect(response.status).toBe(400);
      });

      it('fails if password is not valid', async () => {
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

      it('fails if username is not provided', async () => {
        const user = { password: 'pasdfsadfasdfsdf', email: 'pika@gmail.com' };
        const response = await request(server)
          .post('/api/register')
          .send(user);

        expect(response.status).toBe(400);
      });

      it('fails if username is not unique', async () => {
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

      it('fails if email is not provided', async () => {
        const user = { username: 'Pikachu', password: 'pasdfsadfasdfsdf' };
        const response = await request(server)
          .post('/api/register')
          .send(user);

        expect(response.status).toBe(400);
      });

      it('fails if email is not unique', async () => {
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
    });

    describe('/login', () => {
      it('successfully logs in a user', async () => {
        const user = { username: 'initialTestUser', password: '123456' };
        const response = await request(server)
          .post('/api/login')
          .send(user);

        expect(response.status).toBe(200);
        expect(response.body.user).toBeDefined();
        expect(response.body.user.id).toBeDefined();
        expect(response.body.user.username).toBeDefined();
        expect(response.body.jwt_token).toBeDefined();
      });

      it('fails with incorrect credentials', async () => {
        const user = { username: 'patrick', password: 'pasdfsadfassdf' };
        const response = await request(server)
          .post('/api/login')
          .send(user);

        expect(response.status).toBe(401);
      });
    });

    describe('/country_status', () => {
      const new_country_status = {
        country_code: 'CHN',
        status_code: 1,
        name: 'China',
        username: 'initialTestUser'
      };

      it('successfully adds a new country if it does not exist', async () => {
        const { jwt_token, user } = initialTestUser.body;
        expect(jwt_token).toBeDefined();
        expect(user.username).toBe('initialTestUser');
        expect(user.id).toBeDefined();
        expect(user.countries.length).toBe(0);

        const response = await request(server)
          .post('/api/country_status')
          .set('Authorization', `Bearer ${jwt_token}`)
          .send(new_country_status);

        expect(response.body.countries.length).toBe(1);
        expect(response.body.countries[0]).toBeDefined();
        expect(response.body.countries[0].country_code).toBe('CHN');
        expect(response.body.countries[0].status_code).toBe(1);
        expect(response.body.countries[0].name).toBe('China');
      });

      it('successfully updates an existing country', async () => {
        const { jwt_token, user } = initialTestUser.body;
        expect(jwt_token).toBeDefined();
        expect(user.username).toBe('initialTestUser');
        expect(user.id).toBeDefined();
        expect(user.countries.length).toBe(0);

        const response_1 = await request(server)
          .post('/api/country_status')
          .set('Authorization', `Bearer ${jwt_token}`)
          .send(new_country_status);

        expect(response_1.body.countries.length).toBe(1);
        expect(response_1.body.countries[0].country_code).toBe('CHN');
        expect(response_1.body.countries[0].status_code).toBe(1);
        expect(response_1.body.countries[0].name).toBe('China');

        const update_country_status = {
          country_code: 'CHN',
          status_code: 2,
          name: 'China',
          username: 'initialTestUser'
        };

        const response_2 = await request(server)
          .post('/api/country_status')
          .set('Authorization', `Bearer ${jwt_token}`)
          .send(update_country_status);

        expect(response_2.body.countries.length).toBe(1);
        expect(response_2.body.countries[0].country_code).toBe('CHN');
        expect(response_2.body.countries[0].status_code).toBe(2);
        expect(response_2.body.countries[0].name).toBe('China');
      });

      it('fails if no token is provided', async () => {
        const response = await request(server)
          .post('/api/country_status')
          .send(new_country_status);

        expect(response.status).toBe(401);
        expect(response.body.username).toBeUndefined();
        expect(response.body.countries).toBeUndefined();
      });

      it('fails if invalid token is provided', async () => {
        const jwt_token = initialTestUser.body.jwt_token
          .split('')
          .reverse()
          .join('');

        const response = await request(server)
          .post('/api/country_status')
          .send(new_country_status)
          .set('Authorization', `Bearer ${jwt_token}`);

        expect(response.status).toBe(401);
        expect(response.body.username).toBeUndefined();
        expect(response.body.countries).toBeUndefined();
      });
    });

    describe('/api/country_notes', () => {
      const new_country_status = {
        country_code: 'CHN',
        status_code: 1,
        name: 'China'
      };

      beforeEach(async () => {
        const { jwt_token } = initialTestUser.body;
        const response = await request(server)
          .post('/api/country_status')
          .set('Authorization', `Bearer ${jwt_token}`)
          .send(new_country_status);
      });

      it('successfully updates notes for a country', async () => {
        const { jwt_token } = initialTestUser.body;

        const updateNote = await request(server)
          .post('/api/country_notes')
          .set('Authorization', `Bearer ${jwt_token}`)
          .send({
            country_code: 'CHN',
            name: 'China',
            notes: 'New note contents'
          });

        expect(updateNote.status).toBe(200);
        expect(updateNote.body.countries[0].notes).toEqual('New note contents');
      });

      it('fails if no token is provided', async () => {
        const { jwt_token } = initialTestUser.body;

        const updateNote = await request(server)
          .post('/api/country_notes')
          .send({
            country_code: 'CHN',
            name: 'China',
            notes: 'This should not get saved'
          });

        expect(updateNote.status).toBe(401);
      });
    });

    describe('/api/country_scratched', () => {
      const new_scratched_status = {
        country_code: 'CHN',
        status_code: 0,
        name: 'China'
      };

      beforeEach(async () => {
        const { jwt_token } = initialTestUser.body;
        const response = await request(server)
          .post('/api/country_status')
          .set('Authorization', `Bearer ${jwt_token}`)
          .send(new_scratched_status);
      });

      it('successfully updates scratched status for an existing country', async () => {
        const { jwt_token } = initialTestUser.body;

        const updateNote = await request(server)
          .post('/api/country_scratched')
          .set('Authorization', `Bearer ${jwt_token}`)
          .send({
            country_code: 'CHN',
            name: 'China',
            scratched: true
          });

        expect(updateNote.status).toBe(200);
        expect(updateNote.body.countries[0].scratched).toBe(true);

      })
    })
  });

  describe('GET routes', () => {
    describe('/get_user', () => {
      it('successfully gets a user', async () => {
        const testUserInfo = {
          username: 'getuser1',
          password: '123456',
          email: 'getuser1@test.com'
        };
        const newUser = await request(server)
          .post('/api/register')
          .send(testUserInfo);
        const { jwt_token, user } = newUser.body;

        const getUser = await request(server)
          .get(`/api/get_user/${user.id}`)
          .set('Authorization', `Bearer ${jwt_token}`);

        expect(newUser).toBeDefined();
        expect(jwt_token).toBeDefined();
        expect(getUser.body._id).toBe(user.id);
        expect(getUser.body.countries).toBeDefined();
        expect(getUser.body.preferences).toBeDefined();
        expect(getUser.body.username).toBe('getuser1');
        expect(getUser.body.email).toBe('getuser1@test.com');
      });

      it('fails if no token is provided', async () => {
        const testUserInfo = {
          username: 'getuser2',
          password: '123456',
          email: 'getuser2@test.com'
        };
        const newUser = await request(server)
          .post('/api/register')
          .send(testUserInfo);
        const { jwt_token, user } = newUser.body;

        const getUser = await request(server).get(`/api/get_user/${user._id}`);

        expect(newUser).toBeDefined();
        expect(jwt_token).toBeDefined();
        expect(getUser.status).toBe(401);
        expect(getUser.body._id).toBeUndefined();
        expect(getUser.body.username).toBeUndefined();
        expect(getUser.body.email).toBeUndefined();
      });

      it('fails if invalid token is provided', async () => {
        const testUserInfo = {
          username: 'getuser3',
          password: '123456',
          email: 'getuser3@test.com'
        };
        const newUser = await request(server)
          .post('/api/register')
          .send(testUserInfo);
        const { jwt_token, user } = newUser.body;

        const getUser = await request(server)
          .get(`/api/get_user/${user._id}`)
          .set('Authorization', `Bearer ${jwt_token.slice(1)}`);

        expect(newUser).toBeDefined();
        expect(jwt_token).toBeDefined();
        expect(getUser.status).toBe(401);
        expect(getUser.body._id).toBeUndefined();
        expect(getUser.body.username).toBeUndefined();
        expect(getUser.body.email).toBeUndefined();
      });
    });
  });

  describe('PUT routes', () => {
    describe('/change_email', () => {
      const body = {
        new_email: 'newEmail@email.com'
      };

      it('successfully updates email', async () => {
        const { jwt_token } = initialTestUser.body;

        const response = await request(server)
          .put('/api/change_email')
          .set('Authorization', `Bearer ${jwt_token}`)
          .send(body);

        expect(response.status).toBe(200);
        expect(response.body.message).toEqual(
          'Email was updated successfully!'
        );
      });

      it('fails if no token is provided', async () => {
        const { jwt_token } = initialTestUser.body;

        const response = await request(server)
          .put('/api/change_email')
          .send(body);

        expect(response.status).toBe(401);
        expect(response.error).toBeDefined();
      });

      it('fails if invalid token is provided', async () => {
        const jwt_token = initialTestUser.body.jwt_token
          .split('')
          .reverse()
          .join('');

        const response = await request(server)
          .put('/api/change_email')
          .set('Authorization', `Bearer ${jwt_token}`)
          .send(body);

        expect(response.status).toBe(401);
        expect(response.error).toBeDefined();
      });
    });

    describe('/change_password', () => {
      const body = {
        new_password: '654321'
      };
      it('successfully updates password', async () => {
        const { jwt_token } = initialTestUser.body;
        const response = await request(server)
          .put('/api/change_password')
          .set('Authorization', `Bearer ${jwt_token}`)
          .send(body);

        expect(response.status).toBe(200);
        expect(body.new_password).toEqual('654321');
      });

      it('fails if no token is provided', async () => {
        const response = await request(server)
          .put('/api/change_password')
          .send({ new_password: initialTestUserInfo.password });

        expect(response.status).toBe(401);
        expect(response.error).toBeDefined();
      });

      it('fails if invalid token is provided', async () => {
        const jwt_token = initialTestUser.body.jwt_token
          .split('')
          .reverse()
          .join('');

        const response = await request(server)
          .put('/api/change_password')
          .set('Authorization', `Bearer ${jwt_token}`)
          .send(body);

        expect(response.status).toBe(401);
        expect(response.error).toBeDefined();
      });

      it('fails if new password is the same as the old', async () => {
        const { jwt_token } = initialTestUser.body;
        const response = await request(server)
          .put('/api/change_password')
          .set('Authorization', `Bearer ${jwt_token}`)
          .send({ new_password: initialTestUserInfo.password });

        expect(response.status).toBe(400);
        expect(response.body.error).toEqual(
          'New password is the same as the old!'
        );
      });
    });

    describe('/update_preferences', () => {
      it('successfully updates preferences', async () => {
        const updatedPreferences = {
          preferences: {
            theme: 'light',
            autoscratch: false
          }
        };

        const response = await request(server)
          .put(`/api/update_preferences`)
          .set('Authorization', `Bearer ${initialTestUser.body.jwt_token}`)
          .send(updatedPreferences);

        expect(response.status).toBe(200);
        expect(response.body.username).toBeDefined();
        expect(response.body.preferences.theme).toBe('light');
        expect(response.body.preferences.autoscratch).toBe(false);
      });

      it('fails if no token is provided', async () => {
        const updatedPreferences = {
          preferences: {
            theme: 'light',
            autoscratch: false
          }
        };

        const response = await request(server)
          .put(`/api/update_preferences`)
          .send(updatedPreferences);

        expect(response.status).toBe(401);
        expect(response.body.username).toBeUndefined();
        expect(response.body.preferences).toBeUndefined();
      });

      it('fails if invalid token is provided', async () => {
        const invalid_token = initialTestUser.body.jwt_token.slice(1);
        const updatedPreferences = {
          preferences: {
            theme: 'light',
            autoscratch: false
          }
        };

        const response = await request(server)
          .put(`/api/update_preferences`)
          .set('Authorization', `Bearer ${invalid_token}`)
          .send(updatedPreferences);

        expect(response.status).toBe(401);
        expect(response.body.username).toBeUndefined();
        expect(response.body.preferences).toBeUndefined();
      });

      it('fails if preferences is not provided', async () => {
        const response = await request(server)
          .put(`/api/update_preferences`)
          .set('Authorization', `Bearer ${initialTestUser.body.jwt_token}`)
          .send({});

        expect(response.status).toBe(400);
        expect(response.body.username).toBeUndefined();
        expect(response.body.preferences).toBeUndefined();
      });
    });
  });
});
