const pgp = require('pg-promise')();
const ps = require('pg-promise').PreparedStatement;
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const PORT = process.env.PORT || 3004;
const app = express();
app.listen(PORT, () => console.log('Server running on port', PORT));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const cn = {
  host: 'localhost',
  port: 5432,
  database: 'postgres',
  user: 'postgres',
  password: 'password'
};
const db = pgp(cn); 

app.use(express.static(path.join(__dirname, '../../Reviews/public/')));
app.use('hostels/:id', express.static(path.join(__dirname, '../../Reviews/public/')));

app.get('/api/reviews/overview/:id', async (req, res) => {
  const { id } = req.params;
  let toReturn = {};
  const qHostelOverview = new ps('find-hostel-overview',
  `SELECT
  avgRating, ratedFeatures 
  FROM hostels
  WHERE hostelid = $1`, [id]);
  const qCommentsOverview = new ps('find-comments-overview', `
  SELECT
  comments.created_at, comments.rate, comments.text,
  users.country, users.username, users.age, users.status
  from comments
  INNER JOIN users ON comments.userid = users.userid
  WHERE comments.hostelid = $1
  ORDER BY comments.created_at DESC
  LIMIT 4;`, 
  [id]);
  const qCommentsCount = new ps('find-comments-count',
  `SELECT 
  count(1) FROM comments
  WHERE hostelid = $1`, [id]);

  const hostelOverview = db.many(qHostelOverview);
  const commentsCount = db.one(qCommentsCount);
  const commentsOverview = db.many(qCommentsOverview);
  Promise.all([hostelOverview, commentsCount, commentsOverview])
    .then( result => {
      // console.log(result)
      toReturn['avgRating'] = result[0][0]['avgrating'];
      toReturn['totalReviewCount'] = result[1]['count'];
      toReturn['countryCount'] = {US: 1};
      toReturn['ratedFeatures'] = [
        {feature: 'Value For Money', 
        featureId: 1,
        rating: result[0][0]['ratedfeatures'][0]},
        {feature: 'Security', 
        rating: result[0][0]['ratedfeatures'][1]},
        {feature: 'Location', 
        rating: result[0][0]['ratedfeatures'][2]},
        {feature: 'Staff', 
        rating: result[0][0]['ratedfeatures'][3]},
        {feature: 'Atmosphere', 
        rating: result[0][0]['ratedfeatures'][4]},
        {feature: 'Cleanliness', 
        rating: result[0][0]['ratedfeatures'][5]},
        {feature: 'Facilities', 
        rating: result[0][0]['ratedfeatures'][6]},
      ];
      toReturn['reviews'] = [];

      for (let i = 0; i < 4; i++) {
        toReturn['reviews'].push({
            created_at: result[2][i]['created_at'],
            rate: result[2][i]['rate'],
            text: result[2][i]['text'],
            user: {
              username: result[2][i]['username'],
              age: result[2][i]['age'],
              status: result[2][i]['status'],
              country: result[2][i]['country'],
        }});
      }
      res.send(toReturn);
    })
});



