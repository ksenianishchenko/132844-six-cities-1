import React from "react";
import {mockReview} from "../../mocks/offers.js";

const ReviewsItem = (props) => {
  const {review} = props;
  return <li className="reviews__item">
    <div className="reviews__user user">
      <div className="reviews__avatar-wrapper user__avatar-wrapper">
        <img className="reviews__avatar user__avatar" src={review.user.avatar_url} width="54" height="54" alt="Reviews avatar"/>
      </div>
      <span className="reviews__user-name">
        {review.user.name}
      </span>
    </div>
    <div className="reviews__info">
      <div className="reviews__rating rating">
        <div className="reviews__stars rating__stars">
          <span style={{width: `${Math.round(review.rating) * 100 / 5}%`}}></span>
          <span className="visually-hidden">Rating</span>
        </div>
      </div>
      <p className="reviews__text">
        {review.comment}
      </p>
      <time className="reviews__time" dateTime={getFormattedDate(review.date)}>{getFormattedDate(review.date)}</time>
    </div>
  </li>;
};

const getFormattedDate = (date) => {
  let newDate = new Date(date);
  let strArray = [`January`, `Febrary`, `March`, `April`, `May`, `June`, `July`, `August`, `September`, `October`, `November`, `December`];
  let m = strArray[newDate.getMonth()];
  let y = newDate.getFullYear();
  return `` + m + ` ` + y;
};

ReviewsItem.propTypes = {
  review: mockReview.isRequired,
};


export default ReviewsItem;
