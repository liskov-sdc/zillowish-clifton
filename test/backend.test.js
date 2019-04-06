const {Client } = require('pg')
const request = require('supertest');
const app = require('../server/app');
const config = require('./config');
const loadedApp = request(app);

const client = new Client({
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.database,
  port: config.port
});

beforeAll(async () => {
  await client.connect();
  await setTimeout(()=>{return}, 1000);
  return;
});

afterAll(() => {
  client.end();
  return;
});

describe('Testing Server Routes', () => {

 describe('Testing Express Static', () => {
    test('It should respond to a GET request with status code 200', async () => {
        const response = await loadedApp.get('/');
        expect(response.statusCode).toBe(200);
    });
  });


  describe('Testing Routes', () => {
    test('It should respond with 100 records on the /house/all route', async () => {
      const response = await loadedApp.get('/house/all');
      expect(response.body.length).toBeGreaterThan(90);
    });


    test('It should recieve a single house with the proper data shape', async () => {
      const response = await loadedApp.get('/house/1');
      expect(response.body[0].house_id).toBe(1);
      expect(response.body[0]).toHaveProperty('type');
      expect(response.body[0]).toHaveProperty('year_built');
      expect(response.body[0]).toHaveProperty('heating');
      expect(response.body[0]).toHaveProperty('cooling');
      expect(response.body[0]).toHaveProperty('parking');
      expect(response.body[0]).toHaveProperty('lot');
      expect(response.body[0]).toHaveProperty('days_on_zillow');
      expect(response.body[0]).toHaveProperty('bedrooms');
      expect(response.body[0]).toHaveProperty('bathrooms');
      expect(response.body[0]).toHaveProperty('interiorheating');
      expect(response.body[0]).toHaveProperty('interiorcooling');
      expect(response.body[0]).toHaveProperty('appliances');
      expect(response.body[0]).toHaveProperty('kitchen');
      expect(response.body[0]).toHaveProperty('flooring');
      expect(response.body[0]).toHaveProperty('sqft');
    });
  });
});



describe('Testing Database', () => {

  test('features table should have correct data fields', async (done) => {
    await client.query('SELECT * FROM features LIMIT 2', (err, results) => {
      expect(results.rows[0]).toHaveProperty('house_id');
      expect(results.rows[0]).toHaveProperty('type');
      expect(results.rows[0]).toHaveProperty('year_built');
      expect(results.rows[0]).toHaveProperty('heating');
      expect(results.rows[0]).toHaveProperty('cooling');
      expect(results.rows[0]).toHaveProperty('parking');
      expect(results.rows[0]).toHaveProperty('lot');
      expect(results.rows[0]).toHaveProperty('days_on_zillow');
      expect(results.rows[0]).toHaveProperty('bedrooms');
      expect(results.rows[0]).toHaveProperty('bathrooms');
      expect(results.rows[0]).toHaveProperty('interiorheating');
      expect(results.rows[0]).toHaveProperty('interiorcooling');
      expect(results.rows[0]).toHaveProperty('appliances');
      expect(results.rows[0]).toHaveProperty('kitchen');
      expect(results.rows[0]).toHaveProperty('flooring');
      expect(results.rows[0]).toHaveProperty('sqft');
      done();
    });

  });

  test("features table should have over 100 records in the features table", async (done) => {
    await client.query('SELECT * from features limit 100;', (err, results) => {
      expect(results.rows.length).toBeGreaterThan(99);
      done();
    });
  })

});