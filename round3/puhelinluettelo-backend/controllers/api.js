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
    let name = req.body.name;
    let number = req.body.number;

    if ( !number )
      return res.status(400).json({message: "Please give a valid number."});

    services.findPerson(req.params.id)
    .then(person => {
      if ( !person )
        return res.status(404).end();

      if ( !(name === person.name) )
        return res.status(400).json({message: "Id does not match the person in the database."});

      services.changePerson(person.id, number)
      .then(alteredPerson => res.status(204).end());
    })
    .catch(next);

  }
  catch (err) {
    next(err);
  }
}

//------------------------------DELETE--------------------------------------
const deletePerson = (req, res, next) => {
    services.removePerson(req.params.id)
    .then(removed => {
      const code = removed.deletedCount ? 204 : 404;

      return res.status(code).end();
    })
    .catch(next);
}


module.exports = {
  getPerson,
  getEveryone,
  deletePerson,
  postPerson,
  putPerson
}
