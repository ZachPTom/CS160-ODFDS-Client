import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import CardActions from "@material-ui/core/CardActions";
import RestHeader from "../components/rest_dashboard_body";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import "typeface-roboto";

class App extends React.Component {
  state = {
    restaurant: [],
    userToken: window.localStorage.getItem("token")
  };
  getPosts() {
    if (this.state.userToken) {
      var userTokenArr = this.state.userToken.split(":");
      var userType = userTokenArr[0];
      var token = userTokenArr[1];
      axios
        .post("http://127.0.0.1:8000/api/restaurant/r/dashboard/", {
          key: token
        })
        //test with: https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/posts.json
        .then(response => {
          console.log(response.data);
          this.setState({
            restaurant: response.data,
            isLoading: false
          });
        })
        .catch(error => this.setState({ error, isLoading: false }));
    }
  }
  componentDidMount() {
    if(this.state.userToken){
      var userTokenArr = this.state.userToken.split(":");
      var userType = userTokenArr[0];
      var token = userTokenArr[1];
      if(userType === 'restaurant') {
        this.getPosts();
      } else {
        this.props.history.push('/driver_dashboard')
      }
    } else {
      this.props.history.push('/')
    }
  }
  render() {
    const { isLoading, restaurant } = this.state;
    return (
      <React.Fragment>
        <RestHeader />

        {!isLoading ? (
          //   posts => {
          //     const { _id, title, content } = restaurant;
          //     return (
          <div style={{ paddingTop: "25px" }}>
            <p
              align="center"
              style={{
                fontFamily: "Roboto",
                fontSize: "20px",
                fontWeight: "normal"
              }}
            >
              {"Restaurant Name: " + this.state.restaurant.restaurant_name}
            </p>
            <p
              align="center"
              style={{
                fontFamily: "Roboto",
                fontSize: "20px",
                fontWeight: "normal"
              }}
            >
              {"Restaurant email: " + this.state.restaurant.email}
            </p>
            <p
              align="center"
              style={{
                fontFamily: "Roboto",
                fontSize: "20px",
                fontWeight: "normal"
              }}
            >
              {"Geolocation: " + this.state.restaurant.address}
            </p>
            <CardActions style={{ justifyContent: "center" }}>
              <Button
                align="center"
                variant="outlined"
                color="secondary"
                component={Link}
                to="/map2"
              >
                Directions
              </Button>
            </CardActions>
          </div>
        ) : (
          //     );
          //   })
          <p>Loading...</p>
        )}
      </React.Fragment>
    );
  }
}

export default App;
