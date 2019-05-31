import React, {PureComponent} from "react";
import PropTypes from "prop-types";

class CitiesList extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {cities, onclick, activeCity} = this.props;
    const unicCitiesArray = this._handleUnicCities(cities);
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
  }

  _handleUnicCities(array) {
    const uniq = new Set(array.map((e) => JSON.stringify(e)));
    const res = Array.from(uniq).map((e) => JSON.parse(e));
    return res;
  }
}

CitiesList.propTypes = {
  cities: PropTypes.array.isRequired,
  onclick: PropTypes.func,
  activeCity: PropTypes.object.isRequired,
};

export default CitiesList;
