import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import PlacesList from "../places-list/places-list.jsx";
import Map from "../map/map.jsx";
import Header from "../header/header.jsx";
import CitiesList from "../cities-list/cities-list.jsx";
import {connect} from "react-redux";
import {ActionCreators} from "../../reducer.js";

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
        <div className="cities tabs">
          <CitiesList
            cities = {places}
            onclick = {(activeCity) => {
              getCityOffers(activeCity, places);
            }}
            activeElementIndex = {activeCityIndex}
          /></div>
        <div className="cities__places-wrapper">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{places[activeCityIndex].offers.length} places to stay in {places[activeCityIndex].city}</b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex="0">
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li className="places__option places__option--active" tabIndex="0">Popular</li>
                  <li className="places__option" tabIndex="0">Price: low to high</li>
                  <li className="places__option" tabIndex="0">Price: high to low</li>
                  <li className="places__option" tabIndex="0">Top rated first</li>
                </ul>
                <select className="places__sorting-type" id="places-sorting">
                  <option className="places__option" value="popular" defaultValue="">Popular</option>
                  <option className="places__option" value="to-high">Price: low to high</option>
                  <option className="places__option" value="to-low">Price: high to low</option>
                  <option className="places__option" value="top-rated">Top rated first</option>
                </select>
              </form>
              <div className="cities__places-list places__list tabs__content">
                <PlacesList
                  places = {places[activeCityIndex].offers}
                />
              </div>
            </section>
            <div className="cities__right-section">
              <Map
                offers = {places[activeCityIndex].offers}
                cityCoordinates = {places[activeCityIndex].cityCoordinates}
              />
            </div>
          </div>
        </div>

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
