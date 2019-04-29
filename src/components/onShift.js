import React from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import InboxIcon from "@material-ui/icons/Inbox";
import DraftsIcon from "@material-ui/icons/Drafts";

const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
});

class orderBody extends React.Component {
  constructor() {
    super();
    this.state = {
      selected: window.localStorage.getItem("firstOrder") || "",
      selected2: window.localStorage.getItem("secondOrder") || "",
      secondOrderList:
        JSON.parse(window.localStorage.getItem("secondOrderList")) || [],
      firstState: window.localStorage.getItem("firstState") || "true",
      secondState: window.localStorage.getItem("secondState") || "false",
      finalState: window.localStorage.getItem("finalState") || "false",
      lockState: window.localStorage.getItem("lockState") || "false",
      orders: [],
      userToken: window.localStorage.getItem("token")
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    console.log(this.state.secondOrderList);
  }
  handleChange = event => {
    this.setState({
      selected: event.currentTarget.dataset.id
    });
  };

  handleChange2 = event => {
    this.setState({
      selected2: event.currentTarget.dataset.id
    });
  };

  componentDidMount() {
    if (this.state.userToken && this.state.firstState) {
      var userTokenArr = this.state.userToken.split(":");
      var userType = userTokenArr[0];
      var token = userTokenArr[1];
      if (userType === "driver") {
        axios
          .post("http://127.0.0.1:8000/api/driver/r/order/", {
            key: token
          })
          .then(res => {
            this.setState({
              orders: res.data
            });
            console.log(res);
          })
          .catch(error => console.log(error));
      } else {
        this.props.history.push("/rest_dashboard");
      }
    } else {
      this.props.history.push("/");
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.selected) {
      console.log(this.state.selected);
      if (this.state.userToken) {
        var userTokenArr = this.state.userToken.split(":");
        var userType = userTokenArr[0];
        var token = userTokenArr[1];
        console.log(userType);
        axios
          .post("http://127.0.0.1:8000/api/driver/r/first_acceptation/", {
            key: token,
            order_id: this.state.selected
          })
          .then(res => {
            console.log(res);
            window.localStorage.setItem("firstOrder", this.state.selected);
            window.localStorage.setItem("buttons", 1);
            if (res.data.length !== 0) {
              window.localStorage.setItem("secondState", "true");
              window.localStorage.setItem(
                "secondOrderList",
                JSON.stringify(res.data)
              );
              this.setState({ secondOrderList: res.data });
              this.setState({ secondState: "true" });
              this.setState({ firstState: "false" });
              window.localStorage.setItem("firstState", "false");
            } else {
              this.setState({ finalState: "true" });
              window.localStorage.setItem("finalState", "true");
              window.localStorage.setItem("firstState", "false");
              this.setState({ firstState: "false" });
            }
          })
          .catch(error => console.log(error));
      }
    } else {
      alert("Choose one order");
    }
  };

  handleSubmitSecond = e => {
    e.preventDefault();
    if (this.state.selected2) {
      console.log(this.state.selected2);
      if (this.state.userToken) {
        var userTokenArr = this.state.userToken.split(":");
        var userType = userTokenArr[0];
        var token = userTokenArr[1];
        console.log(userType);
        axios
          .post("http://127.0.0.1:8000/api/driver/r/first_acceptation/", {
            key: token,
            order_id: this.state.selected2
          })
          .then(res => {
            console.log(res);
            window.localStorage.setItem("secondOrder", this.state.selected2);
            window.localStorage.setItem("buttons", 2);
            window.localStorage.setItem("secondState", "false");
            window.localStorage.setItem("finalState", "true");
            this.setState({ secondState: "false" });
            this.setState({ finalState: "true" });
          })
          .catch(error => console.log(error));
      }
    } else {
      alert("Choose one order");
    }
  };

  handleSkip = e => {
    e.preventDefault();
    if (this.state.secondState == "true") {
      console.log(this.state.secondState);
      if (this.state.userToken) {
        window.localStorage.setItem("secondState", "false");
        window.localStorage.setItem("finalState", "true");
        this.setState({ secondState: "false" });
        this.setState({ finalState: "true" });
        this.setState({ selected2: "" });
      }
    }
  };

  handlePicked = e => {
    e.preventDefault();
    if (this.state.selected) {
      console.log(this.state.selected);
      if (this.state.userToken) {
        var userTokenArr = this.state.userToken.split(":");
        var userType = userTokenArr[0];
        var token = userTokenArr[1];
        console.log(userType);
        var order_ids = [];
        if (this.state.selected !== "") {
          order_ids.push(this.state.selected);
        }
        if (this.state.selected2 !== "") {
          order_ids.push(this.state.selected2);
        }
        if (order_ids.length !== 0) {
          axios
            .post("http://127.0.0.1:8000/api/driver/r/confirmation/", {
              key: token,
              order_id: order_ids
            })
            .then(res => {
              console.log(res);
              window.localStorage.setItem("finalState", "false");
              window.localStorage.setItem("lockState", "true");
              this.setState({ finalState: "false" });
              this.setState({ lockState: "true" });
              this.props.history.push("/driver_dashboard");
            })
            .catch(error => console.log(error));
        }
      }
    }
  };

  render() {
    const firstState = this.state.firstState;
    const secondState = this.state.secondState;
    const finalState = this.state.finalState;
    let orderPage;
    if (firstState === "true") {
      orderPage = (
        <div>
          {/* Display orders */}
          <h1
            align="center"
            style={{
              fontFamily: "roboto",
              fontSize: "60px",
              fontWeight: "300"
            }}
          >
            Order List{" "}
          </h1>
          <CardActions
            style={{
              justifyContent: "center",
              marginLeft: "auto",
              marginRight: "auto"
            }}
          >
            <List>
              <Divider />
              {this.state.orders.map(d => (
                <div>
                  {" "}
                  <ListItem
                    data-id={d.id}
                    onClick={this.handleChange}
                    key={d.id}
                    button
                  >
                    <ListItemText
                      primary={
                        "Price: " + d.total_price + "\tAddress: " + d.address
                      }
                    />
                  </ListItem>
                  <Divider />
                </div>
              ))}
            </List>
          </CardActions>
          <CardActions style={{ justifyContent: "center", paddingTop: "45px" }}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              onClick={this.handleSubmit}
              style={{
                maxWidth: "140px",
                maxHeight: "50px",
                minWidth: "140px",
                minHeight: "50px",
                fontSize: "24px"
              }}
            >
              Confirm
            </Button>
          </CardActions>
        </div>
      );
    } else if (secondState === "true") {
      orderPage = (
        <div>
          {/* Display orders */}
          <h1
            align="center"
            style={{
              fontFamily: "roboto",
              fontSize: "60px",
              fontWeight: "300"
            }}
          >
            Orders from same place:{" "}
          </h1>
          <CardActions
            style={{
              justifyContent: "center",
              marginLeft: "auto",
              marginRight: "auto"
            }}
          >
            <List>
              <Divider />
              {this.state.secondOrderList.map(d => (
                <div>
                  {" "}
                  <ListItem
                    data-id={d.id}
                    onClick={this.handleChange2}
                    key={d.id}
                    button
                  >
                    <ListItemText
                      primary={
                        "Price: " + d.total_price + "\tAddress: " + d.address
                      }
                    />
                  </ListItem>
                  <Divider />
                </div>
              ))}
            </List>
          </CardActions>
          <CardActions style={{ justifyContent: "center", paddingTop: "45px" }}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              onClick={this.handleSubmitSecond}
              style={{
                maxWidth: "140px",
                maxHeight: "50px",
                minWidth: "140px",
                minHeight: "50px",
                fontSize: "24px"
              }}
            >
              Confirm
            </Button>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={this.handleSkip}
              style={{
                maxWidth: "140px",
                maxHeight: "50px",
                minWidth: "140px",
                minHeight: "50px",
                fontSize: "24px"
              }}
            >
              Skip
            </Button>
          </CardActions>
        </div>
      );
    } else if (finalState === "true") {
      orderPage = (
        <div>
          <CardActions style={{ justifyContent: "center", paddingTop: "45px" }}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={this.handlePicked}
              to="/driver_dashboard"
              style={{
                maxWidth: "180px",
                maxHeight: "50px",
                minWidth: "140px",
                minHeight: "50px",
                fontSize: "20px"
              }}
            >
              Order Picked
            </Button>
          </CardActions>
        </div>
      );
    } else {
      orderPage = (
        <div>
          <h1>Deliver the order first to see more orders</h1>
        </div>
      );
    }
    return <div>{orderPage}</div>;
  }
}

export default withStyles(styles)(orderBody);
