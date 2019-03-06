import React from 'react';
import axios from 'axios';

import HelloTest from '../components/test';

class TestBody extends React.Component {

	state = {
		testData: []
	}

	componentDidMount() {
		axios.get('http://127.0.0.1:8000/api/')
			.then(res => {
				this.setState({
					testData: res.data
				})
				//console.log(res.data)
			})
	}

  	render () {
  		return (
  			<HelloTest data={this.state.testData}/>
  		)
  	}
}

export default TestBody;