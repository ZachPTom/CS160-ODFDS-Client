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
        password: '',
        phone: '',
        restaurant_name: '',
        income: '',
        address: ''
     };
     this.handleChangeEmail = this.handleChangeEmail.bind(this);
     this.handleChangePassword = this.handleChangePassword.bind(this);
     this.handleChangePhone = this.handleChangePhone.bind(this);
     this.handleChangeName = this.handleChangeName.bind(this);
     this.handleChangeIncome = this.handleChangeIncome.bind(this);
     this.handleChangeAddress = this.handleChangeAddress.bind(this);
     this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeEmail = (event) => {
     this.setState({email: event.target.value});
  }

  handleChangePhone = (event) => {
     this.setState({phone: event.target.value});
  }

  handleChangePassword = (event) => {
     this.setState({password: event.target.value});
  }

    handleChangeName = (event) => {
     this.setState({restaurant_name: event.target.value});
  }

  handleChangeIncome = (event) => {
    this.setState({income: event.target.value});
 }

 handleChangeAddress = (event) => {
    this.setState({address: event.target.value});
 }

  handleSubmit = (e) => {
  	e.preventDefault();
  	console.log(this.state);
  	this.props.onAuth(this.state.email, this.state.password, 
  		this.state.phone, this.state.restaurant_name, this.state.income, this.state.address)
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
			            <Input id="email" name="email" value={this.state.email} autoFocus onChange={this.handleChangeEmail} />
			          </FormControl>
			          <FormControl margin="normal" required fullWidth>
			            <InputLabel htmlFor="password">Password</InputLabel>
			            <Input name="password" type="password" id="password" value={this.state.password} onChange={this.handleChangePassword} />
			          </FormControl>
                      <FormControl margin="normal" required fullWidth>
			            <InputLabel htmlFor="phone">Phone</InputLabel>
			            <Input id="phone" name="phone" value={this.state.phone} onChange={this.handleChangePhone} />
			          </FormControl>
			          <FormControl margin="normal" required fullWidth>
			            <InputLabel htmlFor="restaurant_name">Name</InputLabel>
			            <Input name="restaurant_name" id="restaurant_name" value={this.state.restaurant_name} onChange={this.handleChangeName} />
			          </FormControl>
                      <FormControl margin="normal" required fullWidth>
			            <InputLabel htmlFor="income">Income</InputLabel>
			            <Input name="income" id="income" value={this.state.income} onChange={this.handleChangeIncome} />
			          </FormControl>
                      <FormControl margin="normal" required fullWidth>
			            <InputLabel htmlFor="address">Address</InputLabel>
			            <Input name="address" id="address" value={this.state.address} onChange={this.handleChangeAddress} />
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
		onAuth: (email, password, phone, restaurant_name, income, address) => dispatch(actions.authSignupRestaurant(email, password, phone, restaurant_name, income, address))
	}
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchProps)(Signup));