import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getActiveOffer} from "../../reducers/offer/selectors.js";
import {ActionCreators as ActionCreatorsOffer} from "../../reducers/offer/offer.js";
import {getUsersReviews} from "../../reducers/comments/comments.js";
import {Link} from 'react-router-dom';
import {getCity} from "../../reducers/game/selectors.js";
import {getOffers} from "../../reducers/data/selectors.js";

class PlaceCard extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {place, onclick, getOffer, getOfferReviews, places, getNearestPlaces} = this.props;
    return <article className="cities__place-card place-card">
      <div className="cities__image-wrapper place-card__image-wrapper">
        <a href="#">
          <img className="place-card__image" onClick = {() => {
            onclick(place);
          }} src={place.preview_image} width="260" height="200" alt="Place image" />
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{place.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={`place-card__bookmark-button button ${place.is_favorite ? `place-card__bookmark-button--active` : ``}`} type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${Math.round(place.rating) * 100 / 5}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link onClick = {() => {
            getOffer(place);
            getOfferReviews(place.id);
            getNearestPlaces(place, places);
          }} to={`/offer/${place.id}`}>{place.title}</Link>
        </h2>
        <p className="place-card__type">{place.type}</p>
      </div>
    </article>;
  }
}

PlaceCard.propTypes = {
  place: PropTypes.object.isRequired,
  onclick: PropTypes.func,
  onMoustLeave: PropTypes.func,
  onMouseEnter: PropTypes.func,
  active: PropTypes.string,
  getOffer: PropTypes.func,
  getOfferReviews: PropTypes.func,
  places: PropTypes.array,
  getNearestPlaces: PropTypes.func,
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  activeOffer: getActiveOffer(state),
  places: getOffers(state).filter((place) => place.city.name === getCity(state).name),
});

const mapDispatchToProps = (dispatch) => ({
  getOffer: (offer) => {
    dispatch(ActionCreatorsOffer.getActiveOffer(offer));
  },
  getOfferReviews: (id) => {
    dispatch(getUsersReviews(id));
  },
  getNearestPlaces: (activePlace, placesArray) => {
    const deg2rad = (deg) => {
      return deg * (Math.PI / 180);
    };
    const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
      let R = 6371;
      let dLat = deg2rad(lat2 - lat1);
      let dLon = deg2rad(lon2 - lon1);
      let a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
      let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      let d = R * c;
      return d;
    };

    const arrayWithDistance = placesArray.map((it) => {
      const placeDistance = getDistanceFromLatLonInKm(activePlace.location.latitude, activePlace.location.longitude, it.location.latitude, it.location.longitude);
      it.distance = placeDistance;
      return it;
    });

    const nearestPlaces = arrayWithDistance.sort(function (a, b) {
      return a.distance - b.distance;
    });

    dispatch(ActionCreatorsOffer.getNearestPlaces(nearestPlaces.slice(0, 4)));
  }
});


let connectedComponent = connect(mapStateToProps, mapDispatchToProps)(PlaceCard);

export {connectedComponent as PlaceCard};
