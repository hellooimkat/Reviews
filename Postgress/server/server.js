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

app.listen(PORT, () => console.log('I\'m in the year', PORT));