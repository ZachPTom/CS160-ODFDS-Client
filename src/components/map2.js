import React, { Component } from 'react';
import { Map, Polyline, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import Axios from 'axios';
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";

const mapStyles = {
  width: '50%',
  height: '100%'
};

const divStyle = {
  float: 'right',
  width: '40%'
};

const buttonStyle = {
  float: 'right',
  width: '40%',
  zIndex: 1

};

export class MapContainer extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          coords: [],
          destination: {},
          destination_name: '',
          showingInfoWindow: true,
          activeMarker: {},
          selectedPlace: {},
          items: '<h1> Directions </h1>',
          userToken: window.localStorage.getItem('token'),
          buttons: window.localStorage.getItem('buttons') || -1
        };

    }

    onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

    onClose = props => {
      if (this.state.showingInfoWindow) {
        this.setState({
          showingInfoWindow: false,
          activeMarker: null
        });
      }
    };

    componentDidMount() {
      if(this.state.userToken){
        var userTokenArr = this.state.userToken.split(':');
        var userType = userTokenArr[0];
        var token = userTokenArr[1];
        if(userType === 'driver') {
          this.getOrderAddress();
          this.getDirections("37.333911,-121.881848", "37.348118,-121.899085");
          console.log(this.state.destination)
        } else{
          this.props.history.push('/rest_dashboard')
        }
      } else {
        this.props.history.push('/')
      }
    }

    getOrderAddress() {
      if(this.state.userToken) {
        var userTokenArr = this.state.userToken.split(':');
        var userType = userTokenArr[0];
        var token = userTokenArr[1];
        Axios.post('http://127.0.0.1:8000/api/driver/r/order/', {
            "key": token
          })
          //test with: https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/posts.json
          .then(response => {
              this.setState({destination: response.address})
              console.log(response.address)
              console.log(this.state.destination)
          })
          .catch(error => {this.setState({ error, isLoading: false })
          console.log('ooga booga');})
      }
    }

    getDirections(startLoc, destinationLoc) {
      try {
          Axios.get(`https://maps.googleapis.com/maps/api/directions/json?origin=${ startLoc }&destination=${ destinationLoc }&key=AIzaSyDBmKH8_o35KRFWmcke2WO8xddSSvzT_-8`, 
          { mode: "no-cors",
            headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            },
            withCredentials: true,
            credentials: 'same-origin',}
          )
            .then(response => {
              //console.log(response)
              const elements = response.data.routes[0].legs[0].steps;
              for (const [index, value] of elements.entries()) {
                this.state.items += '<p>' + value.html_instructions + '</p>'
              }
              //let dirs = response.data.routes[0].legs[0].steps[0].html_instructions;
              var polyline = require('@mapbox/polyline');
              let points = polyline.decode(response.data.routes[0].overview_polyline.points);
              let coords = points.map((point) => {
              return  {
                  lat: point[0],
                  lng: point[1]
              }
            });
          this.setState({coords: coords});
          this.setState({destination: response.data.routes[0].legs[0].end_location});
          this.setState({destination_name: response.data.routes[0].legs[0].end_address})
          //console.log(this.state.destination);
          return coords;
            })
      } catch(error) {
          console.log(error);
          //alert(error)
          return error;
      }
    }

    handleDroppedFirst = (e) => {
      e.preventDefault();
        if(this.state.userToken) {
          var userTokenArr = this.state.userToken.split(':');
              var userType = userTokenArr[0];
              var token = userTokenArr[1];
              console.log(userType);
              var order_id = window.localStorage.getItem('firstOrder')
              Axios.post('http://127.0.0.1:8000/api/driver/r/delivered/ ', {
                  key: token,
                  order_id: order_id
                 })
            .then(res => {
              console.log(res)
              if (this.state.buttons == 1) {
                window.localStorage.removeItem('firstState')
                window.localStorage.removeItem('secondState')
                window.localStorage.removeItem('finalState')
                window.localStorage.removeItem('lockState')
                window.localStorage.removeItem('secondOrderList')
                window.localStorage.removeItem('firstOrder')
                window.localStorage.removeItem('secondOrder')
                this.setState({buttons: 0});
                window.localStorage.removeItem('buttons')
                this.props.history.push('/driver_dashboard')
                //alert("Order completed")
              } else {
                this.setState({buttons: 1});
                window.localStorage.setItem('buttons', 1)
                alert("Order 1 completed")
              }
            })
            .catch(error => console.log(error));
      }
    }

    handleDroppedSecond = (e) => {
      e.preventDefault();
        if(this.state.userToken) {
          var userTokenArr = this.state.userToken.split(':');
              var userType = userTokenArr[0];
              var token = userTokenArr[1];
              console.log(userType);
              var order_id;
              if (window.localStorage.hasOwnProperty('secondOrder')) {
                order_id = window.localStorage.getItem('secondOrder')
              } else {
                order_id = window.localStorage.getItem('firstOrder')
              }
              Axios.post('http://127.0.0.1:8000/api/driver/r/delivered/ ', {
                  key: token,
                  order_id: order_id
                 })
            .then(res => {
                console.log(res)
                window.localStorage.removeItem('firstState')
                window.localStorage.removeItem('secondState')
                window.localStorage.removeItem('finalState')
                window.localStorage.removeItem('lockState')
                window.localStorage.removeItem('secondOrderList')
                window.localStorage.removeItem('firstOrder')
                window.localStorage.removeItem('secondOrder')
                this.setState({buttons: 0});
                window.localStorage.removeItem('buttons')
                //alert("Order completed")
                this.props.history.push('/driver_dashboard')
            })
            .catch(error => console.log(error));
      }
    }


  render() {
    // const triangleCoords = [
    //   {lat: 37.333911, lng: -121.881848},
    //   {lat: 37.333024, lng: -121.884756}
    // ];
    const buttons = this.state.buttons;
    let oneOrTwo;
    if (buttons == 2) {
      oneOrTwo = <CardActions style={{ justifyContent: "center" }}>
          <Button
              style={{
                maxWidth: "290px",
                maxHeight: "60px",
                minWidth: "280px",
                minHeight: "60px",
                fontSize: "24px"
              }}
              variant="contained"
              color="secondary"
              onClick={this.handleDroppedFirst}
            >
              Confirm Delivery
            </Button>
            </CardActions>

    } else if (buttons == 1) {

      oneOrTwo =  <CardActions style={{ justifyContent: "center" }}>
            <Button
              style={{
                maxWidth: "290px",
                maxHeight: "60px",
                minWidth: "280px",
                minHeight: "60px",
                fontSize: "24px"
              }}
              variant="contained"
              color="secondary"
              onClick={this.handleDroppedSecond}
            >
              Confirm Delivery
            </Button>
            </CardActions>
    } else {
        oneOrTwo =  <CardActions style={{ justifyContent: "center" }}>
            <h4>No orders to drop</h4>
        </CardActions>
    }

  return (
      <React.Fragment>
        <div>
            {oneOrTwo}
        </div>
        <div
          style={divStyle}
          dangerouslySetInnerHTML={{ __html: this.state.items }}
        />
        <Map
          google={this.props.google}
          zoom={14}
          style={mapStyles}
          initialCenter={{
            lat: 37.333911,
            lng: -121.881848
          }}
        >
          <Polyline
            path={this.state.coords}
            strokeColor="#2B60DE"
            strokeOpacity={0.8}
            strokeWeight={4}
          />
          <Marker
            onClick={this.onMarkerClick}
            name={this.state.destination_name}
            position={this.state.destination}
          />
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            onClose={this.onClose}
          >
            <div>
              <h4>{this.state.selectedPlace.name}</h4>
            </div>
          </InfoWindow>
        </Map>
      </React.Fragment>
    );
  }
}


export default GoogleApiWrapper({
    apiKey: 'AIzaSyDBmKH8_o35KRFWmcke2WO8xddSSvzT_-8'
  })(MapContainer);