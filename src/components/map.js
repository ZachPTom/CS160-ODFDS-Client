import React, { Component } from 'react';
import { GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';

import CurrentLocation from './currentLocation';

export class MapContainer extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    driverLocation: {}
  };

  // onMarkerClick = (props, marker, e) =>
  //   this.setState({
  //     selectedPlace: props,
  //     activeMarker: marker,
  //     showingInfoWindow: true
  //   });

  // onClose = props => {
  //   if (this.state.showingInfoWindow) {
  //     this.setState({
  //       showingInfoWindow: false,
  //       activeMarker: null
  //     });
  //   }
  // };

  componentDidMount() {
      if(this.state.userToken){
        var userTokenArr = this.state.userToken.split(':');
        var userType = userTokenArr[0];
        var token = userTokenArr[1];
        if(userType === 'restaurant') {
        } else{
          this.props.history.push('/driver_dashboard')
        }
      } else {
        this.props.history.push('/')
      }
    }

  
  render() {
    return (
      <CurrentLocation centerAroundCurrentLocation google={this.props.google}>
        <Marker onClick={this.onMarkerClick} name={'current location'} position = {this.state.driverLocation} />
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div>
            <h4>{this.state.selectedPlace.name}</h4>
          </div>
        </InfoWindow>
        {/* <Polyline
        path={triangleCoords}
        strokeColor="#0000FF"
        strokeOpacity={0.8}
        strokeWeight={2} />  */}
        </CurrentLocation>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDU_NdwIBxkUZGeaOqJWBgRpi_RhvjItic'
})(MapContainer);