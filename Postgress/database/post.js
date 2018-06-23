/*

SELECT comments.userid, comments.rate, comments.created_at, comments.language, comments.text, comments.propertyresponse, 
users.age, users.numofreviews, users.status, users.username, users.country
from comments
inner join users on comments.userid = users.userid
where comments.hostelid = NUMBER;


*/