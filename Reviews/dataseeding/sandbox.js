const faker = require('faker');
const mongoose = require('mongoose');
let i = 2;
console.log(new mongoose.mongo.ObjectId(i));
console.log(new mongoose.mongo.ObjectId(2).toString());
