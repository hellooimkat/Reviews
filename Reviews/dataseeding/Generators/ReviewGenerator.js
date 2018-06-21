const mongoose = require('mongoose');
const { MONGO_URI } = require('../../config');
const faker = require('faker');
const Review = require('../Schema/Review');
const Hostel = require('../Schema/Hostel');
const User = require('../Schema/User');

let rawReviews;

const getArrayOfRawReviews = (size = 1000) => {
  const ans = [];

  for (let i = 0; i < size; i++) {
    const review = {};
    review.text = faker.lorem.paragraphs(
      faker.random.number({ min: 1, max: 2 }),
      '\n \r'
    );
    // review.rate = Math.round(7 + Math.random() * 3 * 10) / 10;
    review.rate = Math.round((7 + Math.random() * 3) * 10) / 10;
    review.language = faker.random.arrayElement([
      'ENG',
      'ENG',
      'ENG',
      'ENG',
      'OTH'
    ]);
    review.created_at = faker.date.between('2016-01-01', '2018-01-01');
    review.propertyResponse =
      Math.random() < 0.4
        ? null
        : faker.lorem.sentences(faker.random.number({ min: 1, max: 2 }));
    ans.push(review);
  }

  return ans;
};

const generateReviewData = async rawData => {
  try {
    const db = await mongoose.connect(MONGO_URI);
    console.log('Connected to database');

    // RESET REVIEW COLLECTION
    await Review.remove({});
    console.log('Removed all Review collections');

    // ADD NEW REVIEWS TO DATABASE
    let allPromises = [];

    // attach a hostel id into review
    const hotelDocuments = await Hostel.find({});
    const userDocuments = await User.find({});

    const updatedRawData = rawData.map(eachReview => {
      const updatedReview = Object.assign({}, eachReview);
      const hostelIdObj =
        hotelDocuments[Math.floor(Math.random() * hotelDocuments.length)]._id;
      updatedReview.hostel = hostelIdObj;
      const userIdObj =
        userDocuments[Math.floor(Math.random() * userDocuments.length)]._id;
      updatedReview.user = userIdObj;
      return updatedReview;
    });

    updatedRawData.forEach(rawReview => {
      const newReview = new Review(rawReview);
      allPromises.push(newReview.save());
    });
    const allNewReviews = await Promise.all(allPromises);
    console.log('Added new reviews to database');

    const allUserPromises = [];
    const allHostelPromises = [];
    allNewReviews.forEach(newReview => {
      const userId = newReview.user.toString();
      allUserPromises.push(User.findById(userId));

      const hostelId = newReview.hostel.toString();
      allHostelPromises.push(Hostel.findById(hostelId));
    });

    const allUsers = await Promise.all(allUserPromises);
    allPromises = [];
    allUsers.forEach((userDoc, index) => {
      userDoc.reviews.push(allNewReviews[index]._id);
      allPromises.push(userDoc.save());
    });
    await Promise.all(allPromises);
    console.log('Users have been updated with reviews');

    const allHostels = await Promise.all(allHostelPromises);
    allPromises = [];
    allHostels.forEach((hostelDoc, index) => {
      hostelDoc.reviews.push(allNewReviews[index]._id);
      allPromises.push(hostelDoc.save());
    });
    await Promise.all(allPromises);
    console.log('Hostels have been updated with reviews');

    // DISCONNECT DATABASE
    await db.disconnect();
    console.log('Database disconnected');
  } catch (error) {
    console.log('ERROR', error);
  }
};

module.exports = function generateReviews(numOfReviews) {
  return new Promise(async (resolve, reject) => {
    try {
      rawReviews = getArrayOfRawReviews(numOfReviews);
      await generateReviewData(rawReviews);
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};
