const services = require('../services/api.js');

const getPerson = (req, res) => {
  try {
    let person = services.findPerson(Number(req.params.id));

    if (person)
    return res.json( person);

    res.status(404).end();
  }
  catch (err) {
    console.log(err.stack);
    res.status(500).end();
  }
}

const deletePerson = (req, res) => {
  try {
    let status = 500;

    services.removePerson(Number(req.params.id)) ? status = 204 : status = 404;

    res.status(status).end();
  }
  catch (err) {
    console.log(err.stack);
    res.status(500).end();
  }
}

const getEveryone = (req, res) => {
  try {
    let everyone = services.fetchEveryone();

    if (everyone)
    return res.json( everyone );

    res.status(500).end();
  }
  catch (err) {
    console.log(err.stack);
    res.status(500).end();
  }
}

module.exports = {
  getPerson,
  getEveryone,
  deletePerson
}
