import React from 'react'
import './Spinner.css'
import SpinnerImage from './spinner.png';

function Spinner() {
  return <img className='pulse' src={SpinnerImage} alt="loading" />
}

export default Spinner