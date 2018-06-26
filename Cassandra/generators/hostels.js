/* eslint-disable no-console */
const faker = require('faker');
const fs = require('fs');

const path = `${__dirname}/CSVs/hostels.txt`;
const wstream = fs.createWriteStream(path);
wstream.on('finish', () => {
  console.log('File has been written YAY');
});
wstream.on('error', (err) => {
  console.log('We errored :(', err);
});

// CREATE A CSV WITH 1,000 hostels
const createHostelsCSV = (number = 1000) => {
  let hostels = [];
  for (let i = 0; i <= number; i += 1) {
    const hostel = [];
    // hostelId
    hostel.push(i);
    // name
    hostel.push(faker.company.companyName());
    // avgRating int,

    // totalReviewCount int,
    // countryCount map <text, int>,
    // ratedFeatures map <text, int>,
    // PRIMARY KEY (hostelId)
  }
  hostels = hostels.join('\n');
  wstream.write(hostels);
  wstream.end();
};

createHostelsCSV();


// CSV TO TABLE
/*
COPY users (userId,userCreatedAt, firstname,
lastname, username, age, email,
status, country, numOfReviews)
FROM '/home/CSVs/users.txt';
*/
