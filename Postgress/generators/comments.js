/* eslint-disable no-console */
const faker = require('faker');
const fs = require('fs');
const util = require('util');
const uuidv4 = require('uuid/v4');

fs.readFile = util.promisify(fs.readFile);

const path = `${__dirname}/CSVs/commentsview.txt`;


const ratingArrGenerator = () => {
  const categories = [
    'Value for money',
    'Atmosphere',
    'Cleanliness',
    'Location',
    'Staff',
    'Security',
    'Facilities',
  ];
  const ratingsArr = [];
  for (let i = 0; i < categories.length; i += 1) {
    const rating = Math.floor(Math.random() * 10);
    ratingsArr.push(rating);
  }
  return ratingsArr;
};

/*eslint-disable*/
const findTotalRating = (ratingsArr) => {
  sum = ratingsArr.reduce( (acc, curr) => {
    return acc + curr
  })
  return Math.ceil(sum/7);
};
/*eslint-enable*/


// CREATE A CSV WITH 2 - 12 comments per hostel
const createHostelsCSV = async (start = 0, end = 10000000) => {
  const userIDs = `${__dirname}/CSVs/userIDs.txt`;
  const text = await fs.readFile(userIDs, 'utf8');
  const userIdArr = text.split(',');

  let comments = [];
  for (let i = start; i <= end; i += 1) {
    // find a different number of comments per listing
    const numberOfComments = Math.floor(Math.random() * 15);
    for (let j = 0; j <= numberOfComments; j += 1) {
      let comment = [];
      //commentId
      comment.push(uuidv4());
      // hostelId
      comment.push(i);
      // userId: find a different user per comment
      const randomUser = Math.floor(Math.random() * 50);
      comment.push(userIdArr[randomUser]);
      // ratedFeatures 
      const ratingsArr = ratingArrGenerator();
      comment.push(JSON.stringify('{' + ratingsArr.join() +'}'))
      // rate FROM ratedFeatures
      comment.push(findTotalRating(ratingsArr));
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
      if (i === 0) {
        comments = comments.join('\n');
      } else {
        comments = '\n' + comments.join('\n');
      }
      fs.appendFileSync(path, comments);
      comments = [];
      console.log(i)
    }
  }
};

createHostelsCSV();