import React from 'react';
import axios from 'axios';
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';


const styles = theme => ({
	   root: {
	   width: '100%',
	   maxWidth: 360,
	   backgroundColor: theme.palette.background.paper,
	},
});

class orderBody extends React.Component{

	constructor() {
	     super();
	     this.state = {
	     	selected: '',
	     	selected2: '',
	     	secondOrderList: [],
	     	firstState: true,
	     	secondState: false,
	     	finalState: false,
	     	orders: [],
			userToken: window.localStorage.getItem('token')
	     };
	     this.handleChange = this.handleChange.bind(this);
	     this.handleSubmit = this.handleSubmit.bind(this);
  	}

	handleChange = (event) => {
     this.setState({
      	selected : event.currentTarget.dataset.id
     })
  	}

  	handleChange2 = (event) => {
     this.setState({
      	selected2 : event.currentTarget.dataset.id
     })
  	}

	componentDidMount() {
		if(this.state.userToken) {
	        var userTokenArr = this.state.userToken.split(':');
	        var userType = userTokenArr[0];
	        var token = userTokenArr[1];
			axios.post('http://127.0.0.1:8000/api/driver/r/order/', {
	            key: token
	         })
			.then(res => {
					this.setState({
						orders: res.data
					})
					console.log(res);
			})
			.catch(error => console.log(error));
		}
	}

	handleSubmit = (e) => {
		e.preventDefault();
		if(this.state.selected) {
			console.log(this.state.selected);
			if(this.state.userToken) {
				var userTokenArr = this.state.userToken.split(':');
		        var userType = userTokenArr[0];
		        var token = userTokenArr[1];
		        console.log(userType);
				axios.post('http://127.0.0.1:8000/api/driver/r/first_acceptation/', {
		            key: token,
		            order_id: this.state.selected
		         })
				.then(res => {
					this.setState({firstState: false});
					console.log(res)
					if(res.data.length !== 0) {
						this.state.secondOrderList = res.data;
						this.setState({secondState: true});
					} else {
						this.setState({finalState: true});
					}
				})
				.catch(error => console.log(error));
			}
		} else {
			alert("Choose one order")
		}
	}

	handleSubmitSecond = (e) => {
		e.preventDefault();
		if(this.state.selected2) {
			console.log(this.state.selected2);
			if(this.state.userToken) {
				var userTokenArr = this.state.userToken.split(':');
		        var userType = userTokenArr[0];
		        var token = userTokenArr[1];
		        console.log(userType);
				axios.post('http://127.0.0.1:8000/api/driver/r/first_acceptation/', {
		            key: token,
		            order_id: this.state.selected2
		         })
				.then(res => {
					console.log(res)
					this.setState({secondState: false});
					this.setState({finalState: true});
				})
				.catch(error => console.log(error));
			}
		} else {
			alert("Choose one order")
		}
	}

	handlePicked = (e) => {
		e.preventDefault();
		if(this.state.selected) {
			console.log(this.state.selected);
			if(this.state.userToken) {
				var userTokenArr = this.state.userToken.split(':');
		        var userType = userTokenArr[0];
		        var token = userTokenArr[1];
		        console.log(userType);
				axios.post('http://127.0.0.1:8000/api/driver/r/confirmation/', {
		            key: token,
		            order_id: this.state.selected
		         })
				.then(res => {
					console.log(res)
					this.setState({finalState: false});
				})
				.catch(error => console.log(error));
			}
		}
	}

	render() {
		const firstState = this.state.firstState;
		const secondState = this.state.secondState;
		const finalState = this.state.finalState;
		let orderPage;
	    	if(firstState)
	    	{
				orderPage = <div>
		          <Button
		          variant="outlined"
		          color="secondary"
		          component={Link}
		          to="/driver_dashboard"
		          >
		          Back to Dashboard
		        </Button>
					  {/* Display orders */}
					  <h1>ORDERS: </h1>
		        <List>
			        {this.state.orders.map(d => <ListItem data-id={d.id} onClick={this.handleChange} key={d.id} button>
			        	<ListItemText primary={"Price: " + d.total_price + "\tAddress: " + d.address}/>
			        </ListItem>)}
			     </List>
			     <Button
				    type="submit"
				    fullWidth
				    variant="contained"
				    color="primary"
				    onClick={this.handleSubmit}
				 >
				    Confirm
				  </Button>
				</div>
		    } else if (secondState) {
		    	orderPage = <div>
		          <Button
		          variant="outlined"
		          color="secondary"
		          component={Link}
		          to="/driver_dashboard"
		          >
		          Back to Dashboard
		        </Button>
					  {/* Display orders */}
					  <h1>ORDERS FROM SAME PLACE: </h1>
		        <List>
			        {this.state.secondOrderList.map(d => <ListItem data-id={d.id} onClick={this.handleChange2} key={d.id} button>
			        	<ListItemText primary={"Price: " + d.total_price + "\tAddress: " + d.address}/>
			        </ListItem>)}
			     </List>
			     <Button
				    type="submit"
				    fullWidth
				    variant="contained"
				    color="primary"
				    onClick={this.handleSubmitSecond}
				 >
				    Confirm
				</Button>
		      </div>
		    } else {
		    	orderPage = <div>
		         <Button
			          variant="outlined"
			          color="secondary"
			          component={Link}
			          to="/driver_dashboard"
			          >
			          Back to Dashboard
		        </Button>
		    	<Button
				    type="submit"
				    fullWidth
				    variant="contained"
				    color="primary"
				    onClick={this.handlePicked}
				    to="/driver_dashboard"
				 >
				    Order Picked
				</Button>
				</div>
		    }
	    return (
	    	<div>
	    	{orderPage}
	    	</div>
	    );
	  }
}

export default withStyles(styles)(orderBody);
