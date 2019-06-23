import React from 'react';

const BasicInfo = (props) => {
  let info = [];

  for (let key in props) {
    if (props[key])
      info = info.concat(<p key={ key }>{ key }: { props[key] }</p>)
  }

  return (
    <>
      { info }
    </>
  );
}

export default BasicInfo
