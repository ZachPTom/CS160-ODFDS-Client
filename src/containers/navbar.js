import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class ButtonAppBar extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" color="inherit" className={classes.grow} component={Link} to="/">
            Home
            </Typography>
            {
              this.props.isAuthenticated ?
              <Button color="inherit" onClick={this.props.logout} component={Link} to="/login/"> Logout</Button>
              :
              <Button color="inherit" component={Link} to="/login/">Login</Button>
            }
          </Toolbar>
        </AppBar>
        {this.props.children}
      </div>
    );
  }
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapDispatchProps = dispatch => {
  return {
    logout: () => dispatch(actions.logout())
  }
}

export default withRouter(withStyles(styles)(connect(null, mapDispatchProps)(ButtonAppBar)));

