import React from 'react';
import { Route } from 'react-router-dom';

import TestBody from './containers/testbody';
import Login from './containers/login';
import Signup from './containers/signup';



const BaseRouter = () => (
	<div>
		<Route exact path='/' component={TestBody}/>
		<Route exact path='/login/' component={Login}/>
		<Route exact path='/signup/' component={Signup}/>
	</div>
)

export default BaseRouter