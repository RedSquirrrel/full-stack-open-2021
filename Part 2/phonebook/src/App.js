import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Filter = ({ handleFilter }) => {
  return (
    <div>
      Filter shown with <input type='text' onChange={handleFilter} />
    </div>
  );
};

const Persons = ({ persons }) => {
  return (
    <div>
      {persons.map(person => {
        return (
          <p key={person.name}>
            {person.name} {person.number}
          </p>
        );
      })}
    </div>
  );
};

const PersonForm = ({
  addPerson,
  handleChangeName,
  handleChangePhone,
  newName,
  newPhoneNumber,
}) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={handleChangeName} />
      </div>
      <div>
        number: <input value={newPhoneNumber} onChange={handleChangePhone} />
      </div>
      <div>
        <button type='submit'>add</button>
      </div>
    </form>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newPhoneNumber, setNewPhoneNumber] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/persons').then(response => {
      setPersons(response.data);
    });
  }, []);

  const addPerson = event => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newPhoneNumber,
    };
    if (newName) {
      setPersons(persons.concat(personObject));
    }
    setNewName('');
    setNewPhoneNumber('');
  };

  const handleChangeName = event => {
    setNewName(event.target.value);
  };

  const handleChangePhone = event => {
    setNewPhoneNumber(event.target.value);
  };

  const handleFilter = event => {
    setFilter(event.target.value);
  };

  const existingPerson = persons.some(
    person => person.name.toLowerCase() === newName.toLowerCase()
  );
  if (existingPerson) {
    alert(`${newName} is already added to phonebook`);
    setNewName('');
    setNewPhoneNumber('');
  }

  const filterPersons = persons.filter(p => {
    return p.name.toLowerCase().includes(filter);
  });

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter persons={persons} filter={filter} handleFilter={handleFilter} />
      <h3>Add a new:</h3>
      <PersonForm
        addPerson={addPerson}
        handleChangeName={handleChangeName}
        handleChangePhone={handleChangePhone}
        newName={newName}
        newPhoneNumber={newPhoneNumber}
      />
      <h3>Numbers</h3>
      <Persons persons={!filterPersons ? persons : filterPersons} />
    </div>
  );
};

export default App;
