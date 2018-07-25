const express = require('express');
const router = express.Router();
const db = require('./database');

// /api/get/reviews/all/%{*:1-100}?pageNum=1&eng=false&sortBy=newest

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
    qReviews = qReviews + ' ORDER BY c.created_at DESC ';
  } else if (sortBy === 'oldest') {
    qReviews = qReviews + ' ORDER BY c.created_at ASC ';
  } else if (sortBy === 'topRated') {
    qReviews = qReviews + ' ORDER BY c.rate DESC ';
  } else if (sortBy === 'lowestRated') {
    qReviews = qReviews + ' ORDER BY c.rate ASC ';
  } else if (sortBy === 'ageGroup') {
    qReviews = qReviews + ' ORDER BY u.age ASC ';
  }

  if (pageNum !== '1') {
    qReviews = qReviews + ` OFFSET ${(Number(pageNum) * 10) - 10}`;
  }

  qReviews = qReviews + 'LIMIT 10;';

  const toReturn = {};
  const start = Date.now();
  db.query(qReviews)
    .then( result => {
      console.log('QUERY FINISHED', Date.now() - start);
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
      console.log('CALCS DONE', Date.now() - start);
      res.status(200).send(toReturn);
    })
    .catch( () => res.status(500));
});

module.exports = router;