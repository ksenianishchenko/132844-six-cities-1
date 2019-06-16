import React, {PureComponent} from "react";
import {connect} from "react-redux";
import {postUserReview} from "../../reducers/comments/comments.js";
import {getErrorPostComment} from "../../reducers/comments/selectors.js";
import PropTypes from "prop-types";
import {mockReview} from "../../mocks/offers.js";

class ReviewForm extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {submitUserReview, id, review, onResetForm, onTextAreaClick, onRadioClick, onValidateForm} = this.props;
    const isEnabled = onValidateForm();
    const ratingChoises = [`Perfect`, `good`, `not bad`, `badly`, `terribly`];
    return <form className="reviews__form form" action="#" method="post" onSubmit = {(evt) => {
      evt.preventDefault();
      if (!isEnabled) {
        return;
      }
      submitUserReview(id, review.rating, review.comment);
      onResetForm();
      evt.target.reset();
    }}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {ratingChoises.map((it, index) => {
          return <React.Fragment key={`input-rating-${index + 1}`}>
            <input className="form__rating-input visually-hidden" name="rating" value={ratingChoises.length - index} id={`${ratingChoises.length - index}-stars`} type="radio" required onClick = {(evt) => {
              const target = evt.target;
              const value = target.value;
              const numberValue = Number(value);
              onRadioClick(numberValue);
            }}/>
            <label htmlFor={`${ratingChoises.length - index}-stars`} className="reviews__rating-label form__rating-label" title={it}>
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </React.Fragment>;
        })}
      </div>
      <textarea className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved" maxLength="300" required onChange = {(evt) => {
        const target = evt.target;
        const text = target.value;
        onTextAreaClick(text);
      }}></textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={!isEnabled}>Submit</button>
      </div>
    </form>;
  }
}

ReviewForm.propTypes = {
  submitUserReview: PropTypes.func,
  id: PropTypes.number,
  review: mockReview,
  onTextAreaClick: PropTypes.func,
  onRadioClick: PropTypes.func,
  onResetForm: PropTypes.func,
  onValidateForm: PropTypes.func,
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  errorPostComment: getErrorPostComment(state),
});

const mapDispatchToProps = (dispatch) => ({
  submitUserReview: (id, rating, comment) => {
    dispatch(postUserReview(id, rating, comment));
  }
});

let connectedComponent = connect(mapStateToProps, mapDispatchToProps)(ReviewForm);

export {connectedComponent as ReviewForm};
