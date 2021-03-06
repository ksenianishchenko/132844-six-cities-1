import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getActiveOffer, getNearestPlaces} from "../../reducers/offer/selectors.js";
import {getReviews} from "../../reducers/comments/selectors.js";
import {ReviewsList} from "../reviews-list/reviews-list.jsx";
import NearestPlacesList from "../nearest-places-list/nearest-places-list.jsx";
import withActiveOffer from "../../hocs/with-active-offer/with-active-offer.jsx";
import Map from "../map/map.jsx";
import {sendFavorite, changeActiveOffer} from "../../reducers/favorites/favorites.js";
import {getCity} from "../../reducers/game/selectors.js";
import {mockPlaces, mockCity, mockReview} from "../../mocks/offers.js";


const NearestPlacesListWrapper = withActiveOffer(NearestPlacesList);

class Offer extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {activeOffer, reviewsArray, nearestPlaces, activeCity, changeActiveOfferOnCLick} = this.props;
    return <React.Fragment>
      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {activeOffer.images.slice(0, 6).map((it, index) => {
                return <div className="property__image-wrapper" key={`index-${index}`}>
                  <img className="property__image" src={it} alt="Photo studio"/>
                </div>;
              })}
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              <div className="property__mark">
                <span>{activeOffer.is_premium ? `Premium` : `Not Premium`}</span>
              </div>
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {activeOffer.title}
                </h1>
                <button className={`property__bookmark-button button ${activeOffer.is_favorite ? `property__bookmark-button--active` : ``}`} type="button" onClick={() =>{
                  changeActiveOfferOnCLick(activeOffer.id, activeOffer.is_favorite);
                }}>
                  <svg className="property__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{width: `${Math.round(activeOffer.rating) * 100 / 5}%`}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{activeOffer.rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {activeOffer.type}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {activeOffer.bedrooms} Bedrooms
                </li>
                <li className="property__feature property__feature--adults">
                  Max {activeOffer.max_adults} adults
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{activeOffer.price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {activeOffer.goods.map((it, index) => {
                    return <li className="property__inside-item" key={`index-${index}`}>
                      {it}
                    </li>;
                  })}
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                    <img className="property__avatar user__avatar" src={`/` + activeOffer.host.avatar_url} width="74" height="74" alt="Host avatar" />
                  </div>
                  <span className="property__user-name">
                    {activeOffer.host.name}
                  </span>
                  <span className="property__user-status">
                    {activeOffer.host.is_pro ? `Pro` : ``}
                  </span>
                </div>
                <div className="property__description">
                  <p className="property__text">
                    {activeOffer.description}
                  </p>
                </div>
              </div>
              <ReviewsList
                reviewsArray = {reviewsArray}
                id = {activeOffer.id}
              />
            </div>
          </div>
          <section className="property__map map">
            <Map
              offers = {nearestPlaces}
              activeCity = {activeCity}
              activeOffer = {activeOffer}
            />
          </section>
        </section>
        <div className="container">
          <NearestPlacesListWrapper
            nearestPlaces = {nearestPlaces}
          />
        </div>
      </main>
    </React.Fragment>;
  }
}

Offer.propTypes = {
  reviewsArray: PropTypes.arrayOf(mockReview).isRequired,
  nearestPlaces: PropTypes.arrayOf(mockPlaces).isRequired,
  activeCity: mockCity,
  addToFavorites: PropTypes.func,
  changeActiveOfferOnCLick: PropTypes.func,
  activeOffer: mockPlaces.isRequired,
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  activeOffer: getActiveOffer(state),
  reviewsArray: getReviews(state),
  nearestPlaces: getNearestPlaces(state),
  activeCity: getCity(state),
});

const mapDispatchToProps = (dispatch) => ({
  addToFavorites: (id, status) => {
    dispatch(sendFavorite(id, status));
  },
  changeActiveOfferOnCLick: (place) => {
    dispatch(changeActiveOffer(place));
  },
});

let connectedComponent = connect(mapStateToProps, mapDispatchToProps)(Offer);

export {connectedComponent as Offer};
