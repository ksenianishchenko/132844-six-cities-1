import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import PlaceCard from "../place-card/place-card.jsx";

class PlacesList extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {places, onCardClick} = this.props;

    return places.map((item, index) => {
      return <PlaceCard
        place = {item}
        onclick = {(card) => {
          onCardClick(card);
        }}
        key = {`place-${index}`}
      />;
    });
  }
}

PlacesList.propTypes = {
  places: PropTypes.array.isRequired,
  onclick: PropTypes.func,
  onCardClick: PropTypes.func
};

export default PlacesList;
