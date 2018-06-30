const { Client } = require('pg');
const express = require('express');
const router = express.Router();

const cn = {
  host: 'localhost',
  port: 5432,
  database: 'postgres',
  user: 'postgres',
  password: 'password'
};
const db = new Client(cn); 

db.connect()

// ------------------ post request TO DO
router.post('/user/:hostelid', (req, res) => {
  const { hostelid } = req.params;

  const qComment = `INSERT INTO comments
  (hostelId, userId, ratedFeatures, rate, created_at, language, text) 
  VALUES (${hostelid}, ${userid}, ${ratedFeatures}, ${rate}, ${created_at}, ${language}, ${text});`;
  
  const comment = db.query(qComment);
});

// ---------------- update property response
router.post('/property/:hostelid', (req, res) => {
  const { hostelid } = req.params;
  const { response } = req.body;
  const { userid } = req.body;

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