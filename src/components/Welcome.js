import React from "react";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";
import { Link } from "react-router-dom";
import "typeface-roboto";

const imgfood = require("../breakfast.png");
const divStyle = {
  width: "100%",
  height: "550px",
  backgroundImage: `url(${imgfood})`,
  backgroundSize: "cover",
  marginTop: "-85px"
};
const headerStyle = {
  paddingTop: "190px",
  color: "#FFFF99",
  fontSize: "120px",
  fontWeight: "normal",
  fontFamily: "roboto"
};
const paraStyle = {
  paddingTop: "210px",
  fontWeight: "300",
  fontFamily: "roboto"
};
const buttonStyle = {
  marginTop: "50px",
  fontSize: "20px",
  padding: "20px",
  fontWeight: "normal",
  marginBottom: "40px"
};

class Welcome extends React.Component {
  render() {
    return (
      <div fullWidth style={divStyle}>
        <h1 align="center" style={headerStyle}>
          ODFDS
        </h1>
        <h2 align="center" style={paraStyle}>
          Welcome to a world of revolutionary food delivery. Reimagined, in a
          way that you have never seen before. <br /> Join us on this journey of
          getting delicious, mouth-watering food from your favorite restaurant,{" "}
          <br />
          to the tastebuds on people's tongues. <br />
          Become a driver or add your restaurant today!
        </h2>
        <CardActions style={{ justifyContent: "center" }}>
          <Button
            variant="contained"
            color="secondary"
            component={Link}
            to="/login"
            style={buttonStyle}
          >
            Login/Register
          </Button>
        </CardActions>
      </div>
    );
  }
}

export default Welcome;
