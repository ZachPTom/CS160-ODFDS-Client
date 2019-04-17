import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import CardActions from "@material-ui/core/CardActions";
import RestHeader from '../components/rest_dashboard_body';

class App extends React.Component {
    state = {
      restaurant: [],
      userToken: window.localStorage.getItem('token')
    };
    getPosts() {
      if(this.state.userToken) {
        var userTokenArr = this.state.userToken.split(':');
        var userType = userTokenArr[0];
        var token = userTokenArr[1];
        axios.post("http://127.0.0.1:8000/api/restaurant/r/dashboard/", {
            "key": token
          })
          //test with: https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/posts.json
          .then(response => {
              console.log(response.data)
            this.setState({
              restaurant: response.data,
              isLoading: false
            });
          })
          .catch(error => this.setState({ error, isLoading: false }));
      }
    }
    componentDidMount() {
      this.getPosts();
    }
    render() {
      const { isLoading, restaurant } = this.state;
      return (
        <React.Fragment>
            <RestHeader/> 

            <hr size="100px" />
            <CardActions style={{ justifyContent: "center" }}>
          <div>
            {!isLoading ? (
            //   posts => {
            //     const { _id, title, content } = restaurant;
            //     return (
                  <div> 
                    <p>{"name: " + this.state.restaurant.restaurant_name}</p>
                    <p>{"email: " + this.state.restaurant.email}</p>
                    <hr />
                  </div>
            //     );
            //   })
            ): (
              <p>Loading...</p>
            )}
          </div>
          </CardActions>
          {/* <h1 align="center" style={{ fontFamily: "roboto" }}>
        Welcome Driver
      </h1>

      <hr size="100px" />
      <CardActions style={{ justifyContent: "center" }}>
        <Button
          variant="outlined"
          color="secondary"
          component={Link}
          to="/orderHistory"
        >
          Order History
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          component={Link}
          to="/onShift"
        >
          Start Shift
        </Button>
        <Button variant="outlined" color="secondary" component={Link} to="/map">
          Restaurant Location
        </Button>
      </CardActions> */}
        </React.Fragment>
      );
    }
  }

export default App;
