import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import PlaceCard from "../place-card/place-card.jsx";
import CitiesList from "../cities-list/cities-list.jsx";
import Map from "../map/map.jsx";

class PlacesList extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {places, handleClick, activeOffer, getActiveCity, onClearOffer, activeCity, cities} = this.props;

    return <React.Fragment>
      <div className="cities tabs">
        <CitiesList
          cities = {cities}
          activeCity = {activeCity}
          onclick = {(city) => {
            onClearOffer();
            getActiveCity(city, cities);
          }}
        /></div>
      <div className="cities__places-wrapper">
        <div className="cities__places-container container">
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">{places.length} places to stay in {activeCity.name}</b>
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
            </form>
            <div className="cities__places-list places__list tabs__content">
              {places.map((item, index) => {
                return <PlaceCard
                  place = {item}
                  onclick = {(card) => {
                    handleClick(card);
                  }}
                  key = {`place-${index}`}
                />;
              })}
            </div>
          </section>
          <div className="cities__right-section">
            <Map
              offers = {places}
              activeCity = {activeCity}
              activeOffer = {activeOffer}
            />
          </div>
        </div>
      </div>
    </React.Fragment>;
  }
}

PlacesList.propTypes = {
  places: PropTypes.array.isRequired,
  onclick: PropTypes.func,
  handleClick: PropTypes.func,
  activeOffer: PropTypes.object,
  getActiveCity: PropTypes.func,
  onClearOffer: PropTypes.func,
  activeCity: PropTypes.object.isRequired,
  cities: PropTypes.array.isRequired
};

export default PlacesList;
