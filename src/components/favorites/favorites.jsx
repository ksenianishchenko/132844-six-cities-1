import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import Footer from "../footer/footer.jsx";
import {connect} from "react-redux";
import {getFavoritesList} from "../../reducers/favorites/selectors.js";
import {loadFavorites, removeFavorite} from "../../reducers/favorites/favorites.js";
import {Link, Redirect} from 'react-router-dom';
import {ActionCreators as ActionCreatorsOffer} from "../../reducers/offer/offer.js";
import {getCity} from "../../reducers/game/selectors.js";
import {getOffers} from "../../reducers/data/selectors.js";
import {getUsersReviews} from "../../reducers/comments/comments.js";
import {getAuthorizationStatus} from "../../reducers/user/selectors.js";

class Favorites extends PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.loadFavorites();
  }

  render() {
    const {favoritesList, getOffer, getOfferReviews, getNearestPlaces, places, removeFavoriteCards, isAuthorizationRequired} = this.props;
    const cities = this._handleGetFavoriteListCities(favoritesList);

    if (isAuthorizationRequired) {
      return <Redirect to="/login" />;
    }

    if (!favoritesList.length) {
      return <React.Fragment>
        <main className="page__main page__main--favorites page__main--favorites-empty">
          <div className="page__favorites-container container">
            <section className="favorites favorites--empty">
              <h1 className="visually-hidden">Favorites (empty)</h1>
              <div className="favorites__status-wrapper">
                <b className="favorites__status">Nothing yet saved.</b>
                <p className="favorites__status-description">Save properties to narrow down search or plan yor future trips.</p>
              </div>
            </section>
          </div>
        </main>
      </ React.Fragment>;
    }
    return <React.Fragment>
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {cities.map((it, index) => {
                const offers = favoritesList.filter((item) => it === item.city.name);
                return <li className="favorites__locations-items" key={`favorite-item-${index}`}>
                  <div className="favorites__locations locations locations--current">
                    <div className="locations__item">
                      <a className="locations__item-link" href="#">
                        <span>{it}</span>
                      </a>
                    </div>
                  </div>
                  <div className="favorites__places">
                    {offers.map((offer, i) => {
                      return <article className="favorites__card place-card" key={`favorite-offer-${i}`}>
                        <div className="favorites__image-wrapper place-card__image-wrapper">
                          <a href="#">
                            <img className="place-card__image" src={offer.preview_image} width="150" height="110" alt="Place image" />
                          </a>
                        </div>
                        <div className="favorites__card-info place-card__info">
                          <div className="place-card__price-wrapper">
                            <div className="place-card__price">
                              <b className="place-card__price-value">&euro;{offer.price}</b>
                              <span className="place-card__price-text">&#47;&nbsp;night</span>
                            </div>
                            <button className={`place-card__bookmark-button button ${offer.is_favorite ? `place-card__bookmark-button--active` : ``}`} type="button" onClick={() => {
                              removeFavoriteCards(offer.id);
                            }}>
                              <svg className="place-card__bookmark-icon" width="18" height="19">
                                <use xlinkHref="#icon-bookmark"></use>
                              </svg>
                              <span className="visually-hidden">In bookmarks</span>
                            </button>
                          </div>
                          <div className="place-card__rating rating">
                            <div className="place-card__stars rating__stars">
                              <span style={{width: `${Math.round(offer.rating) * 100 / 5}%`}}></span>
                              <span className="visually-hidden">Rating</span>
                            </div>
                          </div>
                          <h2 className="place-card__name">
                            <Link onClick = {() => {
                              getOffer(offer);
                              getOfferReviews(offer.id);
                              getNearestPlaces(offer, places);
                            }} to={`/offer/${offer.id}`}>{offer.title}</Link>
                          </h2>
                          <p className="place-card__type">{offer.type}</p>
                        </div>
                      </article>;
                    })}
                  </div>
                </li>;
              })}
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </React.Fragment>;
  }

  _handleGetFavoriteListCities(array) {
    const cities = [...new Set(array.map((item) => item.city.name))];
    return cities;
  }
}

Favorites.propTypes = {
  favoritesList: PropTypes.array.isRequired,
  loadFavorites: PropTypes.func,
  getNearestPlaces: PropTypes.func,
  getOfferReviews: PropTypes.func,
  getOffer: PropTypes.func,
  places: PropTypes.array,
  removeFavoriteCards: PropTypes.func,
  isAuthorizationRequired: PropTypes.bool
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  favoritesList: getFavoritesList(state),
  places: getOffers(state).filter((place) => place.city.name === getCity(state).name),
  isAuthorizationRequired: getAuthorizationStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  loadFavorites: () => {
    dispatch(loadFavorites());
  },
  removeFavoriteCards: (id) => {
    dispatch(removeFavorite(id));
  },
  getOfferReviews: (id) => {
    dispatch(getUsersReviews(id));
  },
  getOffer: (offer) => {
    dispatch(ActionCreatorsOffer.getActiveOffer(offer));
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

let connectedComponent = connect(mapStateToProps, mapDispatchToProps)(Favorites);

export {connectedComponent as Favorites};
