require('newrelic')
const express = require('express');
const cors = require('cors');
const path = require('path');
const overview = require('./overview');
const sidebar = require('./sidebar');
const post = require('./post');

const PORT = process.env.PORT || 3004;
const app = express();
app.listen(PORT);
app.use(cors());

app.use(express.static(path.join(__dirname, '../../Reviews/public/')));
app.use('/hostels/:id', express.static(path.join(__dirname, '../../Reviews/public/')));
app.use('/api/get/reviews/overview', overview);
app.use('/api/get/reviews/all', sidebar);
app.use('/api/post/comments', post);

