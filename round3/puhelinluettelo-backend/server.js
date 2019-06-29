require('dotenv').config();
const db = require('./db');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const logger = require('./utils/logger.js');
const routes = require('./routes');

const port = process.env.PORT || 4000;

const handleError = (err, req, res, next) => {
  console.log(err.stack);
  return res.status(500).end();
};

app.use(bodyParser.json());
app.use(cors());

app.use(express.static('build'));

//See utils/logger.js for morgan related exercises.
app.use(logger);


app.use('/', routes.general);
app.use('/api/persons', routes.api);

app.use(handleError);

app.listen(port, () => console.log(`Server listening on port ${port}`));
