import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';

const mapStyles = {
  width: '600px',
  height: '600px',
  marginLeft: 'auto',
    marginRight: 'auto'
};

export class MapContainer extends Component {
  render() {
    return (
      <Map
        google={this.props.google}
        zoom={18}
        style={mapStyles}
        //coordinates of Macquarrie Hall
        initialCenter={{
         lat: 37.333443,
         lng: -121.881639
        }}
      />
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDU_NdwIBxkUZGeaOqJWBgRpi_RhvjItic'
})(MapContainer);