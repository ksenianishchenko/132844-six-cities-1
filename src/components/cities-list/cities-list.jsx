import React, {PureComponent} from "react";
import PropTypes from "prop-types";

class CitiesList extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {cities, onclick, activeElementIndex} = this.props;
    return <section className="locations container">
      <ul className="locations__list tabs__list">
        {cities.map((it, index) => {
          return <li className="locations__item" key={`city-${index}`}>
            <a className={`locations__item-link tabs__item tabs__item--${activeElementIndex === index ? `active` : ``}`} href="#" id={it.city.toLowerCase()} onClick = {(evt) => {
              const target = evt.target;
              const text = target.textContent;
              onclick(text);
            }}>
              <span>{it.city}</span>
            </a>
          </li>;
        })}
      </ul>
    </section>;
  }
}

CitiesList.propTypes = {
  cities: PropTypes.array.isRequired,
  onclick: PropTypes.func,
  activeElementIndex: PropTypes.number.isRequired,
};

export default CitiesList;
