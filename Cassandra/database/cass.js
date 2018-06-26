const cassandra = require('cassandra-driver');
const util = require('util');

const client = new cassandra.Client({ contactPoints: ['127.0.0.1'] });

client.execute = util.promisify(client.execute);

/*
(70936d55-d097-431e-9e39-0a83dee8ad3b,
b50339bd-07c1-4a49-b45d-cd233af58c3e,
821ff596-f1bc-43f7-b141-b0819a3e9c8f,
4d8067c8-664e-49ae-b313-69ff0a5df0de, c009324b-614d-46dc-85aa-98048636227c,
b8735109-0e78-4db7-905f-846df5c8ed4d,
e6285dfa-6871-49ba-86d5-049e525ea0ab,
eaeca159-db3d-43a0-91a8-9e806951370f,
a63ada55-7921-4b9f-884a-7f6badebca7b,
821ff596-f1bc-43f7-b141-b0819a3e9c8f)
*/

// async function getUser() {
// const query = 'SELECT age, numOfReviews, status, username FROM reviews.users where userId in ?';
// const params = ['d2187840-5ab4-4af1-a889-20c5f10e3431',
//   '0a12d253-b9a5-424c-a6fd-4e55d5585505',
//   '46117b8d-f166-46e6-807a-9961e4577c45',
//   '84d5c98c-19cd-4b6f-92bd-db773f63aa9c',
//   '8d318729-620c-4d20-865e-9e04eb468e88',
//   'ebdf4a4d-855d-4ed0-beef-23be76183e6d',
//   '8435a1c2-5a2f-4eb8-96d8-43654b822d30',
//   'a57ffa80-61e5-4965-a91e-097995c81b64',
//   'e39ef05c-80a2-43ba-982d-545893b39697',
//   '7f57b1b7-e7e2-4991-a3e9-14c3c3bfabeb'];

// const user = client.execute(query, [params])
//   .then((result) => {
//     console.log(result.rows[0]);
//   });

// }
// getUser();

// const createKeyspace = (() => {
//   client.execute('DROP keyspace IF EXISTS reviews')
//     .then(() => {
//       client.execute('CREATE keyspace reviews WITH replication = {\'class\': \'SimpleStrategy\', \'replication_factor\' : 1};')
//         .then(() => console.log('DONE!'))
//         .catch(err => console.log(err));
//     })
//     .catch(err => console.log(err));
// })();

// const createTables = (() => {
// client.execute(`CREATE TABLE users (
//   userId uuid,
//   userCreatedAt timestamp,
//   firstname text,
//   lastname text,
//   username text,
//   age int,
//   email text,
//   status text,
//   country text,
//   numOfReviews int,
//   PRIMARY KEY (userid)
// )`);

// client.execute(`CREATE TABLE hostels (
//   hostelId int,
//   name text,
//   avgRating int,
//   totalReviewCount int,
//   countryCount map <text, int>,
//   ratedFeatures map <text, int>,
//   PRIMARY KEY (hostelId)
// )`);

//   client.execute(`CREATE TABLE comments (
// commentId uuid,
// hostelId int,
// userId uuid,
// ratedFeatures map <text, int>,
// rate int,
// created_at timestamp,
// language text,
// text text,
// propertyResponse text,
// PRIMARY KEY ((hostelId), commentId)
// )`);
// })();

// TO GET OVERVIEW DATA:
// QUERY for the hostel ID, top 4 comments in ascending order

// TO GET ALL DATA:
// QUERY FOR the length of comments in that category, comments based on description (LANGUAGE AND SORT)
