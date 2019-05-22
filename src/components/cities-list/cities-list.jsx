import React, {PureComponent} from "react";
import PropTypes from "prop-types";

class CitiesList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      active: true,
    };
  }

  render() {
    const {cities, onclick} = this.props;
    return <section className="locations container">
      <ul className="locations__list tabs__list">
        {cities.map((it, index) => {
          return <li className="locations__item" key={`city-${index}`}>
            <a className="locations__item-link tabs__item" href="#" onClick = {(evt) => {
              const target = evt.target;
              const activeCity = target.textContent;
              onclick(activeCity);
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
  onclick: PropTypes.func
};

export default CitiesList;
