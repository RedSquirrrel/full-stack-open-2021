import Person from './Person';

const Persons = ({ persons, handleDelete }) => {
  return (
    <div>
      {persons.map(person => {
        return (
          <p key={person.name}>
            <Person person={person} />
            <button
              onClick={() => {
                handleDelete(person.id);
              }}
            >
              Delete
            </button>
          </p>
        );
      })}
    </div>
  );
};

export default Persons;
