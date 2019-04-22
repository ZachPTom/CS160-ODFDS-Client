import React, { Component } from 'react';
import { Map, Polyline, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import Axios from 'axios';

const mapStyles = {
  width: '50%',
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
          coords: [],
          destination: {},
          destination_name: '',
          showingInfoWindow: true,
          activeMarker: {},
          selectedPlace: {},
          items: '<h1> Directions </h1>'
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
      this.getDirections("37.333911,-121.881848", "37.349869, -121.899644");
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
          this.setState({destination: response.data.routes[0].legs[0].end_location});
          this.setState({destination_name: response.data.routes[0].legs[0].end_address})
          console.log(this.state.destination);
          return coords;
            })
      } catch(error) {
          console.log(error);
          //alert(error)
          return error;
      }
    }

  render() {
    // const triangleCoords = [
    //   {lat: 37.333911, lng: -121.881848},
    //   {lat: 37.333024, lng: -121.884756}
    // ];

    return (
      <React.Fragment>
        <div style={divStyle} dangerouslySetInnerHTML={{__html: this.state.items}}></div>
        <div>
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
          <Marker onClick={this.onMarkerClick} name={this.state.destination_name} position={this.state.destination}/>
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
        </div>
      </React.Fragment>
    );
  }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyDBmKH8_o35KRFWmcke2WO8xddSSvzT_-8'
  })(MapContainer);