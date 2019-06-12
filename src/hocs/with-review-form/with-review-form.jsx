import React, {PureComponent} from "react";

const withReviewForm = (Component) => {
  class WithReviewForm extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        rating: 0,
        comment: ``
      };

      this._handleValidateForm = this._handleValidateForm.bind(this);
    }

    render() {
      return <Component
        {...this.props}
        review = {this.state}
        onResetForm = { () => {
          this.setState({
            rating: 0,
            comment: ``
          });
        }}
        onTextAreaClick = {(text) => this.setState({
          comment: text
        })}
        onRadioClick = {(value) => this.setState({
          rating: value
        })}
        onValidateForm = {this._handleValidateForm}
      />;
    }

    _handleValidateForm() {
      const {rating, comment} = this.state;
      return (
        rating > 0 &&
        comment.length > 50 &&
        comment.length < 300
      );
    }
  }
  return WithReviewForm;
};

export default withReviewForm;
