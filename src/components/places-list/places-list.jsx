import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import PlaceCard from "../place-card/place-card.jsx";

class PlacesList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeCardTitle: ``,
    };

    this._getActiveCard = this._getActiveCard.bind(this);
  }

  render() {
    const {places} = this.props;

    return places.map((item, index) => {
      return <PlaceCard
        place = {item}
        onclick = {this._getActiveCard}
        key = {`place-${index}`}
      />;
    });
  }

  _getActiveCard(event) {
    let parent = event.closest(`.place-card`);
    let title = parent.querySelector(`.place-card__name a`);
    this.setState({
      activeCardTitle: title.textContent
    });
  }
}

PlacesList.propTypes = {
  places: PropTypes.array.isRequired,
  onclick: PropTypes.func
};

export default PlacesList;
