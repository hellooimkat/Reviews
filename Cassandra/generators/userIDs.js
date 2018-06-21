const uuidv4 = require('uuid/v4');
const fs = require('fs');


const createUsersCSV = (number = 50) => {
  const userIDs = [];
  for (let i = 0; i <= number; i += 1) {
    // userId
    const id = uuidv4();
    userIDs.push(`${id}`);
  }

  // writing all of the userIDs to a file to use in other tables
  const path = `${__dirname}/CSVs/userIDs.txt`;
  const wstream = fs.createWriteStream(path);
  wstream.write(userIDs.join(','));
};
createUsersCSV();


async function getAllUserIDs() {
  const userIDs = `${__dirname}/CSVs/userIDs.txt`;
  const text = await fs.readFile(userIDs, 'utf8');
  return (text.split(','));
}
module.exports = getAllUserIDs;

