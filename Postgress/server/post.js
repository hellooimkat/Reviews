const parser = require('body-parser');
const uuidv4 = require('uuid/v4');const express = require('express');
const router = express.Router();
router.use(parser.json());
const db = require('./database');

router.post('/user/:hostelid', (req, res) => {
  const { hostelid } = req.params;

  const { userid } = req.body;
  const { ratedFeatures } = req.body;
  const { rate } = req.body;
  const { created_at } = req.body;
  const { language } = req.body;
  const { text } = req.body;
  const commentid = uuidv4();

  const qComment = `INSERT INTO comments
  (commentId, hostelId, userId, ratedFeatures, rate, created_at, language, text) 
  VALUES ('${commentid}', ${hostelid}, '${userid}', '${ratedFeatures}', ${rate}, '${created_at}', '${language}', '${text}');`;
  
  db.query(qComment)
    .then( () => {
      res.send('Comment Created!')
    })
    .catch( err => console.log(err));
});

router.patch('/property/:hostelid', (req, res) => {
  const { hostelid } = req.params;
  let { response } = req.body;
  const { userid } = req.body;

  //TODO: xss protection and quote escapes here

  const qComment = `UPDATE comments
  SET propertyresponse = '${response}'
  WHERE userid = '${userid}' AND hostelid = ${hostelid}
  `;
  db.query(qComment)
    .then( () => {
      res.send('Post Updated!')
    })
    .catch( err => console.log(err));
});

module.exports = router;