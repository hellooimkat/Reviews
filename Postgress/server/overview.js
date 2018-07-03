const express = require('express');
const router = express.Router();
const db = require('./database');
const redis = require('./index');

router.get('/:id', (req, res) => {
  const { id } = req.params;
  
  const qHostelOverview = `SELECT 
  ratedFeatures 
  FROM comments WHERE hostelid = ${id};`;
  
  const qCommentsOverview = `SELECT
  c.created_at, c.rate, c.text,
  u.country, u.username, u.age, u.status
  FROM comments AS c
  INNER JOIN users AS u ON c.userid = u.userid
  WHERE c.hostelid = ${id}
  ORDER BY c.created_at DESC;`;
  
  db.connect((err, db, release) => {
    if (err) {
      return console.log('Error acquiring client', err.stack);
    }

    const hostelOverview = db.query(qHostelOverview);
    const commentsOverview = db.query(qCommentsOverview);
  
    Promise.all([hostelOverview, commentsOverview])
    .then( result => {
      release(); //releasing the client because it's finished with what it's had to do with the db
      let features = result[0].rows;
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
      
      let toReturn = {};
      toReturn['avgRating'] = avgRating;
      toReturn['totalReviewCount'] = result[0].rowCount;
      toReturn['ratedFeatures'] = [
        {feature: 'Value For Money', 
        rating: featuresArr[0]},
        {feature: 'Security', 
        rating: featuresArr[1]},
        {feature: 'Location', 
        rating: featuresArr[2]},
        {feature: 'Staff', 
        rating: featuresArr[3]},
        {feature: 'Atmosphere', 
        rating: featuresArr[4]},
        {feature: 'Cleanliness', 
        rating: featuresArr[5]},
        {feature: 'Facilities', 
        rating: featuresArr[6]},
      ];

      toReturn['reviews'] = [];
      const reviewResults = result[1].rows;
      for (let i = 0; i < 4; i++) {
        if (reviewResults[i]) {
          toReturn['reviews'].push({
              created_at: reviewResults[i]['created_at'],
              rate: reviewResults[i]['rate'],
              text: reviewResults[i]['text'],
              user: {
                username: reviewResults[i]['username'],
                age: reviewResults[i]['age'],
                status: reviewResults[i]['status'],
                country: reviewResults[i]['country'],
          }});
        }
      }
      toReturn['countryCount'] = {};
      const countryArr = result[1].rows;
      for (let i = 0; i < countryArr.length; i++) {
        if (!toReturn['countryCount'][countryArr[i].country]) {
          toReturn['countryCount'][countryArr[i].country] = 1;
        } else {
          toReturn['countryCount'][countryArr[i].country]++;
        }
      }
      res.status(200).send(toReturn);
    })
    .catch( err => console.log(err));
  });
});

module.exports = router;


/*
------------------HOSTELS OVERVIEW:
SELECT
totalReviewCount, avgRating, ratedFeatures
FROM hostels WHERE hostelid = 1;

Optimizations:
- index on (totalReviewCount, avgRating, ratedFeatures)
------------------COMMENTS OVERVIEW:
SELECT
c.created_at, c.rate, c.text,
u.country, u.username, u.age, u.status
FROM comments AS c
INNER JOIN users AS u ON c.userid = u.userid
WHERE c.hostelid = 1
ORDER BY c.created_at DESC
LIMIT 4;

Optimizations:
- 
------------------COUNTRIES OVERVIEW:
SELECT u.country FROM comments AS c
INNER JOIN users AS u ON c.userid = u.userid
WHERE hostelid = 1;

Optimizations:
- index on comments (hostelid)
- primary key users userid
*/