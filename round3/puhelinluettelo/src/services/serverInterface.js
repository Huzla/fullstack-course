const db = "/api/persons";

const jsonMessageOptions = (method, data) => {
  return {
    method: method,
    body: JSON.stringify(data),
    headers:{
      'Content-Type': 'application/json'
    }
  };
}

const getPeople = () => {

  return fetch(db)
    .then(function(res) {
      return res.json();
    });

}

const addPerson = (addMe) => {
  return fetch(db, jsonMessageOptions('POST', addMe))
    .then(res => {
      if (res.status === 201 || res.status === 400)
        return res.json()
                .then(data => {
                  if (data.message)
                    throw Error(data.message);

                  //Received new person.
                  return data;
                });

      throw Error("Could not add person")
    });
}

const removePerson = (person) => {
  return fetch(`${db}/${person.id}`, {
    method: 'DELETE'
  })
  .then(res => {
    if (!res.ok)
      throw Error(`${person.name} already removed`);
  });
}

const changeNumber = (person) => {
  return fetch(`${db}/${person.id}`, jsonMessageOptions('PUT', person))
    .then(res => {
      switch (res.status) {
        case 204:
          return person;
        case 400:
          return res.json()
                  .then(err => {throw Error(err.message)});
        case 404:
          throw Error(`${person.name} already removed!`);
        default:
          throw Error('Could not remove person.');
      }
    })
    .then(data => data);
}

export default {
  getPeople,
  addPerson,
  removePerson,
  changeNumber
}
