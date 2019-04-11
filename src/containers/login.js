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
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';

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

class Login extends React.Component {

  constructor() {
     super();
     this.state = {
     	username: '',
     	password: '',
     	userType: '',
     };
     this.handleChangeUser = this.handleChangeUser.bind(this);
     this.handleChangePassword = this.handleChangePassword.bind(this);
     this.handleChangeUserType = this.handleChangeUserType.bind(this);
     this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeUser = (event) => {
     this.setState({username: event.target.value});
  }

  handleChangePassword = (event) => {
     this.setState({password: event.target.value});
  }

  handleChangeUserType = (event) => {
     this.setState({userType: event.target.value});
  }

  handleSubmit = (e) => {
  	e.preventDefault();
  	//console.log(this.state);
  	this.props.onAuth(this.state.username, this.state.password, this.state.userType)
  	this.props.history.push('/testbody')
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
			          Login
			        </Typography>
			        <form className={classes.form} onSubmit={this.handleSubmit}>
			          <FormControl margin="normal" required fullWidth>
			            <InputLabel htmlFor="username">Email</InputLabel>
			            <Input id="username" name="username" value={this.state.username} autoFocus onChange={this.handleChangeUser} />
			          </FormControl>
			          <FormControl margin="normal" required fullWidth>
			            <InputLabel htmlFor="password">Password</InputLabel>
			            <Input name="password" type="password" id="password" value={this.state.password} onChange={this.handleChangePassword} />
			          </FormControl>
			          <FormControl component="fieldset">
			        <FormLabel component="legend">User Type</FormLabel>
			        	<RadioGroup
				          aria-label="position"
				          name="userType"
				          value={this.state.userType}
				          onChange={this.handleChangeUserType}
				          row
				        >
					         <FormControlLabel
					            value="restaurant"
					            control={<Radio color="primary" />}
					            label="Restaurant"
					            labelPlacement="start"
					         />
					         <FormControlLabel
					            value="driver"
					            control={<Radio color="primary" />}
					            label="Driver"
					            labelPlacement="start"
					         />
			        	</RadioGroup>
			        </FormControl>
			          <Button
			            type="submit"
			            fullWidth
			            variant="contained"
			            color="primary"
			            className={classes.submit}
			          >
			            Login
			          </Button>
			          <Button
			            fullWidth
			            variant="contained"
			            color="primary"
			            className={classes.submit}
			            component={Link}
			            to='/restaurant_signup/'
			          >
			            Restaurant Signup
			          </Button>
			          <Button
			            fullWidth
			            variant="contained"
			            color="primary"
			            className={classes.submit}
			            component={Link}
			            to='/driver_signup/'
			          >
			            Driver Signup
			          </Button>
			        </form>
			      </Paper>
			    </main>
		   	}
		</div>
	  );

  }
}

Login.propTypes = {
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
		onAuth: (username, password, userType) => dispatch(actions.authLogin(username, password, userType))
	}
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchProps)(Login));



