/*

SELECT comments.userid, comments.rate, comments.created_at, comments.language, comments.text, comments.propertyresponse, 
users.age, users.numofreviews, users.status, users.username, users.country
from comments
inner join users on comments.userid = users.userid
where comments.hostelid = NUMBER;

create table comments (
  commentid uuid,
  userid uuid, 
  hostelid int,
  created_at timestamp,
  rate smallint,
  ratedFeatures int ARRAY[7],
  language varchar(50),
  text text,
  propertyresponse text
);

create table users (
  userid uuid,
  userCreatedAt timestamp,
  firstname varchar(50),
  lastname varchar(50),
  username varchar(50),
  age smallint,
  email varchar(50),
  status varchar (20),
  country varchar(50),
  numofreviews smallint
);

create table ratedfeatures (
  hostelid smallint,
  valueForMoney smallint,
  security smallint,
  location smallint,
  staff smallint,
  atmosphere smallint,
  cleanliness smallint,
  facilities smallint
);

*/