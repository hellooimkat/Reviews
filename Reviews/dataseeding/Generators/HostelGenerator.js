const mongoose = require('mongoose');
const faker = require('faker');
const { MONGO_URI } = require('../../config');
// load User model
const Hostel = require('../Schema/Hostel');
const featureBank = require('./ratingFeatureHelper');

let rawHostels;

const getFeatureRatingsArray = () => {
  const ans = [];
  featureBank.forEach(({ feature, featureId }) => {
    const rating =
      Math.random() > 0.45 ? Math.floor(Math.random() * 3) + 8 : Math.floor(Math.random() * 5) + 6;
    ans.push({ feature, featureId, rating });
  });
  return ans;
};

const getAvgRating = (arrOfRatings) => {
  let sum = 0;
  arrOfRatings.forEach((each) => {
    sum += each.rating;
  });
  return Math.round((sum / arrOfRatings.length) * 10) / 10;
};

const getArrayOfHostels = (size = 100) => {
  const ans = [];

  for (let i = 0; i < size; i++) {
    const hostel = {};
    hostel.id = i+1;
    hostel.name = faker.random.arrayElement([
      faker.company.companyName(),
      faker.address.county(),
      faker.address.streetSuffix(),
      faker.name.findName(),
    ]);
    hostel.created_at = new Date(faker.date.between('1990-01-01', '2016-01-01'));
    hostel.ratedFeatures = getFeatureRatingsArray();

    hostel.avgRating = getAvgRating(hostel.ratedFeatures);
    hostel.reviews = [];

    ans.push(hostel);
  }

  return ans;
};

async function generateHostelData(rawData) {
  try {
    const db = await mongoose.connect(MONGO_URI);
    console.log('Connect to DB');

    // Remove all Hostel collection
    await Hostel.remove({});
    console.log('Removed all old hostel collections');

    // Add new hostels to database
    const allNewHostelPromises = [];
    rawData.forEach((rawHostel) => {
      allNewHostelPromises.push(new Hostel(rawHostel).save());
    });
    await Promise.all(allNewHostelPromises);
    console.log('Added new hostels successfully');

    // Disconnect database
    await db.disconnect();
    console.log('Db disconnected');
  } catch (error) {
    console.log('ERROR', error);
  }
}

module.exports = function generateHostels(numOfHostels) {
  return new Promise(async (resolve, reject) => {
    try {
      rawHostels = getArrayOfHostels(numOfHostels);
      await generateHostelData(rawHostels);
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};
