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
    const {places, handleClick, activeCityIndex, activeOffer, getCityOffers, onClearOffer} = this.props;

    return <React.Fragment>
      <div className="cities tabs">
        <CitiesList
          cities = {places}
          onclick = {(activeCity) => {
            onClearOffer();
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
              {places[activeCityIndex].offers.map((item, index) => {
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
              offers = {places[activeCityIndex].offers}
              cityCoordinates = {places[activeCityIndex].cityCoordinates}
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
  activeCityIndex: PropTypes.number.isRequired,
  activeOffer: PropTypes.object,
  getCityOffers: PropTypes.func,
  onClearOffer: PropTypes.func
};

export default PlacesList;
