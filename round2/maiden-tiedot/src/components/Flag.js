import React from 'react';

const Flag = ({altText, url}) => {
  let result = (<></>);

  if (url)
    result = <img width="300px" alt={altText} src={ url } />;

  return (
    <>
    { result }
    </>
  );
}

export default Flag
