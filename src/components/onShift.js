import React from 'react';
import axios from 'axios';
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

class orderBody extends React.Component{
  state = {
		driver: []
	}

	componentDidMount() {
		axios.get('http://127.0.0.1:8000/api/driver/r/order/')
			.then(res => {
				this.setState({
					driver: res.data
				})
				console.log(res);
			})
	}

  	render () {
  		return (
			  <div>
          <Button
          variant="outlined"
          color="secondary"
          component={Link}
          to="/testbody"
          >
          Back to Dashboard
        </Button>
				  {/* Display orders */}
				  <h1>ORDERS: </h1>				  
				  <ul className="driver_info">
          			<p className="list-group-item" key={this.state.driver.email}>
            {'Address: ' + this.state.driver.address}
            <br></br>
            {'Price: $' + this.state.driver.total_price}
					</p>
       			  </ul>
			  </div>
  		)
	  }
}

export default orderBody;
