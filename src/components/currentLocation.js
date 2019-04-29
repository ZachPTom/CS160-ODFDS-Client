import React from 'react';
import ReactDOM from 'react-dom';
import Polyline from '@mapbox/polyline';

const mapStyles = {
  map: {
    position: 'absolute',
    width: '100%',
    height: '100%'
  }
};
export class CurrentLocation extends React.Component {
  constructor(props) {
    super(props);

    const { lat, lng } = this.props.initialCenter;
    this.state = {
      currentLocation: {
        lat: lat,
        lng: lng
      }, 
      coords: []
    };
  }

  componentDidMount() {
    if (this.props.centerAroundCurrentLocation) {
      if (navigator && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(pos => {
          const coords = pos.coords;
          this.setState({
            currentLocation: {
              lat: coords.latitude,
              lng: coords.longitude
            }
          });
        });
      }
    }
    //this.getDirections("37.333911,-121.881848", "37.333024, -121.884756");
    this.loadMap();
  }

  // async getDirections(startLoc, destinationLoc) {
  //   try {
  //       let resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${ startLoc }&destination=${ destinationLoc }`, 
  //         {mode: "no-cors"})
  //       let respJson = await resp.json();
  //       let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
  //       let coords = points.map((point, index) => {
  //           return  {
  //               latitude : point[0],
  //               longitude : point[1]
  //           }
  //       })
  //       this.setState({coords: coords})
  //       return coords
  //   } catch(error) {
  //       //alert(error)
  //       return error
  //   }
  // }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.google !== this.props.google) {
      this.loadMap();
    }
    if (prevState.currentLocation !== this.state.currentLocation) {
      this.recenterMap();
    }
  }

  loadMap() {
    if (this.props && this.props.google) {
      // checks if google is available
      const { google } = this.props;
      const maps = google.maps;

      const mapRef = this.refs.map;

      // reference to the actual DOM element
      const node = ReactDOM.findDOMNode(mapRef);

      let { zoom } = this.props;
      const { lat, lng } = this.state.currentLocation;
      const center = new maps.LatLng(lat, lng);
      //const poly = new maps.Polyline(this.state.coords)
      const mapConfig = Object.assign(
        {},
        {
          center: center,
          zoom: zoom
          //polyline: poly
        }
      );
      // maps.Map() is constructor that instantiates the map
      this.map = new maps.Map(node, mapConfig);
    }
  }

  recenterMap() {
    const map = this.map;
    const current = this.state.currentLocation;

    const google = this.props.google;
    const maps = google.maps;

    if (map) {
      let center = new maps.LatLng(current.lat, current.lng);
      map.panTo(center);
    }
  }

  renderChildren() {
    const { children } = this.props;

    if (!children) return;

    return React.Children.map(children, c => {
      if (!c) return;
      return React.cloneElement(c, {
        map: this.map,
        google: this.props.google,
        mapCenter: this.state.currentLocation,
      });
    });
  }

  render() {
    const style = Object.assign({}, mapStyles.map);

    return (
      <div>
        <div style={style} ref="map">
          Loading map...
        </div>
        {this.renderChildren()}
      </div>
    );
  }
}
export default CurrentLocation;

CurrentLocation.defaultProps = {
  zoom: 6,
  initialCenter: {
    lat: 39.593555,
    lng: -100.701737
  },
  centerAroundCurrentLocation: false,
  visible: true
};