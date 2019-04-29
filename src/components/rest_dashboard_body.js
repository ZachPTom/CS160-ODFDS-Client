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

const RestHeader = () => {
  return (
    <React.Fragment>
      <h1 align="center" style={headerStyle}>
        ODFDS
      </h1>
      <h1
        align="center"
        style={{
          fontFamily: "Roboto",
          fontSize: "60px",
          fontWeight: "normal",
          paddingTop: "10px"
        }}
      >
        Welcome Restaurant!
      </h1>

      <hr size="10px" />
      <CardActions style={{ justifyContent: "center", paddingTop: "45px" }}>
        <Button
          style={{
            maxWidth: "240px",
            maxHeight: "60px",
            minWidth: "240px",
            minHeight: "60px",
            fontSize: "24px"
          }}
          variant="contained"
          color="secondary"
          component={Link}
          to="/orders"
          size="large"
        >
          Order History
        </Button>

        <Button
          style={{
            maxWidth: "200px",
            maxHeight: "60px",
            minWidth: "200px",
            minHeight: "60px",
            fontSize: "24px"
          }}
          variant="contained"
          color="secondary"
          component={Link}
          to="/place_order"
          size="large"
        >
          Post Order
        </Button>

        <Button
          style={{
            maxWidth: "340px",
            maxHeight: "60px",
            minWidth: "340px",
            minHeight: "60px",
            fontSize: "24px"
          }}
          variant="contained"
          color="secondary"
          component={Link}
          to="/map"
          size="large"
        >
          Restaurant Location
        </Button>
      </CardActions>
    </React.Fragment>
  );
};

export default RestHeader;
