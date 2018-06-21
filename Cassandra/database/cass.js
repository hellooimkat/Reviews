const cassandra = require ('cassandra-driver');
const util = require('util');

var client = new cassandra.Client({contactPoints: ['127.0.0.1']});

client.execute = util.promisify(client.execute); 

const createKeyspace = (() => {
  client.execute(`DROP keyspace IF EXISTS reviews`)
  .then( () => {
    client.execute(`CREATE keyspace reviews WITH replication = {'class': 'SimpleStrategy', 'replication_factor' : 1};`)
    .then(() => console.log('DONE!'))
    .catch( (err) => console.log(err))
  })
  .catch( (err) => console.log(err))
})();

const createTables = (() => {
  client.execute(`CREATE TABLE users (
    userId uuid,
    userCreatedAt timestamp,
    firstname text,
    lastname text,
    username text,
    age int,
    email text,
    status text,
    country text,
    numOfReviews int,
    PRIMARY KEY (userid)
  )`);

  client.execute(`CREATE TABLE hostels (
    hostelId uuid,
    name text,
    created_at timestamp,
    avgRating int,
    totalReviewCount int,
    countryCount map <text, int>,
    ratedFeatures map <text, int>,
    PRIMARY KEY (hostelId)
  )`);

  client.execute(`CREATE TABLE comments (
    hostelId uuid,
    user map <text, text>,
    rate int,
    ratedFeatures map <text, int>,
    created_at timestamp,
    language text STATIC,
    country text,
    text text,
    PRIMARY KEY (hostelId, username)
  )`);

  client.execute(`CREATE TABLE comments_by_hostel_overview (
    hostelId ,
    user map <text, text>,
    rate int,
    created_at timestamp,
    text text,
    PRIMARY KEY (hostelId, created_at) 
  ) WITH CLUSTERING ORDER BY (created_at ASC)`);

  client.execute(`CREATE TABLE comments_by_hostel_all_desc (
    hostelId int,
    commentId int,
    age int,
    country text,
    created_at timestamp,
    language text,
    numOfReviews int,
    propertyResponse text,
    rate int,
    status text,
    text text,
    username,
    PRIMARY KEY (hostelID, created_at)
  ) WITH CLUSTERING ORDER BY (created_at DESC)`);

  client.execute(`CREATE TABLE comments_by_hostel_all_asc (
    hostelId int,
    commentId int,
    age int,
    country text,
    created_at timestamp,
    language text,
    numOfReviews int,
    propertyResponse text,
    rate int,
    status text,
    text text,
    username,
    PRIMARY KEY (hostelId, created_at)
  ) WITH CLUSTERING ORDER BY (created_at ASC)`);

  client.execute(`CREATE TABLE comments_by_hostel_all_rate_desc (
    hostelId int,
    commentId int,
    age int,
    country text,
    created_at timestamp,
    language text,
    numOfReviews int,
    propertyResponse text,
    rate int,
    status text,
    text text,
    username,
    PRIMARY KEY (hostelId, rate)
  ) WITH CLUSTERING ORDER BY (rate DESC)`);

  client.execute(`CREATE TABLE comments_by_hostel_all_rate_asc (
    hostelId int,
    commentId int,
    age int,
    country text,
    created_at timestamp,
    language text,
    numOfReviews int,
    propertyResponse text,
    rate int,
    status text,
    text text,
    username,
    PRIMARY KEY (hostelId, rate)
  ) WITH CLUSTERING ORDER BY (rate ASC)`);

  client.execute(`CREATE TABLE comments_by_hostel_all_age_asc (
    hostelId int,
    commentId int,
    age int,
    country text,
    created_at timestamp,
    language text,
    numOfReviews int,
    propertyResponse text,
    rate int,
    status text,
    text text,
    username,
    PRIMARY KEY (hostelId, age)
  ) WITH CLUSTERING ORDER BY (age ASC)`);
  
})();

//TO GET OVERVIEW DATA:
//QUERY for the hostel ID, top 4 comments in ascending order

//TO GET ALL DATA:
//QUERY FOR the length of comments in that category, comments based on description (LANGUAGE AND SORT)
