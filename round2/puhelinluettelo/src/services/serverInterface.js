const db = "http://localhost:3001/persons";

const getPeople = () => {

  return fetch(db)
    .then(function(res) {
      return res.json();
    });

}

const addPerson = (addMe) => {
  return fetch(db, {
    method: 'POST',
    body: JSON.stringify(addMe),
    headers:{
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())
    .then(data => data);
}

const removePerson = (id) => {
  return fetch(`${db}/${id}`, {
    method: 'DELETE'
  });
}

export default {
  getPeople,
  addPerson,
  removePerson
}
