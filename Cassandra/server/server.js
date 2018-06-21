import express from 'express';
import parser from 'body-parser';
import cors from 'cors';
import path from 'path';

const PORT = process.env.port || 3004;
const app = express();
app.use(cors());
app.use(parser.json());

app.use(express.static(path.join(__dirname, '../../Reviews/public/')));
app.use('/:id', express.static(path.join(__dirname, '../../Reviews/public/')));

app.get(`/api/reviews/:hostelId/all`, async (req, res) => {
  try {
    const { pageNumber } = req.params;
    const { isEnglish } = req.params;
    const { sortBy } = req.params
  } catch (err) {
    console.log('We errored!', err);
    res.status(404);
  }
});

app.get(`/api/reviews/:hostelId/all`, async (req, res) => {
  try {
    const { hostelId } = req.params;
  } catch (err) {
    console.log('We errored!', err);
    res.status(404);
  }
});

app.listen(PORT, () => console.log('I\'m in the year', PORT));