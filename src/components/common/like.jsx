import React from 'react';

const Like = ({ handleOnClick, movie }) => {
  let classes = 'fa fa-heart';
  return (
    <i
      style={{ cursor: 'pointer' }}
      className={movie.liked ? classes : classes + '-o'}
      onClick={() => handleOnClick(movie)}
    ></i>
  );
};

export default Like;
