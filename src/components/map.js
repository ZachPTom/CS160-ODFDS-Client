import React, { Component } from 'react';
import { GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import ReactDOM from 'react-dom';

import CurrentLocation from './currentLocation';
import Polyline from '@mapbox/polyline';

export class MapContainer extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {}
  };

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
        if(userType === 'restaurant') {
        } else{
          this.props.history.push('/driver_dashboard')
        }
      } else {
        this.props.history.push('/')
      }
    }

  
  render() {
    const triangleCoords = [
      {lat: 25.774, lng: -80.190},
      {lat: 18.466, lng: -66.118},
      {lat: 32.321, lng: -64.757},
      {lat: 25.774, lng: -80.190}
    ];
    return (
      <CurrentLocation centerAroundCurrentLocation google={this.props.google}>
        <Marker onClick={this.onMarkerClick} name={'current location'} />
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