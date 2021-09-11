import React, { useState, useEffect } from 'react';
import personService from './services/persons';
import './index.css';
import Filter from './components/Filter';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newPhoneNumber, setNewPhoneNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [showMessage, setShowMessage] = useState('');
  const [checker, setChecker] = useState(true);

  useEffect(() => {
    personService.getAll().then(initialPersons => {
      setPersons(initialPersons);
    });
  }, []);

  const existingPerson = persons.some(p => p.name.toLowerCase() === newName.toLowerCase());
  const existingNumber = persons.some(n => n.number.toLowerCase() === newPhoneNumber);

  const addPerson = event => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newPhoneNumber,
    };

    if (existingPerson && !existingNumber) {
      const id = persons.find(p => p.name.toLowerCase() === newName.toLowerCase()).id;
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        personService
          .update(id, personObject)
          .then(returnedPerson => {
            setChecker(true);
            setShowMessage(`${returnedPerson.name} has successfully updated`);
            setTimeout(() => {
              setShowMessage(null);
            }, 4000);
            setPersons(persons.map(p => (p.id !== id ? p : returnedPerson)));
            setNewName('');
          })
          .catch(error => {
            setChecker(false);
            setShowMessage(`${error.response.data.error}`);
            setTimeout(() => {
              setShowMessage(null);
            }, 4000);
          })
          .catch(error => {
            setChecker(false);
            setShowMessage(
              `Information of ${personObject.name} has already been removed from the server`
            );
            setTimeout(() => {
              setShowMessage(null);
            }, 4000);
            setPersons(persons.filter(p => p.id !== id));
          });

        setNewName('');
        setNewPhoneNumber('');
      }
    } else if (personObject.name && personObject.number && !existingPerson) {
      personService
        .create(personObject)
        .then(returnedPerson => {
          setChecker(true);
          setShowMessage(`Added ${returnedPerson.name}`);
          setTimeout(() => {
            setShowMessage(null);
          }, 4000);
          setPersons(persons.concat(returnedPerson));
        })
        .catch(error => {
          setChecker(false);
          setShowMessage(`${error.response.data.error}`);
          setTimeout(() => {
            setShowMessage(null);
          }, 4000);
        });
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

  const filterPersons = persons.filter(p => {
    return p.name.toLowerCase().includes(filter);
  });

  const handleDelete = id => {
    const person = persons.find(p => p.id === id);
    const changedPerson = { ...person, name: person.name };

    if (window.confirm(`Delete ${changedPerson.name}?`)) {
      personService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id));
        })
        .catch(error => console.log(error));
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      {showMessage && <Notification message={showMessage} checker={checker} />}
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
      <Persons persons={!filterPersons ? persons : filterPersons} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
