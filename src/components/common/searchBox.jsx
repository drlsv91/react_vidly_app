import React from 'react';

const SearchBox = ({ value, onChange }) => {
  return (
    <div className='form-group'>
      <input
        type='text'
        className='form-control'
        placeholder='Search...'
        onChange={(e) => onChange(e.currentTarget.value)}
        value={value}
      />
    </div>
  );
};

export default SearchBox;
