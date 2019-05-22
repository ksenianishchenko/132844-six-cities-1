import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import L from "leaflet";

class Map extends PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {places} = this.props;
    const markersData = this._getMarkersLatLang(places);
    this.mapCenter = [52.38333, 4.9];
    this.icon = L.icon({
      iconUrl: `img/map-pin.svg`,
      iconSize: [30, 30],
      center: this.mapCenter
    });

    this.map = L.map(`map`, {
      center: this.mapCenter,
      zoom: 12,
      zoomControl: false,
      marker: true,
      layers: [
        L.tileLayer(`http://{s}.tile.osm.org/{z}/{x}/{y}.png`, {
          attribution: `&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors`
        })],
    });

    this.layer = L.layerGroup().addTo(this.map);
    this.updateMarkers(markersData);
  }

  componentDidUpdate() {
    const {places} = this.props;
    const markersData = this._getMarkersLatLang(places);
    this.updateMarkers(markersData);
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
  places: PropTypes.array.isRequired
};

export default Map;
