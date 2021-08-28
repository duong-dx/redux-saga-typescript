import React, {ReactChild, ReactChildren} from 'react';
import './scss/index.scss'
interface Props {
  handleClick: () => void
  children: ReactChild | ReactChildren;
}
const CustomButton:React.FC<Props> = (props) => {
  const {handleClick, children} = props
  return (
    <button onClick={handleClick} className='custom-button'><span>{children}</span></button>
  );
}

export default CustomButton;
