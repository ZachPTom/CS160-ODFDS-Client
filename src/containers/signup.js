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

class Signup extends React.Component {

  constructor() {
     super();
     this.state = {
     	email: '',
     	username: '',
     	password1: '',
     	password2: ''
     };
     this.handleChangeUser = this.handleChangeUser.bind(this);
     this.handleChangeEmail = this.handleChangeEmail.bind(this);
     this.handleChangePassword1 = this.handleChangePassword1.bind(this);
     this.handleChangePassword2 = this.handleChangePassword2.bind(this);
     this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeEmail = (event) => {
     this.setState({email: event.target.value});
  }

  handleChangeUser = (event) => {
     this.setState({username: event.target.value});
  }

  handleChangePassword1 = (event) => {
     this.setState({password1: event.target.value});
  }

    handleChangePassword2 = (event) => {
     this.setState({password2: event.target.value});
  }

  handleSubmit = (e) => {
  	e.preventDefault();
  	console.log(this.state);
  	this.props.onAuth(this.state.username, this.state.email, 
  		this.state.password1, this.state.password2)
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
			          Signup
			        </Typography>
			        <form className={classes.form} onSubmit={this.handleSubmit}>
			          <FormControl margin="normal" required fullWidth>
			            <InputLabel htmlFor="email">Email</InputLabel>
			            <Input id="email" name="email" value={this.state.email} autoFocus onChange={this.handleChangeEmail} />
			          </FormControl>
			          <FormControl margin="normal" required fullWidth>
			            <InputLabel htmlFor="username">Username</InputLabel>
			            <Input id="username" name="username" value={this.state.username} onChange={this.handleChangeUser} />
			          </FormControl>
			          <FormControl margin="normal" required fullWidth>
			            <InputLabel htmlFor="password1">Password</InputLabel>
			            <Input name="password1" type="password" id="password1" value={this.state.password1} onChange={this.handleChangePassword1} />
			          </FormControl>
			          <FormControl margin="normal" required fullWidth>
			            <InputLabel htmlFor="password2">Confirm Password</InputLabel>
			            <Input name="password2" type="password" id="password2" value={this.state.password2} onChange={this.handleChangePassword2} />
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

Signup.propTypes = {
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
		onAuth: (username, email, password1, password2) => dispatch(actions.authSignup(username, email, password1, password2))
	}
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchProps)(Signup));



