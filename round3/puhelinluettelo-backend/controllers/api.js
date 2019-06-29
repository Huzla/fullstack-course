const services = require('../services/api.js');
const { getRandomInt } = require('../utils/random.js');

const handleError = (req, res, err) => {
  console.log(err.stack);
  res.status(500).end();
}

//----------------------------------GET------------------------------------
const getPerson = (req, res) => {
  try {
    let person = services.findPerson(Number(req.params.id));

    if (person)
      return res.json( person);

    res.status(404).end();
  }
  catch (err) {
    handleError(req, res, err);
  }
}

const getEveryone = (req, res) => {
  try {
    return res.json( services.fetchEveryone() );
  }
  catch (err) {
    handleError(req, res, err);
  }
}

//------------------------------POST---------------------------------------
const postPerson = (req, res) => {
  try {
    console.log('Post person reached.');
    let name = req.body.name;
    let number = req.body.number;

    if ( !(name && number) )
      return res.status(400).json({message: "Please include both a name and a number."});

    let newPerson = { name, number, id: getRandomInt(0, 1000000) };

    if ( services.addPerson( newPerson ) )
      return res.status(201).json(newPerson);

    res.status(400).json({message: "Name must be unique."});
  }
  catch (err) {
    handleError(req, res, err);
  }
}


//------------------------------DELETE--------------------------------------
const deletePerson = (req, res) => {
  try {
    let status = 500;

    services.removePerson(Number(req.params.id)) ? status = 204 : status = 404;

    res.status(status).end();
  }
  catch (err) {
    handleError(req, res, err);
  }
}


module.exports = {
  getPerson,
  getEveryone,
  deletePerson,
  postPerson
}
