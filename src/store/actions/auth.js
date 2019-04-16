import axios from 'axios'
import * as actionTypes from './actionTypes';

export const authStart = () => {
	return {
		type: actionTypes.AUTH_START
	}
}

export const authSuccess = token => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		token: token
	}
}

export const authFail = error => {
	return {
		type: actionTypes.AUTH_FAIL,
		error: error
	}
}

export const logout = () => {
	window.localStorage.removeItem('user');
	window.localStorage.removeItem('expDate');
	return {
		type: actionTypes.AUTH_LOGOUT
	}
}

export const checkAuthTimeout = expTime => {
	return dispatch => {
		setTimeout(() => {
			dispatch(logout())
		}, expTime * 1000 )
	}
} 

export const authLogin = (email, password, userType) => {
	return dispatch => {
		dispatch(authStart())
		axios.post('http://127.0.0.1:8000/api/'+ userType +'/r/login/', {
			email: email,
			password: password
		})
		.then(res => {
			const token = res.data.key;
			console.log('Logged in!!', res)
			const expDate = new Date(new Date().getTime() + 3600 * 1000)
			window.localStorage.setItem('token', token);
			window.localStorage.setItem('expDate', expDate);
			dispatch(authSuccess(token))
			dispatch(checkAuthTimeout(3600));
		})
		.catch(error => {
			dispatch(authFail(error));
		})
	}
} 

export const authSignupRest = (email, password1, restaurant_name, address) => {
	return dispatch => {
		dispatch(authStart())
		axios.post('http://127.0.0.1:8000/api/restaurant/', {
			"email": email,
			"password": password1,
			"restaurant_name": restaurant_name,
			//"address": address,
			"lat": 39.593555,
			"long": -100.701737
		})
		.then(res => {
			const token = res.data.key;
			const expDate = new Date(new Date().getTime() + 3600 * 1000)
			window.localStorage.setItem('token', token);
			window.localStorage.setItem('expDate', expDate);
			dispatch(authSuccess(token))
			dispatch(checkAuthTimeout(3600));
		})
		.catch(error => {
			dispatch(authFail(error));
			console.log(error)
		})
	}
} 

export const authSignupDriver = (email, password1, phone, ssn, income, date_of_birth, first_name, last_name, car_plate, car_model, location, userType) => {
	return dispatch => {
		dispatch(authStart())
		axios.post('http://127.0.0.1:8000/api/driver/', {
			"email": email,
			"password": password1,
			"phone": phone,
			"ssn": ssn,
			"date_of_birth": date_of_birth,
			"first_name": first_name,
			"last_name": last_name,
			"income": income,
			"car_plate": car_plate,
			"car_model": car_model,
			"location": location
		})
		.then(res => {
			const token = res.data.key;
			const expDate = new Date(new Date().getTime() + 3600 * 1000)
			window.localStorage.setItem('token', token);
			window.localStorage.setItem('expDate', expDate);
			dispatch(authSuccess(token))
			dispatch(checkAuthTimeout(3600));
		})
		.catch(error => {
			dispatch(authFail(error));
			console.log(error)
		})
	}
} 

export const authCheckState = () => {
	return dispatch => {
		const token = window.localStorage.getItem('token');
		console.log(token)
		if (token === undefined) {
			dispatch(logout());
		} else {
			const expDate = new Date(window.localStorage.getItem('expDate'));
			if (expDate <= new Date()) {
				dispatch(logout());
			} else {
				dispatch(authSuccess(token));
				dispatch(checkAuthTimeout( (expDate.getTime() - new Date().getTime()) / 1000))
			}
		}

	}
}


