import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import L from "leaflet";

class Map extends PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {cityCoordinates, offers} = this.props;
    const markersData = this._getMarkersLatLang(offers);
    this.mapCenter = cityCoordinates;
    this.icon = L.icon({
      iconUrl: `img/map-pin.svg`,
      iconSize: [30, 30]
    });
    setTimeout(() => {
      this.map = L.map(`map`, {
        center: this.mapCenter,
        zoom: 11,
        zoomControl: false,
        marker: true,
        layers: [
          L.tileLayer(`http://{s}.tile.osm.org/{z}/{x}/{y}.png`, {
            attribution: `&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors`
          })],
      });

      this.layer = L.layerGroup().addTo(this.map);
      this.updateMarkers(markersData);
    }, 50);
  }

  componentDidUpdate() {
    const {offers, cityCoordinates} = this.props;
    this.mapCenter = cityCoordinates;
    this.map.panTo(this.mapCenter);
    const markersData = this._getMarkersLatLang(offers);
    this.updateMarkers(markersData);
  }

  componentWillUnmount() {
    this.map.remove();
    this.map = null;
  }

  render() {
    return <section id="map" className="cities__map map"></section>;
  }

  _getMarkersLatLang(places) {
    const markersArray = [];
    places.map((it) => {
      markersArray.push(it.latLang);
    });
    return markersArray;
  }

  updateMarkers(markersData) {
    this.layer.clearLayers();
    markersData.forEach((marker) => {
      L.marker(marker).addTo(this.layer);
    });
  }
}

Map.propTypes = {
  offers: PropTypes.array.isRequired,
  cityCoordinates: PropTypes.array.isRequired
};

export default Map;
