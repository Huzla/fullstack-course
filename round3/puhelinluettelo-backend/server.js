const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const logger = require('./utils/logger.js');
const routes = require('./routes');

const port = 4000;

app.use(bodyParser.json());
app.use(cors());

//See utils/logger.js for morgan related exercises.
app.use(logger);

app.use('/', routes.general);
app.use('/api/persons', routes.api);

app.listen(port, () => console.log(`Server listening on port ${port}`))
