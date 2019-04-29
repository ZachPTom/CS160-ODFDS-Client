import React, { Component } from 'react';
import { Map, Polyline, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import Axios from 'axios';
import ReactDOM from 'react-dom';
import Button from "@material-ui/core/Button";

//import Timer from './timer'

const mapStyles = {
  width: '100%',
  height: '100%'
};

const divStyle = {
  float: 'right',
  width: '40%'
};

export class MapContainer extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          selected: '',
          coords: [],
          coords2: [],
          increment: 0,
          start: [], //array parameters to pass to google api call
          restaurant: [],
          first_destination: [], 
          second_destination: [],
          final_destination: [],
          start_destination_name: '', //strings to pass to marker name
          first_destination_name: '',
          final_destination_name: '',
          start_destination_object: {}, //objects to pass to markers
          first_destination_object: {},
          final_destination_object: {},
          second_destination_exists: false,
          showingInfoWindow: true,
          activeMarker: {},
          selectedPlace: {},
          currentIdx: 0,
          currentPos: {}, //driver current pos
          items: '<h1> Directions </h1>',
          userToken: window.localStorage.getItem('token')
        };
        this.startMove = this.startMove.bind(this);
        this.stopMove = this.stopMove.bind(this);

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

    calcNextPosition() {
      if (this.state.currentIdx === this.state.pointsNo - 1)
        this.setState({ currentIdx: 0 });
      else
        this.setState({ currentIdx: this.state.currentIdx + 1 }, function () {
          var nextPos = this.state.coords[this.state.increment]
          this.setState({increment: this.state.increment + 1})
          //{ lat: this.state.startPos.lat + (latDelta * this.state.currentIdx), lng: this.state.startPos.lng + (lngDelta * this.state.currentIdx) };
          this.setState({ currentPos: nextPos });
        });
    }
  
    updatePosition() {
      this.calcNextPosition();
      console.log("Current position: " + JSON.stringify(this.state.currentPos));
    }
    
  
    startMove() {
      this.interval = setInterval(this.updatePosition.bind(this), 500);
    }
  
    stopMove() {
      clearInterval(this.interval);
    }

    componentDidMount() {
        this.getDirections();
    }

    // getOrderAddress() {
    //   if(this.state.userToken) {
    //     var userTokenArr = this.state.userToken.split(':');
    //     var userType = userTokenArr[0];
    //     var token = userTokenArr[1];
    //     Axios.post('http://127.0.0.1:8000/api/driver/r/order/', {
    //         "key": token
    //       })
    //       //test with: https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/posts.json
    //       .then(response => {
    //           this.setState({destination: response.data[0].address})
    //           console.log(response.data[0].address)
    //           console.log(this.state.destination)
    //           return true
    //       })
    //       .catch(error => {this.setState({ error, isLoading: false })
    //       console.log(error);
    //       return false})
    //   }
    //   return false
    // }

    getDirections() {
      if(this.state.userToken) {
        var userTokenArr = this.state.userToken.split(':');
        var userType = userTokenArr[0];
        var token = userTokenArr[1];
        Axios.post('http://127.0.0.1:8000/api/driver/r/route/', {
            key: 123,
            first_id: 33,
            second_id: 34
          })
          .then(response => {
              this.setState({start: response.data.driver})
              this.setState({restaurant: response.data.rest})
              this.setState({first_destination: response.data.first})
              this.setState({second_destination: response.data.second})
              if (response.data.second === undefined || response.data.second.length == 0) {
                this.setState({final_destination: response.data.first})
              } else {  
                  this.setState({final_destination: response.data.second})
                  this.setState({second_destination_exists: true})
               } 
              //console.log(response.data.first)
              console.log(this.state.start + ' driver start')
              console.log(this.state.restaurant + ' restaurant location')
              console.log(this.state.first_destination + ' first destination')
              console.log(this.state.second_destination + ' second destination')
              console.log(this.state.final_destination + ' final destination')

              //console.log(this.state.destination.toString())

            return Axios.get(`https://maps.googleapis.com/maps/api/directions/json?origin=${this.state.start.toString()}
                &destination=${this.state.first_destination.toString()}&key=AIzaSyDBmKH8_o35KRFWmcke2WO8xddSSvzT_-8`, 
          { mode: "no-cors",
            headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            },
            withCredentials: true,
            credentials: 'same-origin',}
          )
            .then(response => {
              console.log(response)
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
          //this.setState({first})
          // this.setState({first_destination_object: this.toObject(this.state.first_destination)});
          // console.log(this.state.first_destination_object)
          this.setState({start_destination_object: response.data.routes[0].legs[0].start_location});
          this.setState({currentPos: response.data.routes[0].legs[0].start_location})
          this.setState({start_destination_name: response.data.routes[0].legs[0].start_address});
          this.setState({first_destination_object: response.data.routes[0].legs[0].end_location});
          //console.log(this.state.destination_object)
          this.setState({first_destination_name: response.data.routes[0].legs[0].end_address})
          //console.log(this.state.destination);
          // return coords;
          
          if (this.state.second_destination_exists) {
          return Axios.get(`https://maps.googleapis.com/maps/api/directions/json?origin=${this.state.first_destination.toString()}
          &destination=${this.state.second_destination.toString()}&key=AIzaSyDBmKH8_o35KRFWmcke2WO8xddSSvzT_-8`, 
          { mode: "no-cors",
            headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            },
            withCredentials: true,
            credentials: 'same-origin',}
          )
            .then(response => {
              console.log(response)
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
          this.setState({coords2: coords});
          //this.setState({coords: coords});
          //this.setState({first})
          // this.setState({first_destination_object: this.toObject(this.state.first_destination)});
          // console.log(this.state.first_destination_object)
          // this.setState({first_destination_object: response.data.routes[0].legs[0].start_location});
          // this.setState({first_destination_name: response.data.routes[0].legs[0].start_address});
          this.setState({final_destination_object: response.data.routes[0].legs[0].end_location});
          //console.log(this.state.destination_object)
          this.setState({final_destination_name: response.data.routes[0].legs[0].end_address})
          //console.log(this.state.destination);
          return coords;
            })
          .catch(error => {
          console.log(error);
          //alert(error)
          return error;
            })
          }
            })
          .catch(error => {
          console.log(error);
          //alert(error)
          return error;
      })
          })
          .catch(error => {this.setState({ error, isLoading: false })
          console.log(error);
      })
    }
      // this.setState({selected: window.localStorage.getItem('firstOrder')})
      // this.setState({destination: this.state.selected.address})
      // console.log(window.localStorage.getItem('firstOrder'))
      // console.log(this.state.selected)
      // console.log(this.state.destination)

      
  }

  // toObject(arr) {
  //   var obj = {};
  //   for (var i = 0; i < arr.length; ++i)
  //     if (arr[i] !== undefined) obj[i] = arr[i];
  //   return obj;
  // }

  // updateDriver = (
  //   //timer

  //   //this.setState({driverLocation:  })
  // )

  render() {
    // const triangleCoords = [
    //   {lat: 37.333911, lng: -121.881848},
    //   {lat: 37.333024, lng: -121.884756}
    // ];
    //this.getOrderAddress();

    console.log(this.state.coords)
    return (
      <React.Fragment>
        {/* <div style={divStyle} dangerouslySetInnerHTML={{__html: this.state.items}}></div> */}
        <Button
          type = 'submit'
				    fullWidth
				    variant="contained"
				    color="primary"
          onClick={this.startMove}> Start
        </Button>
        <Button
          type = 'submit'
				    fullWidth
				    variant="contained"
				    color="primary"
          onClick={this.stopMove}> Stop
        </Button>
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
              strokeWeight={4}>
          </Polyline>
          <Polyline
              path={this.state.coords2}
              strokeColor="#2B60DE"
              strokeOpacity={0.8}
              strokeWeight={4}>
          </Polyline>
          <Marker onClick={this.onMarkerClick} name={'driver'} position={this.state.currentPos}/>
          {/* <Marker onClick={this.onMarkerClick} name={'start: ' + this.state.start_destination_name} position={this.state.start_destination_object}/> */}
          <Marker onClick={this.onMarkerClick} name={'first destination: ' + this.state.first_destination_name} position={this.state.first_destination_object}/>
          <Marker onClick={this.onMarkerClick} name={'final destination: ' + this.state.final_destination_name} position={this.state.final_destination_object}/>
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