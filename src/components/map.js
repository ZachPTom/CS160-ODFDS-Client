import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';

const mapStyles = {
  width: '600px',
  height: '600px',
  marginLeft: 'auto',
    marginRight: 'auto'
};

export class MapContainer extends Component {
    state = {
        showingInfoWindow: false,  //Hides or the shows the infoWindow
        activeMarker: {},          //Shows the active marker upon click
        selectedPlace: {}          //Shows the infoWindow to the selected place upon a marker
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
    >
      <Marker
          onClick={this.onMarkerClick}
          name={'Cookin up some cs geniuses'}
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
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDU_NdwIBxkUZGeaOqJWBgRpi_RhvjItic'
})(MapContainer);