import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import PlacesList from "../places-list/places-list.jsx";
import Header from "../header/header.jsx";
import {connect} from "react-redux";
import {ActionCreators} from "../../reducers/game/game.js";
import withActiveOffer from "../../hocs/with-active-offer/with-active-offer.jsx";
import {getCity} from "../../reducers/game/selectors.js";
import {getOffers} from "../../reducers/data/selectors.js";

const PlacesListWrapper = withActiveOffer(PlacesList);

class App extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {places, getActiveCity, activeCity, cities} = this.props;
    return <React.Fragment>
      <Header />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <PlacesListWrapper
          places = {places}
          getActiveCity = {getActiveCity}
          activeCity = {activeCity}
          cities = {cities}
        />

      </main>
    </ React.Fragment>;
  }
}

App.propTypes = {
  places: PropTypes.array.isRequired,
  getActiveCity: PropTypes.func.isRequired,
  activeCity: PropTypes.object.isRequired,
  cities: PropTypes.array.isRequired
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  activeCity: getCity(state),
  cities: [...new Set(getOffers(state).map((item) => item.city))],
  places: getOffers(state).filter((place) => place.city.name === getCity(state).name)
});

const mapDispatchToProps = (dispatch) => ({
  getActiveCity: (activeCity, cities) => {
    const uniq = new Set(cities.map((e) => JSON.stringify(e)));
    const res = Array.from(uniq).map((e) => JSON.parse(e));
    let city = res.filter((item) => item.name === activeCity);
    dispatch(ActionCreators.getActiveCity(city[0]));
  }
});


let connectedComponent = connect(mapStateToProps, mapDispatchToProps)(App);

export {connectedComponent as App};
