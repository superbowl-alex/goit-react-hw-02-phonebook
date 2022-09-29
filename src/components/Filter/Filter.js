import React from 'react';

const Filter = ({ filter, onChange }) => {
  return (
    <label>
      Find contacts by name
      <input
        type="text"
        name="filter"
        value={filter}
        onChange={onChange}
      ></input>
    </label>
  );
};

export default Filter;
