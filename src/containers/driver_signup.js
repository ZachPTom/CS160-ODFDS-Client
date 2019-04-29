import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import CircularProgress from '@material-ui/core/CircularProgress';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../store/actions/auth';
import Axios from 'axios';


const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

class DriverSignup extends React.Component {

  constructor() {
		 super();
     this.state = {
     	email: '',
     	password1: '',
     	first_name: '',
		last_name: '',
		street_address: '',
		city: '',
		state: '',
		lat: '',
		lng: '',
		address: '',
		userToken: window.localStorage.getItem("token"),
     };
     this.handleChange = this.handleChange.bind(this);
     this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if (this.state.userToken) {
      var userTokenArr = this.state.userToken.split(':');
      var userType = userTokenArr[0];
      var token = userTokenArr[1];
      if(userType === 'driver') {
          this.props.history.push('/driver_dashboard')
	} else{
          this.props.history.push('/rest_dashboard')
        }
    }
  }

  handleChange = param => (event) => {
     this.setState({
      [param]: event.target.value
     })
  }

  handleSubmit = (e) => {
		e.preventDefault();
		console.log(this.state);
		var location = this.state.street_address + ' ' + this.state.city + ' ' + this.state.state
		Axios.get('https://maps.googleapis.com/maps/api/geocode/json',{
			params:{
				address:location,
				key:'AIzaSyCAp9svAAYxNF4P4BXO1-BVQ4lcMCHn09k'
			}
		})
		.then(response => {
			this.setState({
				lat: response.data.results[0].geometry.location.lat
			})
			this.setState({
				lng: response.data.results[0].geometry.location.lng,
				address: location
			})
			console.log(this.state.lat)
			console.log(this.state.lng)
			this.props.onAuth(this.state.email, this.state.password1,
				this.state.first_name, this.state.last_name,
				this.state.lat, this.state.lng, this.state.address)
			.then( res =>{
  					console.log('res here');
  					console.log(res);
			   		alert('Singup successful! You can login now')
			   		this.props.history.push('/login')
			}).catch(error => {
				alert('Please enter correct infromation')
				console.log(error)
			})
		}).catch(error => {
			alert('Please enter correct infromation')
			console.log('error here')
			console.log(error)
		})
	}
	
	

  render () {
	  
	  let errorMessage = null;
	  if (this.props.error) {
	  	errorMessage = (
	  		<p>{this.props.error.message}</p>
	  	)
	  }


	  const { classes } = this.props;

	  return (
	  	<div>
	  		{
	  			//this.props.loading ?

	  			//<CircularProgress className={classes.progress} />

	  			//:

			    <main className={classes.main}>
			      <CssBaseline />
			      <Paper className={classes.paper}>
			        <Avatar className={classes.avatar}>
			          <LockOutlinedIcon />
			        </Avatar>
			        <Typography component="h1" variant="h5">
			          Driver Signup
			        </Typography>
			        <form className={classes.form} onSubmit={this.handleSubmit}>
			          <FormControl margin="normal" required fullWidth>
			            <InputLabel htmlFor="email">Email</InputLabel>
			            <Input id="email" name="email" value={this.state.email} autoFocus onChange={this.handleChange('email')} />
			          </FormControl>
			          <FormControl margin="normal" required fullWidth>
			            <InputLabel htmlFor="password1">Password</InputLabel>
			            <Input name="password1" type="password" id="password1" value={this.state.password1} onChange={this.handleChange('password1')} />
			          </FormControl>
			           <FormControl margin="normal" required fullWidth>
			            <InputLabel htmlFor="first_name">First Name</InputLabel>
			            <Input id="first_name" name="first_name" value={this.state.first_name} onChange={this.handleChange('first_name')} />
			          </FormControl>
			          <FormControl margin="normal" required fullWidth>
			            <InputLabel htmlFor="last_name">Last Name</InputLabel>
			            <Input id="last_name" name="last_name" value={this.state.last_name} onChange={this.handleChange('last_name')} />
			          </FormControl>
						<FormControl margin="normal" required fullWidth>
			            <InputLabel htmlFor="street_address">Street Address</InputLabel>
			            <Input id="street_address" name="street_address" value={this.state.street_address} onChange={this.handleChange('street_address')} />
			          </FormControl>
								<FormControl margin="normal" required fullWidth>
			            <InputLabel htmlFor="city">City</InputLabel>
			            <Input id="city" name="city" value={this.state.city} onChange={this.handleChange('city')} />
			          </FormControl>
								<FormControl margin="normal" required fullWidth>
			            <InputLabel htmlFor="state">State</InputLabel>
			            <Input id="state" name="state" value={this.state.state} onChange={this.handleChange('state')} />
			          </FormControl>							
			          <Button
			            type="submit"
			            fullWidth
			            variant="contained"
			            color="primary"
			            className={classes.submit}
			          >
			            Signup
			          </Button>
			          <Button
			            fullWidth
			            variant="contained"
			            color="primary"
			            className={classes.submit}
			            component={Link}
			            to='/login/'
			          >
			            Login
			          </Button>
			        </form>
			      </Paper>
			    </main>
		   	}
		</div>
	  );

  }
}

DriverSignup.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
	return {
		//loading: state.loading,
		//error: state.error
	}
}

const mapDispatchProps = dispatch => {
	return {
		onAuth: (email, password1, first_name, last_name, lat, lng, address) => 
		dispatch(actions.authSignupDriver(email, password1, first_name, last_name, lat, lng, address))
	}
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchProps)(DriverSignup));



