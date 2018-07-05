const express = require('express');
const router = express.Router();
const db = require('./database');
const redis = require('./index');

// /api/get/reviews/overview/%{*:9000000-10000000}

router.get('/:id', (req, res) => {
  const { id } = req.params;
  
  const qCommentsOverview = `SELECT
  c.created_at, c.rate, c.text, c.ratedFeatures,
  u.country, u.username, u.age, u.status
  FROM comments AS c
  INNER JOIN users AS u ON c.userid = u.userid
  WHERE c.hostelid = ${id}
  ORDER BY c.created_at DESC;`;

  const start = Date.now();
  db.query(qCommentsOverview)
  .then( result => {
    console.log('QUERY FINISHED', Date.now() - start);
    let toReturn = {};
    toReturn['countryCount'] = {};
    toReturn['reviews'] = [];

    let comments = result.rows;
    let featuresArr = [0,0,0,0,0,0,0];

    comments.forEach( (comment, cIndex) => {
      if (!toReturn['countryCount'][comments[cIndex].country]) {
        toReturn['countryCount'][comments[cIndex].country] = 1;
      } else {
        toReturn['countryCount'][comments[cIndex].country]++;
      }

      if (cIndex < 4) {
        toReturn['reviews'].push({
          created_at: comments[cIndex]['created_at'],
          rate: comments[cIndex]['rate'],
          text: comments[cIndex]['text'],
          user: {
            username: comments[cIndex]['username'],
            age: comments[cIndex]['age'],
            status: comments[cIndex]['status'],
            country: comments[cIndex]['country'],
        }});
      }
      comment.ratedfeatures.forEach( (number, index) => {
        featuresArr[index] = featuresArr[index] + number;
        if (cIndex === comments.length - 1) {
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
    console.log('CALCS DONE', Date.now() - start);
    res.status(200).send(toReturn);
  })
  .catch( () => res.status(500));
});

module.exports = router;