import React from "react";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";
import { Link } from "react-router-dom";

const HelloTest = () => {
  return (
    <React.Fragment>
      <h1 align="center" style={{ fontFamily: "Arial" }}>
        Welcome Driver
      </h1>

      <hr size="100px" />
      <CardActions style={{ justifyContent: "center" }}>
        <Button
          variant="outlined"
          color="secondary"
          component={Link}
          to="/orderHistory"
        >
          Order History
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          component={Link}
          to="/onShift"
        >
          Start Shift
        </Button>
        <Button variant="outlined" color="secondary" component={Link} to="/map">
          Restaurant Location
        </Button>
      </CardActions>
    </React.Fragment>
  );
};

export default HelloTest;
