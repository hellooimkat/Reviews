const pgp = require('pg-promise')();
const ps = require('pg-promise').PreparedStatement;
const faker = require('faker');
const fs = require('fs');

const path = `${__dirname}/CSVs/hostels.txt`;

const cn = {
    host: 'localhost',
    port: 5432,
    database: 'postgres',
    user: 'postgres',
    password: 'password'
};
const db = pgp(cn); 

// select and return user name from id:
async function createHostelCSV() {
  let hostels = [];
  for (let i = 0; i <= 10000000; i++) {
    let hostel = [];
    //hostelid
    hostel.push(i);
    //name
    hostel.push(faker.company.companyName());
    //avg ratedfeatures, rating, totalreviewcount, engreviewcount, othreviewcount, countrycount
    const qFeatures = new ps('find-features', "SELECT ratedfeatures FROM comments WHERE hostelid = $1", [i]);
    const qTotalReviewCount = new ps('find-total',"SELECT count(1) FROM comments WHERE hostelid = $1", [i]);
    const qEngReviewCount = new ps('find-eng',"SELECT count(1) FROM comments WHERE language ='ENG' and hostelid = $1", [i]);
    const qOthReviewCount = new ps('find-oth',"SELECT count(1) FROM comments WHERE language ='OTH' and hostelid = $1", [i]);
    const qCountries = new ps('find-countries', "SELECT users.country FROM comments INNER JOIN users ON comments.userid = users.userid WHERE comments.hostelid = $1", [i]);

    const features = await db.many(qFeatures);
    const totalReviewCount = await db.one(qTotalReviewCount);
    const engReviewCount = await db.one(qEngReviewCount);
    const othReviewCount = await db.one(qOthReviewCount);

    //getting the average rating for each feature for all comments in the listing
    let featuresArr = [0,0,0,0,0,0,0];
    features.forEach( (rating, ratingindex) => {
      rating.ratedfeatures.forEach( (number, index) => {
        featuresArr[index] = featuresArr[index] + number;
        if (ratingindex === features.length - 1) {
          featuresArr[index] = Math.ceil(featuresArr[index] / features.length);
        }
      });
    });
    let avgRating = featuresArr.reduce( (acc, curr) => {
      return acc + curr;
    });
    avgRating = Math.ceil(avgRating/7);

    hostel.push(avgRating, JSON.stringify('{' + featuresArr.join() +'}'), totalReviewCount.count, engReviewCount.count, othReviewCount.count);

    hostel = hostel.join('|');
    hostels.push([hostel]);

    if (i % 1000 === 0) {
      if (i === 0) {
        hostels = hostels.join('\n');
      } else {
        hostels = '\n' + hostels.join('\n');
      }
      fs.appendFileSync(path, hostels);
      hostels = [];
      console.log(i)
    }
  }
}

createHostelCSV();