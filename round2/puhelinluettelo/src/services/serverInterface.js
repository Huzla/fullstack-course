const db = "http://localhost:3001/persons";

const getPeople = () => {

  return fetch(db)
    .then(function(res) {
      return res.json();
    });

}

const addPerson = (addMe) => {
  return new Promise((resolve) => {
    return resolve(addMe)
  });
}

export default {
  getPeople,
  addPerson
}
