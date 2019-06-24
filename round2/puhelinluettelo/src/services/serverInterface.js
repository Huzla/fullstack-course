const db = "http://localhost:3001/persons";

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
    .then(res => res.json())
    .then(data => data);
}

const removePerson = (id) => {
  return fetch(`${db}/${id}`, {
    method: 'DELETE'
  });
}

const changeNumber = (person) => {
  return fetch(`${db}/${person.id}`, jsonMessageOptions('PUT', person))
    .then(res => res.json())
    .then(data => data);
}

export default {
  getPeople,
  addPerson,
  removePerson,
  changeNumber
}
