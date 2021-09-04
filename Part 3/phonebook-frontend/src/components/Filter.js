const Filter = ({ handleFilter }) => {
  return (
    <div>
      Filter shown with <input type='text' onChange={handleFilter} />
    </div>
  );
};

export default Filter;
