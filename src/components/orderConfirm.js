import React from "react";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import "typeface-roboto";

const headerStyle = {
  padding: "10px",
  fontSize: "60px",
  fontWeight: "normal",
  fontFamily: "roboto"
};

class OrderConfirmation extends React.Component {
  render() {
    return (
      <div className="listcomponent" style={{ justifyContent: "center" }}>
        <h1 align="center" style={headerStyle}>
          ODFDS
        </h1>
        <h2
          align="center"
          style={{ fontFamily: "roboto", fontWeight: "normal" }}
        >
          You have chosen:
        </h2>
        <h3
          align="center"
          style={{
            fontFamily: "roboto",
            fontSize: "48px",
            paddingTop: "20px"
          }}
        >
          McDonald's
        </h3>
        <h3
          align="center"
          style={{
            fontFamily: "roboto",
            fontWeight: "lighter",
            paddingBottom: "70px"
          }}
        >
          Distance: 1.27mi
        </h3>

        <CardActions style={{ justifyContent: "center" }}>
          <Button
            style={{
              maxWidth: "160px",
              maxHeight: "60px",
              minWidth: "160px",
              minHeight: "60px",
              fontSize: "24px"
            }}
            variant="contained"
            color="primary"
            component={Link}
            to="/testbody"
          >
            Confirm
          </Button>
          <Button
            style={{
              maxWidth: "160px",
              maxHeight: "60px",
              minWidth: "160px",
              minHeight: "60px",
              fontSize: "24px"
            }}
            variant="contained"
            color="secondary"
            component={Link}
            to="/onShift"
          >
            Reselect
          </Button>
        </CardActions>
      </div>
    );
  }
}

export default OrderConfirmation;
