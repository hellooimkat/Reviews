const express = require('express');
const router = express.Router();
const db = require('./database');


router.get('/:id', (req, res) => {
  const { id } = req.params;
  const { pageNum } = req.query;
  const { eng } = req.query;
  const { sortBy } = req.query;

  let qReviews = 'SELECT c.created_at, c.language, c.propertyresponse, c.text, c.rate, c.commentid, u.age, u.numofreviews, u.status, u.username, u.country FROM comments AS c INNER JOIN users AS u ON c.userid = u.userid WHERE ';

  if (eng === 'true') {
    qReviews = qReviews + ` c.hostelid = ${id} AND c.language = 'ENG'`;
  } else if (eng === 'false') {
    qReviews = qReviews + ` c.hostelid = ${id} AND c.language IN ('ENG', 'OTH')`;
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

  const toReturn = {};
  db.query(qReviews)
    .then( result => {
      toReturn['total'] = result.rowCount;
      toReturn['reviewSnippet'] = [];
      
      const reviewResults = result.rows;
      for(let i = 0; i < reviewResults.length; i++) {
        toReturn['reviewSnippet'].push({
          country: reviewResults[i]['country'],
          created_at: reviewResults[i]['created_at'],
          language: reviewResults[i]['language'],
          propertyResponse: reviewResults[i]['propertyresponse'],
          text: reviewResults[i]['text'],
          rate: reviewResults[i]['rate'],
          age: reviewResults[i]['age'],
          numOfReviews: reviewResults[i]['numofreviews'],
          status: reviewResults[i]['status'],
          username: reviewResults[i]['username'],
      })};
      res.status(200).send(toReturn);
    })
    .catch( err => console.log(err));
});

module.exports = router;

/*
-------------------TOTAL OVERVIEW
SELECT totalengreviews FROM hostels WHERE hostelid = 1;
-------------------REVIEWS OVERVIEW
SELECT c.created_at, c.language, c.propertyresponse, c.text, c.rate, c.commentid, 
u.age, u.numofreviews, u.status, u.username, u.country 
FROM comments AS c 
INNER JOIN users AS u ON c.userid = u.userid 
WHERE  c.hostelid = 1 AND c.language = 'ENG' 
ORDER BY c.created_at DESC LIMIT 10;
*/