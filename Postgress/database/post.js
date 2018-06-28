const pgp = require('pg-promise')();
const ps = require('pg-promise').PreparedStatement;
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const PORT = process.env.PORT || 3004;
app.listen(PORT, () => console.log('Server running on port', PORT));

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join('../')));
app.use('/:id', express.static(path.join(__dirname, '../public/')));
app.get('/:id', (req, res) => {
  const { id } = req.params;
  app.use(express.static(path.join(__dirname, '../public/')));
});

const cn = {
    host: 'localhost',
    port: 5432,
    database: 'postgres',
    user: 'postgres',
    password: 'password'
};
const db = pgp(cn); 

