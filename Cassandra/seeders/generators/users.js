const faker = require ('faker');
const countries = require('./countries.js');

const createUsersCSV = (number = 50) => {
  const users = [];
  for (let i = 0; i < number; i+=1) {
    user.first_name = faker.name.firstName();
    user.last_name = faker.name.lastName();
    user.username = faker.internet.userName();
    user.age = 18 + Math.floor(Math.random() * 40);
    user.email = faker.internet.email();
    user.status = faker.random.arrayElement([
      'Female',
      'Male',
      'Mixed Group',
      'Couple'
    ]);
    user.country = countries[Math.floor(Math.random() * countryBank.length)];
    users.push(user);
  }
  return users;
}