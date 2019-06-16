import React from "react";
import PropTypes from "prop-types";
import {PlaceCard} from "../place-card/place-card.jsx";
import CitiesList from "../cities-list/cities-list.jsx";
import Map from "../map/map.jsx";
import PlacesListEmpty from "../places-list-empty/places-list-empty.jsx";
import {mockPlaces, mockCity} from "../../mocks/offers.js";

const PlacesList = (props) => {
  const {places, handleClick, activeOffer, getActiveCity, onClearOffer, activeCity, cities, sortingPlaces, activeElement, onSortPlaces, onGetActiveElement, onSortListToggle, sortListOpen} = props;

  const sortingChoise = [`Popular`, `Price: low to high`, `Price: high to low`, `Top rated first`];

  const placesArray = places.slice(0);

  let sorting = sortingPlaces ? sortingPlaces : places;
  if (!places.length) {
    return <PlacesListEmpty />;
  }

  return <React.Fragment>
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>
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
              <span className="places__sorting-type" tabIndex="0" onClick={() => onSortListToggle()}>
                {activeElement}
                <svg className="places__sorting-arrow" width="7" height="4">
                  <use xlinkHref="#icon-arrow-select"></use>
                </svg>
              </span>
              <ul className={sortListOpen ? `places__options places__options--custom places__options--opened` : `places__options places__options--custom`}>
                {sortingChoise.map((item, index) => {
                  return <li
                    className={activeElement === item ? `places__option places__option--active` : `places__option`} tabIndex="0" key={`index-${index}`}
                    onClick = {() => {
                      onGetActiveElement(item);
                      onSortPlaces(placesArray, item);
                      onSortListToggle();
                    }}
                  >{item}</li>;
                })}
              </ul>
            </form>
            <div className="cities__places-list places__list tabs__content">
              {sorting.slice(0, 6).map((item, index) => {
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
            <section id="map" className="cities__map map">
              <Map
                offers = {places}
                activeCity = {activeCity}
                activeOffer = {activeOffer}
              />
            </section>
          </div>
        </div>
      </div>
    </main>
  </React.Fragment>;
};

PlacesList.propTypes = {
  places: PropTypes.arrayOf(mockPlaces).isRequired,
  onclick: PropTypes.func,
  handleClick: PropTypes.func,
  activeOffer: mockPlaces,
  getActiveCity: PropTypes.func,
  onClearOffer: PropTypes.func,
  activeCity: mockCity.isRequired,
  cities: PropTypes.arrayOf(mockCity).isRequired,
  activeElement: PropTypes.string.isRequired,
  sortingPlaces: PropTypes.array,
  onSortPlaces: PropTypes.func,
  onGetActiveElement: PropTypes.func,
  onSortListToggle: PropTypes.func,
  sortListOpen: PropTypes.bool
};

export default PlacesList;
