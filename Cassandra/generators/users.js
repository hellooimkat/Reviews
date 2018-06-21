const faker = require('faker');
const fs = require('fs');
const uuidv4 = require('uuid/v4');
const countries = require('./countries.js');

const userIDs = [];

let path = `${__dirname}/CSVs/users.txt`;
let wstream = fs.createWriteStream(path);
wstream.on('finish', () => {
  console.log('File has been written YAY');
});
wstream.on('error', (err) => {
  console.log('We errored :(', err);
});

const createUsersCSV = ((number = 1000000) => {
  let users = [];
  for (let i = 0; i < number; i += 1) {
    const user = [];
    // userId
    const id = uuidv4();
    user.push(id);
    userIDs.push(id);
    // userCreatedAt
    const date = new Date(faker.date.between('2000-01-01', '2018-01-01'));
    user.push(date.toISOString());
    // firstname
    user.push(faker.name.firstName());
    // lastname
    user.push(faker.name.lastName());
    // username
    user.push(faker.internet.userName());
    // age
    user.push(18 + Math.floor(Math.random() * 40));
    // email
    user.push(faker.internet.email());
    // status
    user.push(faker.random.arrayElement([
      'Female',
      'Male',
      'Mixed Group',
      'Couple',
    ]));
    // country
    user.push(countries[Math.floor(Math.random() * countries.length)]);
    // numOfReviews
    user.push(Math.floor(Math.random() * 200));
    users.push(user);
  }
  users = users.join('\n');
  wstream.write(users);
  wstream.end();
})();


path = `${__dirname}/CSVs/userIDs.txt`;
wstream = fs.createWriteStream(path);
wstream.write(userIDs.join(','));


// CSV TO TABLE     COPY users (userId,userCreatedAt, firstname, lastname, username, age, email, status, country, numOfReviews) FROM '/home/CSVs/users.txt';

// DOCKER FOLDER /home/CSVs/userIDs.txt
