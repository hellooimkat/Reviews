const express = require('express');
const router = express.Router();
const db = require('./database');
const redis = require('./index');

router.get('/:id', (req, res) => {
  const { id } = req.params;
  
  const qCommentsOverview = `SELECT
  c.created_at, c.rate, c.text, c.ratedFeatures,
  u.country, u.username, u.age, u.status
  FROM comments AS c
  INNER JOIN users AS u ON c.userid = u.userid
  WHERE c.hostelid = ${id}
  ORDER BY c.created_at DESC;`;

  db.query(qCommentsOverview)
  .then( result => {
    let toReturn = {};
    toReturn['countryCount'] = {};
    let comments = result.rows;
    let featuresArr = [0,0,0,0,0,0,0];

    comments.forEach( (comment, commentindex) => {
      if (!toReturn['countryCount'][comments[commentindex].country]) {
        toReturn['countryCount'][comments[commentindex].country] = 1;
      } else {
        toReturn['countryCount'][comments[commentindex].country]++;
      }

      comment.ratedfeatures.forEach( (number, index) => {
        featuresArr[index] = featuresArr[index] + number;
        if (commentindex === comments.length - 1) {
          featuresArr[index] = Math.ceil(featuresArr[index] / comments.length);
        }
      });
    });
    let avgRating = featuresArr.reduce( (acc, curr) => {
      return acc + curr;
    });
    avgRating = Math.ceil(avgRating/7);
    
    toReturn['avgRating'] = avgRating;
    toReturn['totalReviewCount'] = result.rowCount;
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
    const reviewResults = result.rows;
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
    res.status(200).send(toReturn);
  })
  .catch( err => console.log(err));
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