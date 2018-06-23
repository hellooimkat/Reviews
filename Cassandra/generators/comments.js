/* eslint-disable no-console */
const faker = require('faker');
const fs = require('fs');
const util = require('util');
const uuidv4 = require('uuid/v4');

fs.readFile = util.promisify(fs.readFile);

const path = `${__dirname}/CSVs/comments2.txt`;


const ratingObjGenerator = () => {
  const categories = [
    'Value for money',
    'Atmosphere',
    'Cleanliness',
    'Location',
    'Staff',
    'Security',
    'Facilities',
  ];
  const ratingsObj = {};
  for (let i = 0; i < categories.length; i += 1) {
    const rating = Math.floor(Math.random() * 10);
    ratingsObj[categories[i]] = rating;
  }
  return ratingsObj;
};

/*eslint-disable */
const findTotalRating = (ratingsObj) => {
  let sum = 0;
  for (const category in ratingsObj) {
    sum += ratingsObj[category];
  }
  return Math.ceil(sum / 7);
};


// CREATE A CSV WITH 2 - 20 comments per hostel
const createHostelsCSV = async (start = 500001, end = 1000000) => {
  const userIDs = `${__dirname}/CSVs/userIDs.txt`;
  const text = await fs.readFile(userIDs, 'utf8');
  const userIdArr = text.split(',');

  let comments = [];
  for (let i = start; i < end; i += 1) {
    // find a different number of comments per listing
    const numberOfComments = Math.floor(Math.random() * 23) + 3;
    for (let j = 0; j <= numberOfComments; j += 1) {
      let comment = [];
      //commentId
      comment.push(uuidv4());
      // hostelId
      comment.push(i);
      // userId: find a different user per comment
      const randomUser = Math.floor(Math.random() * 50);
      comment.push(userIdArr[randomUser]);
      // ratedFeatures map <text, int>,
      const ratingsObj = ratingObjGenerator();
      comment.push(JSON.stringify(ratingsObj));
      // rate int,
      comment.push(findTotalRating(ratingsObj));
      // created_at timestamp,
      const date = new Date(faker.date.between('2000-01-01', '2018-01-01'));
      comment.push(date.toISOString());
      // language text STATIC,
      const language = faker.random.arrayElement([
        'ENG',
        'ENG',
        'ENG',
        'ENG',
        'OTH',
      ]);
      comment.push(language);
      // text 
      comment.push(faker.lorem.paragraph());
      // propertyResponse 
      Math.random() < 0.4 ? comment.push('null')
        : comment.push(faker.lorem.sentences(faker.random.number({ min: 1, max: 2 })));

      comment = comment.join('|');
      comments.push([comment]);
    }
    if (i % 1000 === 0) {
      comments = '\n' + comments.join('\n');
      fs.appendFileSync(path, comments);
      comments = [];
      console.log(i)
    }
  }
};

createHostelsCSV();


// CSV TO TABLE

// COPY comments (commentId,hostelId,userId,ratedFeatures,rate,created_at,language,text,propertyResponse) FROM '/home/CSVs/comments.txt' WITH NULL = 'null' AND DELIMITER = '|';

