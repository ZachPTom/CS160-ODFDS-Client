import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import { Avatar } from "@material-ui/core";
import pink from "@material-ui/core/colors/pink";
import { Link } from "react-router-dom";
import "typeface-roboto";

const headerStyle = {
  padding: "10px",
  fontSize: "60px",
  fontWeight: "normal",
  fontFamily: "roboto"
};

class OrderListMain extends React.Component {
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
          Here are the available orders
        </h2>
        <h3
          align="center"
          style={{ fontFamily: "roboto", fontWeight: "lighter" }}
        >
          Go ahead and choose the one you like
        </h3>
        <List component="nav">
          <ListItem button component={Link} to="/orderConfirm">
            <Avatar style={{ backgroundColor: pink[500] }}>1</Avatar>
            <ListItemText primary="McDonald's" secondary="Distance: 1.27mi" />
          </ListItem>
          <Divider />
          <ListItem button>
            <Avatar style={{ backgroundColor: pink[500] }}>2</Avatar>
            <ListItemText
              primary="Panda Express"
              secondary="Distance: 1.58mi"
            />
          </ListItem>
          <Divider />
          <ListItem button>
            <Avatar style={{ backgroundColor: pink[500] }}>3</Avatar>
            <ListItemText primary="Taco Bell" secondary="Distance: 3.14mi" />
          </ListItem>
          <Divider />
          <ListItem button>
            <Avatar style={{ backgroundColor: pink[500] }}>4</Avatar>
            <ListItemText
              primary="La Victoria's"
              secondary="Distance: 4.09mi"
            />
          </ListItem>
          <Divider />
          <ListItem button>
            <Avatar style={{ backgroundColor: pink[500] }}>5</Avatar>
            <ListItemText
              primary="Nick the Greek"
              secondary="Distance: 4.56mi"
            />
          </ListItem>
        </List>
      </div>
    );
  }
}

export default OrderListMain;
