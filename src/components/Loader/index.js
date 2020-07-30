import React from 'react';
import { CircularProgress } from '@material-ui/core';
import './style.css';

function Loader() {

  return (
    <div className="loader-wrapper">
      <CircularProgress size={35} />
    </div>
  )
}

export default Loader;