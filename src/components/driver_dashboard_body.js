import React from "react";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";
import { Link } from "react-router-dom";
import "typeface-roboto";

const headerStyle = {
  color: "#880044",
  fontSize: "80px",
  fontWeight: "normal",
  fontFamily: "roboto"
};

const HelloTest = () => {
  return (
    <React.Fragment>
      <h1 align="center" style={headerStyle}>
        ODFDS
      </h1>
      <h1
        align="center"
        style={{
          fontFamily: "roboto",
          fontSize: "60px",
          fontWeight: "normal",
          paddingTop: "10px"
        }}
      >
        Welcome Driver!
      </h1>

      <hr size="100px" />
      <CardActions style={{ justifyContent: "center", paddingTop: "45px" }}>
        <Button
          style={{
            maxWidth: "220px",
            maxHeight: "60px",
            minWidth: "230px",
            minHeight: "60px",
            fontSize: "24px"
          }}
          variant="contained"
          color="secondary"
          component={Link}
          to="/driverOrderHistory"
        >
          Order History
        </Button>
        <Button
          style={{
            maxWidth: "190px",
            maxHeight: "60px",
            minWidth: "190px",
            minHeight: "60px",
            fontSize: "24px"
          }}
          variant="contained"
          color="secondary"
          component={Link}
          to="/onShift"
        >
          Start Shift
        </Button>
        <Button
          style={{
            maxWidth: "320px",
            maxHeight: "60px",
            minWidth: "320px",
            minHeight: "60px",
            fontSize: "24px"
          }}
          variant="contained"
          color="secondary"
          component={Link}
          to="/map2"
        >
          Restaurant Location
        </Button>
      </CardActions>
    </React.Fragment>
  );
};

export default HelloTest;
