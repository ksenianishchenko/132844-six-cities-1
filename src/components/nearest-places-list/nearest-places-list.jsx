import React from "react";
import PropTypes from "prop-types";
import {PlaceCard} from "../place-card/place-card.jsx";

const NearestPlacesList = (props) => {
  const {nearestPlaces} = props;
  return <section className="near-places places">
    <h2 className="near-places__title">Other places in the neighbourhood</h2>
    <div className="near-places__list places__list">
      {nearestPlaces.map((it, index) => {
        return <PlaceCard
          place = {it}
          key = {`place-${index}`}
        />;
      })}
    </div>
  </section>;
};

NearestPlacesList.propTypes = {
  nearestPlaces: PropTypes.array.isRequired,
};

export default NearestPlacesList;
