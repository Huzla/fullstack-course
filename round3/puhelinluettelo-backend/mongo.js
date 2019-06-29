const mongoose = require('mongoose');

if ( process.argv.length<3 ) {
  console.log('Please give at least the password');
  process.exit(1);
}

//------------------------------Set up---------------------------------------------
const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const url =
  `mongodb+srv://dumbUser:${password}@testcluster-5r5q8.mongodb.net/test?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true, useCreateIndex: true });

//Mongoose already provides an _id field.
const personSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  number: { type: String, required: true },
});

const Person = mongoose.model('Person', personSchema);

const addPerson = async (name, number) => {
  try {
    let newPerson = new Person({ name, number });
    await newPerson.save();
    finish(`added ${ name } number ${ number } to phonebook`)
  }
  catch (err) {
    errorHandler(err);
  }
};

const showEveryone = async () => {
  //Mondel.find returns a mongoose Query so let's use exec to produce a Promise.
  try {
    finish( `phonebook:\n${ peopleToString( await Person.find({}).exec() ) }` );
  }
  catch (err) {
    errorHandler(err);
  }
};

const peopleToString = (people) => {
  return people.map(_ => personToString(_)).join('\n');
};

const personToString = ({name, number}) => {
  return `${ name } ${ number }`;
}

const errorHandler = (err) => {
  finish(err.message, 1);
}

const finish = async (message, code = 0) => {
  console.log(message);
  await mongoose.connection.close();
  process.exit(code);

}

try {
  if ( name && number ) {
    addPerson(name, number);
  }
  else if ( name || number ) {
    throw Error('Please give both a name and a number');
  }
  else {
    showEveryone();
  }
}
catch (err) {
  errorHandler(err);
}

//--------------------------------Actions--------------------------------------------
