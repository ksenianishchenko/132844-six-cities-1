import React from "react";
import PropTypes from "prop-types";
import {PlaceCard} from "../place-card/place-card.jsx";
import CitiesList from "../cities-list/cities-list.jsx";
import {Header} from "../header/header.jsx";
import Map from "../map/map.jsx";

const PlacesList = (props) => {
  const {places, handleClick, activeOffer, getActiveCity, onClearOffer, activeCity, cities, sortingPlaces, activeElement, onSortPlaces, onGetActiveElement, onSortListToggle, sortListOpen} = props;

  const sortingChoise = [`Popular`, `Price: low to high`, `Price: high to low`, `Top rated first`];

  const placesArray = places.slice(0);

  let sorting = sortingPlaces ? sortingPlaces : places;
  if (sorting === null) {
    return <div className="cities__places-wrapper">
      <div className="cities__places-container cities__places-container--empty container">
        <section className="cities__no-places">
          <div className="cities__status-wrapper tabs__content">
            <b className="cities__status">No places to stay available</b>
            <p className="cities__status-description">We could not find any property availbale at the moment in Dusseldorf</p>
          </div>
        </section>
        <div className="cities__right-section">
          <section className="cities__map map"></section>
        </div>
      </div>
    </div>;
  }

  return <React.Fragment>
    <Header />
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
            <Map
              offers = {places}
              activeCity = {activeCity}
              activeOffer = {activeOffer}
            />
          </div>
        </div>
      </div>
    </main>
  </React.Fragment>;
};

PlacesList.propTypes = {
  places: PropTypes.array.isRequired,
  onclick: PropTypes.func,
  handleClick: PropTypes.func,
  activeOffer: PropTypes.object,
  getActiveCity: PropTypes.func,
  onClearOffer: PropTypes.func,
  activeCity: PropTypes.object.isRequired,
  cities: PropTypes.array.isRequired,
  activeElement: PropTypes.string.isRequired,
  sortingPlaces: PropTypes.array,
  onSortPlaces: PropTypes.func,
  onGetActiveElement: PropTypes.func,
  onSortListToggle: PropTypes.func,
  sortListOpen: PropTypes.bool
};

export default PlacesList;
