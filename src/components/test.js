import React from 'react';

const HelloTest = (props) => {
  console.log(props.data)
  return (
    <div>
      <h1> Successful Login! </h1>
    </div>
  );
}

export default HelloTest;