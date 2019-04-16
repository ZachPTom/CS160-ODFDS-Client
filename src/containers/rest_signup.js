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

class RestSignup extends React.Component {

  constructor() {
     super();
     this.state = {
     	email: '',
     	password1: '',
     	restaurant_name: '',
     	address: '',

     };
     this.handleChange = this.handleChange.bind(this);
     this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = param => (event) => {
     this.setState({
      [param]: event.target.value
     })
  }

  handleSubmit = (e) => {
  	e.preventDefault();
  	console.log(this.state);
  	this.props.onAuth(this.state.email, this.state.password1,
  		this.state.restaurant_name, this.state.address)
  	this.props.history.push('/')
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
	  		{errorMessage}
	  		{
	  			this.props.loading ?

	  			<CircularProgress className={classes.progress} />

	  			:

			    <main className={classes.main}>
			      <CssBaseline />
			      <Paper className={classes.paper}>
			        <Avatar className={classes.avatar}>
			          <LockOutlinedIcon />
			        </Avatar>
			        <Typography component="h1" variant="h5">
			          Restaurant Signup
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
			            <InputLabel htmlFor="restaurant_name">Restaurant Name</InputLabel>
			            <Input id="restaurant_name" name="restaurant_name" value={this.state.restaurant_name} onChange={this.handleChange('restaurant_name')} />
			          </FormControl>
			          <FormControl margin="normal" required fullWidth>
			            <InputLabel htmlFor="address">Address</InputLabel>
			            <Input id="address" name="address" value={this.state.address} onChange={this.handleChange('address')} />
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

RestSignup.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
	return {
		loading: state.loading,
		error: state.error
	}
}

const mapDispatchProps = dispatch => {
	return {
		onAuth: (email, password1, restaurant_name, address) => 
		dispatch(actions.authSignupRest(email, password1, restaurant_name, address))
	}
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchProps)(RestSignup));



