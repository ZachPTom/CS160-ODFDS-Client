import React from 'react';
//import { relative } from 'path';

//ignore this I'm still learnign js + react lol- Zach
const styles = {
  center: {
    alignSelf: 'center'
  }
}

const HelloTest = (props) => {
  console.log(props.data)
  return (
    <div className={styles.center}>
      <h1> On Demand Food Delivery Service </h1>
    </div>
  );
}

export default HelloTest;