import React from 'react';
import { Route } from 'react-router-dom';

import TestBody from './containers/testbody';
import Login from './containers/login';
import Signup from './containers/signup';
import HelloTest from './components/test';
import OrderHistory from './components/orderHistory';
import OnShift from './components/onShift';
import MapContainer from './components/map';
import Welcome from './components/Welcome';
import AddressForm from './components/order_info';


const BaseRouter = () => (
	<div>
		<Route exact path='/' component={Welcome}/>
		<Route exact path='/testbody/' component={TestBody}/>
		<Route exact path='/login/' component={Login}/>
		<Route exact path='/signup/' component={Signup}/>
		<Route exact path="/orderHistory" component={OrderHistory}/>
		<Route exact path="/onShift" component={OnShift}/>			
		<Route exact path="/map" component={MapContainer}/>	
		<Route exact path='/place_order/' component={AddressForm}/>					
	</div>
)

export default BaseRouter
