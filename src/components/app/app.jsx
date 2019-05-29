import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import PlacesList from "../places-list/places-list.jsx";
import Header from "../header/header.jsx";
import {connect} from "react-redux";
import {ActionCreators} from "../../reducer.js";
import withActiveOffer from "../../hocs/with-active-offer/with-active-offer.jsx";

const PlacesListWrapper = withActiveOffer(PlacesList);

class App extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {places, activeCityIndex, getCityOffers} = this.props;
    return <React.Fragment>
      <Header />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <PlacesListWrapper
          places = {places}
          activeCityIndex = {activeCityIndex}
          getCityOffers = {getCityOffers}
        />

      </main>
    </ React.Fragment>;
  }
}

App.propTypes = {
  places: PropTypes.array.isRequired,
  activeCityIndex: PropTypes.number.isRequired,
  getCityOffers: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  activeCityIndex: state.activeCityIndex,
  places: state.offers
});

const mapDispatchToProps = (dispatch) => ({
  getCityOffers: (activeCity, offersArray) => {
    for (let i = 0; i < offersArray.length; i++) {
      if (offersArray[i].city === activeCity) {
        dispatch(ActionCreators.changeCity(i));
      }
    }
  }
});


let connectedComponent = connect(mapStateToProps, mapDispatchToProps)(App);

export {connectedComponent as App};
