import React from "react";
import PropTypes from "prop-types";
import {mockCity} from "../../mocks/offers.js";

const CitiesList = (props) => {
  const {cities, onclick, activeCity} = props;
  const unicCitiesArray = _handleUnicCities(cities);
  return <section className="locations container">
    <ul className="locations__list tabs__list">
      {unicCitiesArray.map((it, index) => {
        return <li className="locations__item" key={`city-${index}`}>
          <a className={`locations__item-link tabs__item tabs__item--${activeCity.name === it.name ? `active` : ``}`} href="#" id={it.name.toLowerCase()} onClick = {(evt) => {
            const target = evt.target;
            const text = target.textContent;
            onclick(text);
          }}>
            <span>{it.name}</span>
          </a>
        </li>;
      })}
    </ul>
  </section>;
};

const _handleUnicCities = (array) => {
  const uniq = new Set(array.map((e) => JSON.stringify(e)));
  const res = Array.from(uniq).map((e) => JSON.parse(e));
  return res;
};

CitiesList.propTypes = {
  cities: PropTypes.arrayOf(mockCity).isRequired,
  onclick: PropTypes.func,
  activeCity: mockCity.isRequired,
};

export default CitiesList;
