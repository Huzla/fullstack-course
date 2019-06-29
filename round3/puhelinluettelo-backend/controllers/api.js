const services = require('../services/api.js');
const { getRandomInt } = require('../utils/random.js');

//----------------------------------GET------------------------------------
const getPerson = (req, res, next) => {
  services.findPerson(req.params.id)
    .then(person => {
      if (person)
        return res.json( person.toJSON() );

      res.status(404).end();
    })
    .catch(next);
}

const getEveryone = (req, res, next) => {

    services.fetchEveryone()
    .then(people => res.json( people.map( p => p.toJSON() ) ))
    .catch(next);

}

//------------------------------POST---------------------------------------
const postPerson = (req, res, next) => {
    let name = req.body.name;
    let number = req.body.number;

    if ( !(name && number) )
      return res.status(400).json({ message: "Please include both a name and a number." });

    services.addPerson( { name, number } )
    .then( newPerson => res.status(201).json( newPerson.toJSON() ))
    .catch(err => {
        //res.status(400).json({message: "Name must be unique."});
        next(err);
    });

}

//------------------------------PUT----------------------------------------
const putPerson = (req, res, next) => {
  try {
    let person = services.findPerson(Number(req.params.id));
    let name = req.body.name;
    let number = req.body.number;

    if ( !(name === person.name) )
      return res.status(400).json({message: "Id does not match the person in the database."});

    if ( !number )
      return res.status(400).json({message: "Please give a valid number."});

    if ( services.changePerson(person.id, number) )
      return res.status(204).end();

    return res.status(404).end();

  }
  catch (err) {
    next(err);
  }
}

//------------------------------DELETE--------------------------------------
const deletePerson = (req, res, next) => {
  try {
    let status = 500;

    services.removePerson(Number(req.params.id)) ? status = 204 : status = 404;

    res.status(status).end();
  }
  catch (err) {
    next(err);
  }
}


module.exports = {
  getPerson,
  getEveryone,
  deletePerson,
  postPerson,
  putPerson
}
