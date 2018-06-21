const mongoose = require('mongoose');
const faker = require('faker');
const { MONGO_URI } = require('../../config');
const User = require('../Schema/User');

let rawUsers;
const getArrayOfUsers = (size = 50) => {
  const ans = [];
  const countryBank = [
    'USA',
    'China',
    'Spain',
    'Australia',
    'Chile',
    'Thailand',
    'Belarus',
    'Canada',
    'South Africa',
    'Vietnam',
    'Kazakhstan',
    'Japan',
    'Kenya',
    'Mexico',
    'Iran'
  ];

  for (let i = 0; i < size; i++) {
    const user = {};
    user.first_name = faker.name.firstName();
    user.last_name = faker.name.lastName();
    user.avatar = faker.image.avatar();
    user.username = faker.internet.userName();
    user.age = 18 + Math.floor(Math.random() * 40);
    user.email = faker.internet.email();
    user.status = faker.random.arrayElement([
      'Female',
      'Male',
      'Mixed Group',
      'Couple'
    ]);
    user.created_at = new Date(faker.date.between('2000-01-01', '2018-01-01'));
    user.country = countryBank[Math.floor(Math.random() * countryBank.length)];
    ans.push(user);
  }

  return ans;
};

async function generateUserDb(rawData) {
  console.log('HERE');
  try {
    const db = await mongoose.connect(MONGO_URI);
    console.log('Connected to DB');

    // RESET USER COLLECTION
    await User.remove({});
    console.log('Removed all User collections');

    // ADDED NEW USERS TO DATABASE
    const allPromises = [];
    rawData.forEach(rawUser => {
      const newUser = new User(rawUser);
      allPromises.push(newUser.save());
    });

    await Promise.all(allPromises);
    console.log('Added new users to database');

    // DISCONNECT DB
    await db.disconnect();
    console.log('Database disconnected successfully');
  } catch (error) {
    console.log('ERROR', error);
  }
}

module.exports = function generateUsers(numOfUsers) {
  return new Promise(async (resolve, reject) => {
    try {
      rawUsers = getArrayOfUsers(numOfUsers);
      await generateUserDb(rawUsers);
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};
