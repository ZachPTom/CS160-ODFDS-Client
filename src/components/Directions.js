import React, { Component } from 'react';
import {Map, GoogleApiWrapper} from 'google-maps-react';

import Polyline from '@mapbox/polyline';

export class Directions extends Component {
  constructor(props) {
    super(props)
    this.state = {
      coords: []
    }
  }

  componentDidMount() {
    // find your origin and destination point coordinates and pass it to our method.
    // I am using Bursa,TR -> Istanbul,TR for this example
    this.getDirections("40.1884979, 29.061018", "41.0082, 28.9784")
    this.map = this.props.maps.Map;
  }

  async getDirections(startLoc, destinationLoc) {
        try {
            let resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${ startLoc }&destination=${ destinationLoc }`)
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
            alert(error)
            return error
        }
    }

  render() {
    return (
      <Map google={this.props.google}
        style={{width: '100%', height: '100%', position: 'relative'}}
        className={'map'}
        zoom={14}>
        <Polyline
          path={this.state.coords}
          strokeColor="#0000FF"
          strokeOpacity={0.8}
          strokeWeight={2}></Polyline>
      </Map>
    );
  }
}

// const styles = StyleSheet.create({
//   map: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     width: Dimensions.get('window').width,
//     height: Dimensions.get('window').height
//   },
// });

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDU_NdwIBxkUZGeaOqJWBgRpi_RhvjItic'
})(Directions);