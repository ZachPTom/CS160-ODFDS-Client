import React from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
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
import Grid from "@material-ui/core/Grid";
import CardActions from "@material-ui/core/CardActions";
import "typeface-roboto";

const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
});

class OrderHistory extends React.Component {
  constructor() {
    super();
    this.state = {
      s1: [],
      s3: [],
      s4: [],
      orders: [],
      userToken: window.localStorage.getItem("token")
    };
    //this.handleChange = this.handleChange.bind(this);
    //this.handleSubmit = this.handleSubmit.bind(this);
  }

  /*handleChange = (event) => {
     this.setState({
      	selected : event.currentTarget.dataset.id
     })
  	}

  	handleChange2 = (event) => {
     this.setState({
      	selected2 : event.currentTarget.dataset.id
     })
  	}*/

  componentDidMount() {
    if (this.state.userToken) {
      var userTokenArr = this.state.userToken.split(":");
      var userType = userTokenArr[0];
      var token = userTokenArr[1];
      if (userType === "restaurant") {
        axios
          .post("http://127.0.0.1:8000/api/restaurant/r/order/", {
            key: token
          })
          .then(res => {
            console.log(res);
            var orders = res.data;
            var s1Array = [];
            var s3Array = [];
            var s4Array = [];
            for (var i = 0; i < orders.length; i++) {
              console.log(orders[i]);
              if (orders[i].status === "S1" || orders[i].status === "S2") {
                s1Array.push(orders[i]);
                this.setState({ s1: s1Array });
                console.log("s1");
              } else if (orders[i].status === "S3") {
                s3Array.push(orders[i]);
                this.setState({ s3: s3Array });
              } else if (orders[i].status === "S4") {
                s4Array.push(orders[i]);
                this.setState({ s4: s4Array });
              }
            }
          })
          .catch(error => console.log(error));
      } else {
        this.props.history.push("/driver_dashboard");
      }
    } else {
      this.props.history.push("/");
    }
  }

  popLiveMap = e => {
    e.preventDefault();
    if (this.state.selected) {
      console.log(this.state.selected);
      if (this.state.userToken) {
        var userTokenArr = this.state.userToken.split(":");
        var userType = userTokenArr[0];
        var token = userTokenArr[1];
        console.log(userType);
        var order_ids = [];
        if (this.state.selected) {
          order_ids.push(this.state.selected);
        }
        if (this.state.selected2) {
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
    let orderPage = (
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
          Orders
        </h1>
        <Grid container spacing={8}>
          <Grid item xs={12} sm={4}>
            <h3
              align="center"
              style={{
                justifyContent: "center",
                fontFamily: "roboto",
                fontSize: "24px",
                fontWeight: "400"
              }}
            >
              Posted Orders
            </h3>
            <List>
              <Divider />
              {this.state.s1.map(d => (
                <div>
                  <ListItem data-id={d.id} key={d.id}>
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
          </Grid>
          <Grid item xs={12} sm={4}>
            <h3
              align="center"
              style={{
                justifyContent: "center",
                fontFamily: "roboto",
                fontSize: "24px",
                fontWeight: "400"
              }}
            >
              Live Orders
            </h3>
            <List>
              <Divider />
              {this.state.s3.map(d => (
                <div>
                  <ListItem data-id={d.id} key={d.id} button>
                    <Link to={"/orders/" + d.id}>
                      <ListItemText
                        primary={
                          "Price: " + d.total_price + "\tAddress: " + d.address
                        }
                      />
                    </Link>
                  </ListItem>
                  <Divider />
                </div>
              ))}
            </List>
          </Grid>
          <Grid item xs={12} sm={4}>
            <h3
              align="center"
              style={{
                justifyContent: "center",
                fontFamily: "roboto",
                fontSize: "24px",
                fontWeight: "400"
              }}
            >
              {" "}
              Completed Orders
            </h3>
            <List>
              <Divider />
              {this.state.s4.map(d => (
                <div>
                  <ListItem data-id={d.id} key={d.id}>
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
          </Grid>
        </Grid>
      </div>
    );
    return <div>{orderPage}</div>;
  }
}

export default withStyles(styles)(OrderHistory);
