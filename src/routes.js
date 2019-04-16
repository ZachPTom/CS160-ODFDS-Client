import React from 'react';
import { Route } from 'react-router-dom';

import TestBody from './containers/testbody';
import Login from './containers/login';
import RestSignup from './containers/rest_signup';
import RestDashboard from './containers/rest_dashboard';
import DriverSignup from './containers/driver_signup';
import HelloTest from './components/test';
import OrderHistory from './components/orderHistory';
import OnShift from './components/onShift';
import MapContainer from './components/map';
import CurrentLocation from './components/currentLocation';
import Welcome from './components/Welcome';
import AddressForm from './components/order_info';


const BaseRouter = () => (
	<div>
		<Route exact path='/' component={Welcome}/>
		<Route exact path='/testbody/' component={TestBody}/>
		<Route exact path='/login/' component={Login}/>
		<Route exact path='/restaurant_signup/' component={RestSignup}/>
		<Route exact path='/rest_dashboard/' component={RestDashboard}/>
		<Route exact path='/driver_signup/' component={DriverSignup}/>
		<Route exact path="/orderHistory" component={OrderHistory}/>
		<Route exact path="/onShift" component={OnShift}/>			
		<Route exact path="/map" component={MapContainer}/>	
		<Route exact path="/currentLocation" component={CurrentLocation}/>	
		<Route exact path='/place_order/' component={AddressForm}/>					
	</div>
)

export default BaseRouter
