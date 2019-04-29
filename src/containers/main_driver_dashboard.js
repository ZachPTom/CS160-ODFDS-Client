import React from "react";
import axios from "axios";
import HelloTest from "../components/driver_dashboard_body";
import CardActions from "@material-ui/core/CardActions";

class driver_dashboard extends React.Component {
  state = {
    driver: [],
    userToken: window.localStorage.getItem("token")
  };

  componentDidMount() {
    if (this.state.userToken) {
      var userTokenArr = this.state.userToken.split(':');
      var userType = userTokenArr[0];
      var token = userTokenArr[1];
      if(userType === 'driver') {
        var userTokenArr = this.state.userToken.split(":");
        var userType = userTokenArr[0];
        var token = userTokenArr[1];
        axios
          .post("http://127.0.0.1:8000/api/driver/r/dashboard/", {
            key: token
          })
          .then(res => {
            this.setState({
              driver: res.data
            });
            console.log(res);
          });
        }
        else{
          this.props.history.push('/rest_dashboard')
        }
    } else {
      this.props.history.push('/')
    }
  }

  render() {
    return (
      <div>
        {/*Import main page with buttons (Order History, Start Shift, etc..*/}
        <HelloTest />

        {/* Display data of driver on the dashboard */}
        <CardActions style={{ justifyContent: "center", paddingTop: "20px" }}>
          <h1
            style={{
              fontFamily: "Roboto",
              fontSize: "30px"
            }}
          >
            Profile:
          </h1>
          <ul className="driver_info">
            <p
              style={{
                fontFamily: "Roboto",
                fontSize: "20px",
                fontWeight: "normal"
              }}
              className="list-group-item"
              key={this.state.driver.email}
            >
              {"Driver Name: " +
                this.state.driver.first_name +
                " " +
                this.state.driver.last_name}
              <br />
              {"email: " + this.state.driver.email}
              <br />
              {"Location: " + this.state.driver.location}
            </p>
          </ul>
        </CardActions>
      </div>
    );
  }
}

export default driver_dashboard;
