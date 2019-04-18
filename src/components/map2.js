import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import Polyline from '@mapbox/polyline';

const mapStyles = {
  width: '100%',
  height: '100%'
};

export class MapContainer2 extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          coords: []
        };
      }

    componentDidMount() {
    this.getDirections("37.333911,-121.881848", "37.333024, -121.884756");
    }

    async getDirections(startLoc, destinationLoc) {
        try {
            let resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${ startLoc }&destination=${ destinationLoc }`, 
              {mode: "no-cors"})
            let respJson = await resp.json();
            let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
            let coords = points.map((point, index) => {
                return  {
                    latitude : point[0],
                    longitude : point[1]
                }
            })
            this.setState({coords: coords})
            return coords
        } catch(error) {
            //alert(error)
            return error
        }
      }

  render() {
    return (
      <Map
        google={this.props.google}
        zoom={12}
        style={mapStyles}
        initialCenter={{
         lat: 37.333911,
         lng: -121.881848
        }}
      >
      <Polyline
        path={this.state.coords}
        strokeColor="#0000FF"
        strokeOpacity={0.8}
        strokeWeight={2} /> 
      </Map>
    );
  }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyDU_NdwIBxkUZGeaOqJWBgRpi_RhvjItic'
  })(MapContainer2);