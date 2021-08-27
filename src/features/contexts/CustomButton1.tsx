import React from 'react';
import './scss/custom-buttom1.scss'
interface Props { children: string }
const CustomButton1:React.FC<Props> = (props) => {
  return (
    <>
      <button type='submit' className="blob-btn">
        {props.children}
        <span className="blob-btn__inner">
          <span className="blob-btn__blobs">
            <span className="blob-btn__blob"/>
            <span className="blob-btn__blob"/>
            <span className="blob-btn__blob"/>
            <span className="blob-btn__blob"/>
          </span>
        </span>
      </button>
    
      <svg style={{display: 'none'}} xmlns="http://www.w3.org/2000/svg" version="1.1">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10"></feGaussianBlur>
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 21 -7"
                           result="goo"></feColorMatrix>
            <feBlend in2="goo" in="SourceGraphic" result="mix"></feBlend>
          </filter>
        </defs>
      </svg>
    </>
  );
}

export default React.memo(CustomButton1);
