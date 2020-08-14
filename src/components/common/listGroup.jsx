import React from 'react';

const ListGroup = ({
  genres,
  selectedGenre,
  onGenreSelect,
  valueProp,
  textProp,
}) => {
  return (
    <ul className='list-group'>
      {genres.map((genre) => {
        return (
          <li
            key={genre[valueProp]}
            className={
              selectedGenre === genre
                ? 'list-group-item active'
                : 'list-group-item'
            }
            onClick={() => onGenreSelect(genre)}
          >
            {genre[textProp]}
          </li>
        );
      })}
    </ul>
  );
};

ListGroup.defaultProps = {
  valueProp: '_id',
  textProp: 'name',
};

export default ListGroup;
