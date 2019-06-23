import React from 'react';

const Languages = ({langs}) => {

  if (langs && langs.length > 0) {

    let result = langs.map(l => <li key={ l.name }>{ l.name }</li>);



    return (
      <>
      <h3>Languages</h3>
      <ul>
        { result }
      </ul>
      </>
    );
  }

  return (
    <>
    </>
  );

}

export default Languages
