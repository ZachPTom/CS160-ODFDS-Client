import React from 'react';
import { Route } from 'react-router-dom';

import DriverDashboard from './containers/main_driver_dashboard';
import Login from './containers/login';
import RestSignup from './containers/rest_signup';
import RestDashboard from './containers/rest_dashboard';
import DriverSignup from './containers/driver_signup';
import HelloTest from './components/driver_dashboard_body';
import OrderHistory from './components/orderHistory';
import OnShift from './components/onShift';
import MapContainer from './components/map';
import MapContainer2 from './components/map2';
import CurrentLocation from './components/currentLocation';
import Welcome from './components/Welcome';
import AddressForm from './components/order_info';
import Directions from './components/Directions'
import DriverOrderHistory from './components/driverOrderHistory'
import RestLiveMap from './components/restliveMap'



const BaseRouter = () => (
	<div>
		<Route exact path='/' component={Welcome}/>
		<Route exact path='/driver_dashboard/' component={DriverDashboard}/>
		<Route exact path='/login/' component={Login}/>
		<Route exact path='/restaurant_signup/' component={RestSignup}/>
		<Route exact path='/rest_dashboard/' component={RestDashboard}/>
		<Route exact path='/driver_signup/' component={DriverSignup}/>
		<Route exact path="/orders" component={OrderHistory}/>
		<Route exact path="/onShift" component={OnShift}/>			
		<Route exact path="/map" component={MapContainer}/>	
		<Route exact path="/map2" component={MapContainer2}/>	
		<Route exact path="/currentLocation" component={CurrentLocation}/>	
		<Route exact path='/place_order/' component={AddressForm}/>					
		<Route exact path='/Directions/' component={Directions}/>
		<Route exact path='/driverOrderHistory/' component={DriverOrderHistory}/>
		<Route exact path='/orders/:order_id' component={RestLiveMap}/>					

	</div>
)

export default BaseRouter
