import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import PlaceCard from "../place-card/place-card.jsx";

class PlacesList extends PureComponent {
  constructor(props) {
    super(props);

    this._getActiveElement = this._getActiveElement.bind(this);
  }

  render() {
    const {places} = this.props;

    return places.map((item, index) => {
      return <PlaceCard
        place = {item}
        onclick = {this._getActiveElement}
        key = {`place-${index}`}
      />;
    });
  }

  _getActiveElement(event) {
    const {handleClick} = this.props;
    let parent = event.closest(`.place-card`);
    let title = parent.querySelector(`.place-card__name a`);
    handleClick(title.textContent);
  }
}

PlacesList.propTypes = {
  places: PropTypes.array.isRequired,
  onclick: PropTypes.func,
  handleClick: PropTypes.func
};

export default PlacesList;
