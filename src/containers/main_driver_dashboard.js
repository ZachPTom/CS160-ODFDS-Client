import React from 'react';
import axios from 'axios';
import HelloTest from '../components/driver_dashboard_body';

class driver_dashboard extends React.Component {

	state = {
		driver: [],
		userToken: window.localStorage.getItem('token')
	}

	componentDidMount() {
		if(this.state.userToken) {
			var userTokenArr = this.state.userToken.split(':');
	      	var userType = userTokenArr[0];
	      	var token = userTokenArr[1];
			axios.post('http://127.0.0.1:8000/api/driver/r/dashboard/', {
				key: token
			})
				.then(res => {
					this.setState({
						driver: res.data
					})
					console.log(res);
				})
		}
	}

  	render () {
  		return (
			  <div>

				  {/*Import main page with buttons (Order History, Start Shift, etc..*/}
				  <HelloTest />

				  {/* Display data of driver on the dashboard */}
				  <h1>Your Profile</h1>				  
				  <ul className="driver_info">
          			<p className="list-group-item" key={this.state.driver.email}>
						{'Name: ' + this.state.driver.first_name + ' ' + this.state.driver.last_name}
						<br></br>
						{'Email: ' + this.state.driver.email}
						<br></br>
						{'Location: ' + this.state.driver.location}
					</p>
       			  </ul>
			  </div>
  		)
	  }
}

export default driver_dashboard;