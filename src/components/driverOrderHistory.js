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
      if (userType === "driver") {
        axios
          .post("http://127.0.0.1:8000/api/driver/r/history/", {
            key: token
          })
          .then(res => {
            console.log(res);
            this.setState({ orders: res.data });
          })
          .catch(error => console.log(error));
      } else {
        this.props.history.push("/rest_dashboard");
      }
    } else {
      this.props.history.push("/");
    }
  }

  render() {
    let orderPage = (
      <div>
        <h1
          align="center"
          style={{
            justifyContent: "center",
            fontFamily: "roboto",
            fontSize: "60px",
            fontWeight: "300"
          }}
        >
          {" "}
          Completed Orders
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
                <ListItem data-id={d.id} key={d.id}>
                  <ListItemText
                    primary={
                      "Order ID: " + d.id + " • Item Price: $" + d.food_price + " • Delivery Fee: $" + d.total_price + " • \tTime: " + d.time
                    }
                  />
                </ListItem>
                <Divider />
              </div>
            ))}
          </List>
        </CardActions>
      </div>
    );
    return <div>{orderPage}</div>;
  }
}

export default withStyles(styles)(OrderHistory);
