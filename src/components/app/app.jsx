import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import PlacesList from "../places-list/places-list.jsx";
import {connect} from "react-redux";
import {ActionCreators} from "../../reducers/game/game.js";
import withActiveOffer from "../../hocs/with-active-offer/with-active-offer.jsx";
import withAuthorizationForm from "../../hocs/with-authorization-form/with-authorization-form.jsx";
import {getCity} from "../../reducers/game/selectors.js";
import {getOffers} from "../../reducers/data/selectors.js";
import {getAuthorizationStatus, getAuthorizationPostResponse} from "../../reducers/user/selectors.js";
import {Authorization} from "../authorization/authorization.jsx";

const PlacesListWrapper = withActiveOffer(PlacesList);
const AuthorizationWrapper = withAuthorizationForm(Authorization);

class App extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return this._handleGetScreen();
  }

  _handleGetScreen() {
    const {places, getActiveCity, activeCity, cities} = this.props;
    if (this.props.isAuthorizationRequired) {
      return <AuthorizationWrapper />;
    }

    return <PlacesListWrapper
      places = {places}
      getActiveCity = {getActiveCity}
      activeCity = {activeCity}
      cities = {cities}
    />;
  }
}

App.propTypes = {
  places: PropTypes.array.isRequired,
  getActiveCity: PropTypes.func.isRequired,
  activeCity: PropTypes.object.isRequired,
  cities: PropTypes.array.isRequired,
  isAuthorizationRequired: PropTypes.bool
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  activeCity: getCity(state),
  cities: [...new Set(getOffers(state).map((item) => item.city))],
  places: getOffers(state).filter((place) => place.city.name === getCity(state).name),
  isAuthorizationRequired: getAuthorizationStatus(state),
  authorizationPostResponse: getAuthorizationPostResponse(state),
});

const mapDispatchToProps = (dispatch) => ({
  getActiveCity: (activeCity, cities) => {
    const uniq = new Set(cities.map((e) => JSON.stringify(e)));
    const res = Array.from(uniq).map((e) => JSON.parse(e));
    let city = res.filter((item) => item.name === activeCity);
    dispatch(ActionCreators.getActiveCity(city[0]));
  },
});


let connectedComponent = connect(mapStateToProps, mapDispatchToProps)(App);

export {connectedComponent as App};
