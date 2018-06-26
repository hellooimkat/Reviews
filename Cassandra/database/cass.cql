DROP keyspace IF EXISTS reviewsHostelWorld;

CREATE keyspace reviewsHostelWorld WITH replication = {'class' : 'SimpleStrategy',
'replication_factor': 1};

USE reviewsHostelWorld;

CREATE TABLE users (
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
);

CREATE TABLE hostels (
  hostelId int,
  name text,
  avgRating int,
  totalReviewCount int,
  countryCount map <text, int>,
  ratedFeatures map <text, int>,
  PRIMARY KEY (hostelId)
);

CREATE TABLE commentsView (
  commentId uuid,
  ratedFeatures map <text, int>,
  rate int,
  created_at timestamp,
  language text,
  text text,
  propertyResponse text,

  hostelId int,
  name text,

  userId uuid,
  usercreatedat timestamp,
  firstname text,
  lastname text,
  username text,
  age int,
  email text,
  status text,
  country text,
  numOfReviews int,

  PRIMARY KEY ((hostelId), created_at, age, commentId)
);
