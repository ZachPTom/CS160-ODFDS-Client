import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";
import axios from "axios";
import CardActions from "@material-ui/core/CardActions";
import CircularProgress from "@material-ui/core/CircularProgress";
import "typeface-roboto";

class AddressForm extends React.Component {
  constructor() {
    super();
    this.state = {
      price: "",
      street_address: "",
      city: "",
      state: "",
      userToken: window.localStorage.getItem("token"),
      lodaing: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if (this.state.userToken) {
      var userTokenArr = this.state.userToken.split(":");
      var userType = userTokenArr[0];
      var token = userTokenArr[1];
      if (userType === "restaurant") {
        console.log(this.state.userToken);
      } else {
        this.props.history.push("/driver_dashboard");
      }
    } else {
      this.props.history.push("/");
    }
  }

  handleChange = param => event => {
    this.setState({
      [param]: event.target.value
    });
  };
  handleSubmit = e => {
    if (this.state.userToken) {
      e.preventDefault();
      var userTokenArr = this.state.userToken.split(":");
      var userType = userTokenArr[0];
      var token = userTokenArr[1];
      console.log(userTokenArr);
      this.setState({ lodaing: true });
      var location =
        this.state.street_address +
        " " +
        this.state.city +
        " " +
        this.state.state;
      axios
        .get("https://maps.googleapis.com/maps/api/geocode/json", {
          params: {
            address: location,
            key: "AIzaSyCAp9svAAYxNF4P4BXO1-BVQ4lcMCHn09k"
          }
        })
        .then(res => {
          axios
            .post("http://127.0.0.1:8000/api/restaurant/r/post/", {
              lat: res.data.results[0].geometry.location.lat,
              long: res.data.results[0].geometry.location.lng,
              price: this.state.price,
              key: token
            })
            .then(res => {
              console.log(res);
              this.setState({ lodaing: false });
              this.props.history.push("/rest_dashboard");
              alert("Order Posted");
            })
            .catch(error => {
              this.setState({ lodaing: false });
              console.log(error);
            });
        })
        .catch(error => {
          this.setState({ lodaing: false });
          console.log(error);
        });
    }
  };

  render() {
    let currState;
    if (!this.state.lodaing) {
      currState = (
        <form>
          <Typography
            variant="h1"
            gutterBottom
            align="center"
            style={{
              fontFamily: "roboto",
              fontSize: "48px",
              paddingTop: "50px"
            }}
          >
            Order Information
          </Typography>
          <CardActions
            style={{
              justifyContent: "center",
              paddingTop: "45px",
              marginLeft: "auto",
              marginRight: "auto",
              width: "60%"
            }}
          >
            <TextField
              required
              id="price"
              name="price"
              label="Price"
              value={this.state.price}
              fullWidth
              onChange={this.handleChange("price")}
              autoComplete="price"
              variant="outlined"
            />
          </CardActions>

          <CardActions
            style={{
              justifyContent: "center",
              paddingTop: "15px",
              marginLeft: "auto",
              marginRight: "auto",
              width: "60%"
            }}
          >
            <TextField
              required
              id="street_address"
              name="street_address"
              label="Street Adress"
              value={this.state.street_address}
              fullWidth
              onChange={this.handleChange("street_address")}
              autoComplete="Street Adress"
              variant="outlined"
            />
          </CardActions>

          <CardActions
            style={{
              justifyContent: "center",
              paddingTop: "15px",
              marginLeft: "auto",
              marginRight: "auto",
              width: "60%"
            }}
          >
            <TextField
              required
              id="city"
              name="city"
              label="City"
              value={this.state.city}
              fullWidth
              onChange={this.handleChange("city")}
              autoComplete="City"
              variant="outlined"
            />
          </CardActions>

          <CardActions
            style={{
              justifyContent: "center",
              paddingTop: "15px",
              marginLeft: "auto",
              marginRight: "auto",
              width: "60%"
            }}
          >
            <TextField
              required
              id="state"
              name="state"
              label="State"
              value={this.state.state}
              fullWidth
              onChange={this.handleChange("state")}
              autoComplete="State"
              variant="outlined"
            />
          </CardActions>
          <CardActions style={{ justifyContent: "center", paddingTop: "45px" }}>
            <Button
              type="submit"
              variant="contained"
              onClick={this.handleSubmit}
              color="secondary"
              style={{
                maxWidth: "180px",
                maxHeight: "60px",
                minWidth: "180px",
                minHeight: "60px",
                fontSize: "24px"
              }}
            >
              Submit
            </Button>
          </CardActions>
        </form>
      );
    } else {
      currState = (
        <CardActions style={{ justifyContent: "center", paddingTop: "320px" }}>
          <CircularProgress />
        </CardActions>
      );
    }
    return <div>{currState}</div>;
  }
}

export default AddressForm;
