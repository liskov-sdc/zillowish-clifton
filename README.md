# Zillowish-Facts-Features

Related Projects:

http://github.com/zillowish-sadie

http://github.com/zillowish-jessica


To start this repo:

Installing Dependencies:

From the root directory, run the following:

`npm install`
`npm run build`
`npm run start`

Note the npm run start command will put 10 Million records into the postgres database by default if not already there remove the second part of the command if this is not wanted.

config.js file must have the following key value pairs exported:
module.exports = {username, password, database, host};
host/password should be set to an environmental variable or 'localhost' in the absense of one.

To choose your Database (MySQL, Postgres, MongoDB):

Note the default is automatically set in database/index.js and the start/10-M/seed script commands in package.json.

Set the node DB environmental variable to the following:

mysql for MySQL
postgres for Postgres(Default)
mongo for Mongo

You can do so in Docker or modifying the default environmental variable in the database/index.js file or change the start/10-M/seed script commands.

To Seed the Databse:

`npm run db-seed`

This will create 100 seeds into the database.



## CRUD API

### Get All House Feature Records with Pagination of 100

Use the GET endpoint at /house/all with a ?page query variable for different pages of 100 each.

### Get Single House Feature Record
Use the GET endpoint at /house/:id where id is the house_id you want.

### Post New House Feature Record
Use the POST endpoint at /house/ and send all the proper data in a JSON object on the features value pair such as the following:

`
{"features": {
        "type": "Single Family",
        "year_built": 1909,
        "heating": "No Data",
        "cooling": "Central",
        "parking": "None",
        "lot": 1804,
        "days_on_zillow": 93,
        "bedrooms": 2,
        "bathrooms": 1,
        "interiorheating": "Speeder air",
        "interiorcooling": "A/C",
        "appliances": "Dryer",
        "kitchen": "Counter",
        "flooring": "2237",
        "sqft": 1775
    }
}
`

### Update House Feature Record
Use the PUT endpoint at /house/:id where id is the house_id you want and send all the proper data you want updated in a JSON object on the features value pair such as the following:

PUT to /house/1
`
{ "features" : {
        "type": "Multi Family"
	}
}
`


## SDC Engineering Journal and Notes

### Database Benchmarking

Which two DBMS did you test?
SQL: POSTGRE & MySQL
noSQL: MONGODB

MYSQL:

This is what happened when I tried to load 10M records without any optimizations.
FATAL ERROR: Ineffective mark-compacts near heap limit Allocation failed - JavaScript heap out of memory

I realized I needed to take up less memory as my for loop was holding all the data I was inserting in my RAM.

- First, I utilized two functions with an async promise then call structure on the function that would call the DB Helper function to do a large batch insert, that way the objects I was creating for insert into the DB would be out of scope and V8 could do garbage collection on them.

- Afterwards I decided I should have multiple function calls simultaneiously so I rewrote the function to have 5 recursive calls going at once, this brought my time for 10M records down to the 6.7 minute range as having multiple instances allowed Javascript to be working on creating more random data for the next DB batch insert while waiting for the DB to call back, therefore it was always inserting something or generating data.

-Next, I increased the number of inserts hapening per batch up to 31,250.

-Finally I refactored sending in the same static data of 31,250 rows for each insert rather than randomizing and creating it each time.  All of these optimizations allowed me to bring down my time from 67 minutes to 5.7 minutes on MySQL.

POSTGRES:

I was able to update the Database calls to Postgres via switching an environmental variable.  On Postgres using Sequelize I was able to get the 10 Million records inserted into the database in 5.6 minutes slightly faster than MySQL but not by much.

MONGODB:

Mongo I had an issue with as I needed to auto increment the house_id's myself and could not simultaneously run inserts due to that as the incrementing may mess up.  I needed the house_id's as that would correspond

### Performance notes.
[TODO]
### Stress Testing
[TODO]
### Other Notes

I noticed something interesting with undefined, I had thought that setting a key to undefined would remove the key from the object and had done so on the house_id field for my insert CRUD operations as a way to sanitize the data comming in as I dont trust the user.  I found out later that undefined does not actually remove the key on the object through some testing of Object.keys and in fact to do this I would need to use the delete keyword on the key.

