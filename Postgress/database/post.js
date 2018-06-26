/*

SELECT comments.userid, comments.rate, comments.created_at, comments.language, comments.text, comments.propertyresponse, 
users.age, users.numofreviews, users.status, users.username, users.country
from comments
inner join users on comments.userid = users.userid
where comments.hostelid = NUMBER;

select comments.created_at, comments.rate, comments.text, comments.userid,
users.country, users.username, users.age, users.status
from comments 
inner join users on comments.userid = users.userid
where comments.hostelid = 999998 limit 10;

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

INSERT INTO comments (commentId,hostelId,userId,ratedFeatures,rate,created_at,language,text,propertyResponse) VALUES ('93cb9207-a3d4-4fcf-9ec5-6bd591ff318f', 1000001, '93cb9207-a3d4-4fcf-9ec5-6bd591ff318f', '{5, 9, 0, 6, 3, 2,1}', 7, '2010-05-28T06:24:55.617Z', 'ENG', null, null);

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

INSERT INTO users (userId,userCreatedAt, firstname,
lastname, username, age, email,
status, country, numOfReviews)
VALUES ('93cb9207-a3d4-4fcf-9ec5-6bd591ff318f', '2010-07-03T22:38:38.131Z','Ona','Weissnat','Nicolas_Volkman2',35,'Yessenia.Effertz82@gmail.com','Mixed Group','Brunei Darussalam',55)

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