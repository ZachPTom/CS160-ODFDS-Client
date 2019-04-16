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
      price:'',
      street_address: '',
      city: '',
      state:''
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
    // hardcoded
    var location = this.state.street_address + ' ' + this.state.city + ' ' + this.state.state
    axios.get('https://maps.googleapis.com/maps/api/geocode/json',{
      params:{
        address:location,
        key:'AIzaSyCAp9svAAYxNF4P4BXO1-BVQ4lcMCHn09k'
      }
    }).then(res => {
      axios.post('http://127.0.0.1:8000/api/restaurant/r/post/', {
        lat: res.data.results[0].geometry.location.lat,
        long: res.data.results[0].geometry.location.lng,
        price: this.state.price,
        key: window.localStorage.getItem('token')
        //driver_id: 3,
        //order_placed_date_time: 
      })
      .then(res => console.log(res))
      .catch(error => console.log(error))
    })
      .catch(error => console.log(error))



    /*axios.get('https://maps.googleapis.com/maps/api/geocode/json?address=' 
      + this.state.address1 + '&key=AIzaSyDU_NdwIBxkUZGeaOqJWBgRpi_RhvjItic')
    .then( res => //console.log(res))
      axios.post('http://127.0.0.1:8000/api/restaurent/r/post/', {
        rest_id: 22,
        costumer_phone: this.state.phone,
        costumer_address: this.state.address1,
        food: this.state.food,      
        //order_placed_date_time: 
      })
      .then(res => console.log(res))
      .catch(error => console.log(error))
    )
    .catch(error => console.log(error))*/
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
            id="price"
            name="price"
            label="Price"
            value={this.state.price}
            fullWidth
            onChange={this.handleChange('price')}
            autoComplete="price"
          />
          <TextField
            required
            id="street_address"
            name="street_address"
            label="Street Adress"
            value={this.state.street_address}
            fullWidth
            onChange={this.handleChange('street_address')}
            autoComplete="Street Adress"
          />
           <TextField
            required
            id="city"
            name="city"
            label="City"
            value={this.state.city}
            fullWidth
            onChange={this.handleChange('city')}
            autoComplete="City"
          />
           <TextField
            required
            id="state"
            name="state"
            label="State"
            value={this.state.state}
            fullWidth
            onChange={this.handleChange('state')}
            autoComplete="State"
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