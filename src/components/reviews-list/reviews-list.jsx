import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import ReviewsItem from "../reviews-item/reviews-item.jsx";
import {ReviewForm} from "../review-form/review-form.jsx";
import {connect} from "react-redux";
import {getAuthorizationStatus} from "../../reducers/user/selectors.js";
import withReviewForm from "../../hocs/with-review-form/with-review-form.jsx";

const ReviewFormWrapper = withReviewForm(ReviewForm);

class ReviewsList extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {reviewsArray, isAuthorizationRequired, id} = this.props;
    const sortedReviewsArray = reviewsArray.sort(function (a, b) {
      return new Date(b.date) - new Date(a.date);
    });
    return <section className="property__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviewsArray.length}</span></h2>
      <ul className="reviews__list">
        {sortedReviewsArray.slice(0, 10).map((it, index) => {
          return <ReviewsItem
            review = {it}
            key = {`review-${index}`}
          />;
        })}
      </ul>
      { !isAuthorizationRequired ? <ReviewFormWrapper
        id = {id}
      /> : `` }
    </section>;
  }
}

ReviewsList.propTypes = {
  reviewsArray: PropTypes.array.isRequired,
  isAuthorizationRequired: PropTypes.bool.isRequired,
  id: PropTypes.number
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  isAuthorizationRequired: getAuthorizationStatus(state),
});

let connectedComponent = connect(mapStateToProps, null)(ReviewsList);

export {connectedComponent as ReviewsList};
