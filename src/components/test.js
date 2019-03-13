import React from 'react';

const HelloTest = (props) => {
  console.log(props.data)
  return (
    <div>
      <h1 style="text-align:center;font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;"><span 
    >Successful Login!</span></h1>
    </div>
  );
}

export default HelloTest;