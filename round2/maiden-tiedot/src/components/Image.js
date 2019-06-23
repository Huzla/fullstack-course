import React from 'react';

const Image = ({altText, url}) => {
  let result = (<></>);

  if (url)
    result = <img width="300px" alt={altText} src={ url } />;

  return (
    <>
    { result }
    </>
  );
}

export default Image
