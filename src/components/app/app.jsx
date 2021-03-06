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
import {Router, Switch, Route} from "react-router-dom";
import {Favorites} from "../favorites/favorites.jsx";
import {Offer} from "../offer/offer.jsx";
import withSort from "../../hocs/with-sort/with-sort.jsx";
import {Header} from "../header/header.jsx";
import history from "../../history";
import {mockPlaces, mockCity} from "../../mocks/offers.js";

const PlacesListWrapper = withSort(withActiveOffer(PlacesList));
const AuthorizationWrapper = withAuthorizationForm(Authorization);

class App extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {places, getActiveCity, activeCity, cities} = this.props;
    return <Router history={history}>
      <Header />
      <Switch>
        <Route path="/login" component={AuthorizationWrapper} />
        <Route path="/" exact render = {() => <PlacesListWrapper
          places = {places}
          getActiveCity = {getActiveCity}
          activeCity = {activeCity}
          cities = {cities}
        />} />
        <Route path="/favorites" component={Favorites} />
        <Route path="/offer/:id" component={Offer} />
      </Switch>;
    </ Router>;
  }
}

App.propTypes = {
  places: PropTypes.arrayOf(mockPlaces).isRequired,
  getActiveCity: PropTypes.func.isRequired,
  activeCity: mockCity.isRequired,
  cities: PropTypes.arrayOf(mockCity).isRequired,
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
