const services = require("../services/api.js");
const { NotFoundError } = require("../errors");

//----------------------------------GET------------------------------------
const getPerson = (req, res, next) => {
  services.findPerson(req.params.id)
    .then(person => {

      if ( !person )
        throw NotFoundError("person");

      return res.json( person.toJSON() );
    })
    .catch(next);
};

const getEveryone = (req, res, next) => {

  services.fetchEveryone()
    .then(people => res.json( people.map( p => p.toJSON() ) ))
    .catch(next);

};

//------------------------------POST---------------------------------------
const postPerson = (req, res, next) => {
  let name = req.body.name;
  let number = req.body.number;

  services.addPerson( { name, number } )
    .then( newPerson => res.status(201).json( newPerson.toJSON() ))
    .catch(next);

};

//------------------------------PUT----------------------------------------
const putPerson = (req, res, next) => {
  let number = req.body.number;

  services.findPerson(req.params.id)
    .then(person => {
      if ( !person )
        throw NotFoundError("person");

      return services.changePerson(person.id, number);
    })
    .then(() => res.status(204).end())
    .catch(next);

};

//------------------------------DELETE--------------------------------------
const deletePerson = (req, res, next) => {
  services.removePerson(req.params.id)
    .then(removed => {

      if (!removed.deletedCount)
        throw NotFoundError("person");

      return res.status(204).end();
    })
    .catch(next);
};


module.exports = {
  getPerson,
  getEveryone,
  deletePerson,
  postPerson,
  putPerson
};
