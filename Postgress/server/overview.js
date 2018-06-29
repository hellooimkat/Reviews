const { Pool } = require('pg');
const express = require('express');
const router = express.Router();

const cn = {
  host: 'localhost',
  port: 5432,
  database: 'postgres',
  user: 'postgres',
  password: 'password'
};
const db = new Pool(cn); 

router.get('/:id', (req, res) => {
  const { id } = req.params;

  const qHostelOverview = `SELECT 
  totalReviewCount, avgRating, ratedFeatures 
  FROM hostels WHERE hostelid = ${id};`;

  const qCommentsOverview = `SELECT
  c.created_at, c.rate, c.text,
  u.country, u.username, u.age, u.status
  FROM comments AS c
  INNER JOIN users AS u ON c.userid = u.userid
  WHERE c.hostelid = ${id}
  ORDER BY c.created_at DESC
  LIMIT 4;`;

  const qCountries = `SELECT u.country FROM comments AS c 
  INNER JOIN users AS u ON c.userid = u.userid  
  WHERE hostelid = ${id};`;

  const hostelOverview = db.query(qHostelOverview);
  const commentsOverview = db.query(qCommentsOverview);
  const countries = db.query(qCountries);

  let toReturn = {};
  Promise.all([hostelOverview, commentsOverview, countries])
    .then( result => {
      toReturn['avgRating'] = result[0].rows[0]['avgrating'];
      toReturn['totalReviewCount'] = result[0].rows[0]['totalreviewcount'];
      toReturn['ratedFeatures'] = [
        {feature: 'Value For Money', 
        rating: result[0].rows[0]['ratedfeatures'][0]},
        {feature: 'Security', 
        rating: result[0].rows[0]['ratedfeatures'][1]},
        {feature: 'Location', 
        rating: result[0].rows[0]['ratedfeatures'][2]},
        {feature: 'Staff', 
        rating: result[0].rows[0]['ratedfeatures'][3]},
        {feature: 'Atmosphere', 
        rating: result[0].rows[0]['ratedfeatures'][4]},
        {feature: 'Cleanliness', 
        rating: result[0].rows[0]['ratedfeatures'][5]},
        {feature: 'Facilities', 
        rating: result[0].rows[0]['ratedfeatures'][6]},
      ];

      toReturn['reviews'] = [];
      for (let i = 0; i < 4; i++) {
        toReturn['reviews'].push({
            created_at: result[1].rows[i]['created_at'],
            rate: result[1].rows[i]['rate'],
            text: result[1].rows[i]['text'],
            user: {
              username: result[1].rows[i]['username'],
              age: result[1].rows[i]['age'],
              status: result[1].rows[i]['status'],
              country: result[1].rows[i]['country'],
        }});
      }

      toReturn['countryCount'] = {};
      const countryArr = result[2].rows;
      for (let i = 0; i < countryArr.length; i++) {
        if (!toReturn['countryCount'][countryArr[i].country]) {
          toReturn['countryCount'][countryArr[i].country] = 1;
        } else {
          toReturn['countryCount'][countryArr[i].country]++;
        }
      }
      res.status(200).send(toReturn);
    });
});

module.exports = router;