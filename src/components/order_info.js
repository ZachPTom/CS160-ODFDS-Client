import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import axios from 'axios'


class AddressForm extends React.Component {

  constructor() {
     super();
     this.state = {
      name: '',
      phone: '',
      food: '',
      address1: ''
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
    axios.post('http://127.0.0.1:8000/api/', {
      costumer_name: this.state.name,
      costumer_phone: this.state.phone,
      costumer_address: this.state.address1,
      food: this.state.food,      
      //order_placed_date_time: 
    })
    .then(res => console.log(res))
    .catch(error => console.log(error))
    //this.props.onAuth(this.state.username, this.state.password)
    //this.props.history.push('/testbody/')
  }

  render () {
  return (
    <form>
      <Typography variant="h6" gutterBottom>
        Order Information
      </Typography>
          <TextField
            required
            id="name"
            name="name"
            label="Name"
            value={this.state.name}
            fullWidth
            onChange={this.handleChange('name')}
            autoComplete="fname"
          />
          <TextField
            required
            id="phone"
            name="phone"
            label="Phone"
            value={this.state.phone}
            fullWidth
            onChange={this.handleChange('phone')}
            autoComplete="phone"
          />
          <TextField
            required
            id="food"
            name="food"
            label="Food"
            value={this.state.food}
            fullWidth
            onChange={this.handleChange('food')}
            autoComplete="food"
          />
          <TextField
            required
            id="address1"
            name="address1"
            label="Address line 1"
            value={this.state.address1}
            fullWidth
            onChange={this.handleChange('address1')}
            autoComplete="billing address-line1"
          />
        <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  onClick={this.handleSubmit}
                  color="primary"
                >
                  Submit
        </Button>
      </form>
  );
}
}

export default AddressForm;