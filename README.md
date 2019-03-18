# Zillowish-Facts-Features
clifton's portion

Related Projects:

http://github.com/zillowish-sadie

http://github.com/zillowish-jessica


To start this repo:

Installing Dependencies:

From the root directory, run the following:

`npm install`
`npm run build`
`npm run start`

To Seed the Databse:

`npm run db-seed`

This will create 100 seeds into the mysql database.

##SDC Engineering Journal and Notes

###Database Benchmarking

Which two DBMS did you test?
SQL: POSTGRE & MySQL
noSQL: MONGODB

This is what happened when I tried to load 10M records without any optimizations.
FATAL ERROR: Ineffective mark-compacts near heap limit Allocation failed - JavaScript heap out of memory

I realized I needed to take up less memory as my for loop was holding all the data I was inserting in my RAM.

- First, I utilized two functions with an async promise then call structure on the function that would call the DB Helper function to do a large batch insert, that way the objects I was creating for insert into the DB would be out of scope and V8 could do garbage collection on them.

- Afterwards I decided I should have multiple function calls simultaneiously so I rewrote the function to have 5 recursive calls going at once, this brought my time for 10M records down to the 6.7 minute range as having multiple instances allowed Javascript to be working on creating more random data for the next DB batch insert while waiting for the DB to call back, therefore it was always inserting something or generating data.

-Next, I increased the number of inserts hapening per batch up to 31,250.

-Finally I refactored sending in the same static data of 31,250 rows for each insert rather than randomizing and creating it each time.  All of these optimizations allowed me to bring down my time from 67 minutes to 5.7 minutes on mySQL.

###Performance notes.
[TODO]
###Stress Testing
[TODO]
###Other Notes
[TODO]

