const generateUsers = require('./UserGenerator');
const generateHostels = require('./HostelGenerator');
const generateReviews = require('./ReviewGenerator');

const NUM_OF_USERS = 500;
const NUM_OF_HOSTELS = 100;
const NUM_OF_REVIEWS = 10000;

console.log('DATABASE SEEDING...\n');
console.log('TRYING TO SEED NEW USERS\n');
generateUsers(NUM_OF_USERS)
  .then(() => {
    console.log('\nSUCCESSFULLY SEEDED NEW USERS');
    console.log('------------------------');
    console.log('TRYING TO SEED NEW HOSTELS\n');
    return generateHostels(NUM_OF_HOSTELS);
  })
  .then(() => {
    console.log('\nSUCCESSFULLY SEEDED NEW HOSTELS');
    console.log('------------------------');
    console.log('TRYING TO SEED NEW REVIEWS\n');
    return generateReviews(NUM_OF_REVIEWS);
  })
  .then(() => console.log('\nSUCCESSFULLY SEEDED NEW REVIEWS'));
