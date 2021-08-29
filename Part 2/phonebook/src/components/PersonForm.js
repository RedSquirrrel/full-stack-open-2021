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

export default PersonForm;
