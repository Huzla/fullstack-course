const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes');

const port = 3000;

app.use(bodyParser.json());
app.use(morgan('tiny'));

app.use('/', routes.general);
app.use('/api/persons', routes.api);

app.listen(port, () => console.log(`Server listening on port ${port}`))
