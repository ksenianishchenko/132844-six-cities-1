import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getActiveOffer} from "../../reducers/offer/selectors.js";
import {ActionCreators} from "../../reducers/offer/offer.js";
import {Link} from 'react-router-dom';

class PlaceCard extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {place, onclick, getOffer} = this.props;
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
          <button className="place-card__bookmark-button button" type="button">
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
  getOffer: PropTypes.func
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  activeOffer: getActiveOffer(state),
});

const mapDispatchToProps = (dispatch) => ({
  getOffer: (offer) => {
    dispatch(ActionCreators.getActiveOffer(offer));
  },
});


let connectedComponent = connect(mapStateToProps, mapDispatchToProps)(PlaceCard);

export {connectedComponent as PlaceCard};
