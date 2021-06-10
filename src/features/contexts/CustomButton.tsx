import React from 'react';
import './scss/index.scss'

const CustomButton:React.FC = ({ children }) => {
  return (
    <button className='custom-button'><span>{children}</span></button>
  );
}

export default CustomButton;
