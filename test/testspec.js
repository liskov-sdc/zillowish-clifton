const mysql = require('mysql');
const db = require('../database/index');
const expect = require('chai').expect
const chaiHttp = require('chai-http');
const server = require('../server/server');
const config = require('../test/config');


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'zillow'
});



describe('Testing Database', () => {
  it('should have the correct data', function (){
    connection.query('SELECT * from features limit 2', (err, results, field) => {
      console.log(results[0].type)
      expect(results[0].id).to.equal(13);
      expect(results[0].type).to.be.a('string');
    });
    
  });
});