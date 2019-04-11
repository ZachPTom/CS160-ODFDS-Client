import React from "react";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";
import { Link } from "react-router-dom";

const imgfood = require("../breakfast.png");
const divStyle = {
  width: "100%",
  height: "772px",
  backgroundImage: `url(${imgfood})`,
  backgroundSize: "cover",
  marginTop: "-45px"
};
const headerStyle = {
  padding: "90px",
  color: "#FFFF99",
  fontSize: "80px",
  fontWeight: "normal",
  fontFamily: "roboto"
};
const paraStyle = {
  color: "white",
  fontWeight: "normal",
  fontFamily: "roboto"
};
const buttonStyle = {
  marginTop: "50px",
  fontSize: "20px",
  padding: "20px",
  color: "#FFFF99",
  fontWeight: "normal"
};

class Welcome extends React.Component {
  render() {
    return (
      <div className="welcomponent" style={divStyle}>
        <h1 align="center" style={headerStyle}>
          ODFDS
        </h1>
        <h2 align="center" style={paraStyle}>
          Welcome to a world of revolutionary food delivery. Reimagined, in a
          way that you have never seen before. Join us on this journey of
          getting delicious, mouth-watering food from your favorite restaurant,
          to the tastebuds on people's tongues. <br />
          Become a driver or add your restaurant today!
        </h2>
        <CardActions style={{ justifyContent: "center" }}>
          <Button
            variant="outlined"
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
