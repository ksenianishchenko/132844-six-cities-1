import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import L from "leaflet";

const activeIcon = L.icon({
  iconUrl: `/img/map-pin-active.svg`,
  iconSize: [30, 30]
});

class Map extends PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {activeCity, offers, activeOffer} = this.props;
    const markersData = this._getMarkersLatLang(offers);

    this.icon = L.icon({
      iconUrl: `img/map-pin.svg`,
      iconSize: [30, 30]
    });

    const cityCoordinates = [activeCity.location.latitude, activeCity.location.longitude];

    this.mapCenter = cityCoordinates;

    setTimeout(() => {
      this.map = L.map(`map`, {
        center: this.mapCenter,
        zoom: 13,
        zoomControl: false,
        marker: true,
        layers: [
          L.tileLayer(`http://{s}.tile.osm.org/{z}/{x}/{y}.png`, {
            attribution: `&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors`
          })],
      });

      this.layer = L.layerGroup().addTo(this.map);
      this.updateMarkers(markersData, activeOffer);
    }, 50);
  }

  componentDidUpdate() {
    const {offers, activeCity, activeOffer} = this.props;
    const cityCoordinates = [activeCity.location.latitude, activeCity.location.longitude];
    if (activeOffer.location) {
      this.mapCenter = [activeOffer.location.latitude, activeOffer.location.longitude];
    } else {
      this.mapCenter = cityCoordinates;
    }
    this.map.panTo(this.mapCenter);
    const markersData = this._getMarkersLatLang(offers);
    this.updateMarkers(markersData, activeOffer);
  }

  componentWillUnmount() {
    this.map.remove();
    this.map = null;
  }

  render() {
    return <div id="map" style={{height: `100%`}}></div>;
  }

  _getMarkersLatLang(places) {
    const markersArray = [];
    places.map((it) => {
      markersArray.push([it.location.latitude, it.location.longitude]);
    });
    return markersArray;
  }

  updateMarkers(markersData, activeOffer) {
    let activeIconCoordinates = [];
    if (activeOffer.location) {
      activeIconCoordinates = [activeOffer.location.latitude, activeOffer.location.longitude];
    }
    this.layer.clearLayers();
    for (let marker of markersData) {
      const arraysEqual = (a1, a2) => {
        return JSON.stringify(a1) === JSON.stringify(a2);
      };
      if (activeIconCoordinates !== marker) {
        L.marker(marker).addTo(this.layer);
      }

      if (arraysEqual(marker, activeIconCoordinates)) {
        L.marker(activeIconCoordinates, {icon: activeIcon}).addTo(this.layer);
      }
    }
  }
}

Map.propTypes = {
  offers: PropTypes.array.isRequired,
  activeOffer: PropTypes.object,
  activeCity: PropTypes.object.isRequired
};

export default Map;
