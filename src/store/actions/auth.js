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

export const authLogin = (username, password) => {
	return dispatch => {
		dispatch(authStart())
		axios.post('http://127.0.0.1:8000/rest-auth/login/', {
			username: username,
			password: password
		})
		.then(res => {
			const token = res.data.key;
			console.log('Logged in!!', token)
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

export const authSignup = (username, email, password1, password2) => {
	return dispatch => {
		dispatch(authStart())
		axios.post('http://127.0.0.1:8000/rest-auth/registration/', {
			username: username,
			email: email,
			password1: password1,
			password2: password2
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

export const authSignupRestaurant = (email, password, phone, restaurant_name, income, address) => {
	return dispatch => {
		dispatch(authStart())
		axios.post('http://127.0.0.1:8000/api/restaurant/', {
			email: email,
			password: password,
			phone: phone,
			restaurant_name: restaurant_name,
			income: income,
			address: address
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


