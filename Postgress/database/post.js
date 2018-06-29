const { Pool, Client } = require('pg');
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
const db = new Pool(cn); 

app.use(express.static(path.join(__dirname, '../../Reviews/public/')));
app.use('/hostels/:id', express.static(path.join(__dirname, '../../Reviews/public/')));

app.get('/api/reviews/overview/:id', (req, res) => {
  const { id } = req.params;

  const qHostelOverview = `SELECT 
  totalReviewCount, avgRating, ratedFeatures 
  FROM hostels WHERE hostelid = ${id}}`;

  const qCommentsOverview = `SELECT
  comments.created_at, comments.rate, comments.text,
  users.country, users.username, users.age, users.status
  FROM comments
  INNER JOIN users ON comments.userid = users.userid
  WHERE comments.hostelid = ${id}
  ORDER BY comments.created_at DESC
  LIMIT 4`;

  const hostelOverview = db.query(qHostelOverview);
  const commentsOverview = db.query(qCommentsOverview);

  let toReturn = {};
  Promise.all([hostelOverview, commentsOverview])
    .then( result => {
      toReturn['avgRating'] = result[0][0]['avgrating'];
      toReturn['totalReviewCount'] = result[0][0]['totalreviewcount'];
      toReturn['countryCount'] = {US: 1};
      toReturn['ratedFeatures'] = [
        {feature: 'Value For Money', 
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
            created_at: result[1][i]['created_at'],
            rate: result[1][i]['rate'],
            text: result[1][i]['text'],
            user: {
              username: result[1][i]['username'],
              age: result[1][i]['age'],
              status: result[1][i]['status'],
              country: result[1][i]['country'],
        }});
      }
      res.status(200).send(toReturn);
    });
});


app.get('/api/reviews/:id/all', (req, res) => {
  console.log('QUERY ==============', req.query);

  const { id } = req.params;
  const { pageNum } = req.query;
  const { eng } = req.query;
  const { sortBy } = req.query;

  let qTotal;
  let languagePlug;
  let qReviews = 'SELECT c.created_at, c.language, c.propertyresponse, c.text, c.rate, c.commentid, u.age, u.numofreviews, u.status, u.username, u.country FROM comments AS c INNER JOIN users AS u ON c.userid = u.userid WHERE ';

  if (eng === 'true') {
    qReviews = qReviews + ` c.hostelid = ${id} AND c.language = 'ENG'`;
    qTotal = `SELECT totalengreviews FROM hostels WHERE hostelid = ${id};`;
    languagePlug = 'totalengreviews';
  } else if (eng === 'false') {
    qReviews = qReviews + ` c.hostelid = ${id} AND c.language IN ('ENG', 'OTH')`;
    qTotal = `SELECT totalreviewcount FROM hostels WHERE hostelid = ${id};`;
    languagePlug = 'totalreviewcount'
  }

  if (sortBy === 'newest') {
    qReviews = qReviews + ' ORDER BY c.created_at DESC';
  } else if (sortBy === 'oldest') {
    qReviews = qReviews + ' ORDER BY c.created_at ASC';
  } else if (sortBy === 'topRated') {
    qReviews = qReviews + ' ORDER BY c.rate DESC';
  } else if (sortBy === 'lowestRated') {
    qReviews = qReviews + ' ORDER BY c.rate ASC';
  } else if (sortBy === 'ageGroup') {
    qReviews = qReviews + ' ORDER BY u.age ASC';
  }

  if (pageNum !== '1') {
    qReviews = qReviews + ` OFFSET ${(Number(pageNum) * 10) - 10}`;
  }

  qReviews = qReviews + ' LIMIT 10;';

  console.log(qTotal, '---------------------', qReviews)
  
  const totalReviewsInCat = db.query(qTotal);
  const reviewsSnippets = db.query(qReviews);

  let toReturn = {};
  Promise.all([totalReviewsInCat, reviewsSnippets])
    .then( result => {
      toReturn['total'] = result[0][`${languagePlug}`];
      toReturn['reviewSnippet'] = [];
      
      for(let i = 0; i < result[1].length; i++) {
        console.log(result[1][i]['age'], result[1][i]['created_at'], result[1][i]['rate'], result[1][i]['language'])

        toReturn['reviewSnippet'].push({
          country: result[1][i]['country'],
          created_at: result[1][i]['created_at'],
          language: result[1][i]['language'],
          propertyResponse: result[1][i]['propertyresponse'],
          text: result[1][i]['text'],
          rate: result[1][i]['rate'],
          age: result[1][i]['age'],
          numOfReviews: result[1][i]['numofreviews'],
          status: result[1][i]['status'],
          username: result[1][i]['username'],
      })};
      res.status(200).send(toReturn);
    })
    .catch( err => console.log(err));
});

// SELECT c.created_at, c.language, c.rate, u.age FROM comments AS c INNER JOIN users AS u ON c.userid = u.userid WHERE  c.hostelid = 60000 AND c.language = 'ENG' ORDER BY c.rate DESC LIMIT 10;




/*
SELECT
comments.created_at, comments.language, comments.rate,
users.age
FROM comments
INNER JOIN users ON comments.userid = users.userid
WHERE (comments.language = 'ENG' OR comments.language = 'null')
AND comments.hostelid = 50000
ORDER BY comments.created_at asc
OFFSET 0
*/