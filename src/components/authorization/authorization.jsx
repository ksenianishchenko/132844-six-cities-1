import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {onAuthorizationRequest} from "../../reducers/user/user.js";
import {connect} from "react-redux";
import {getCity} from "../../reducers/game/selectors.js";
import {getAuthorizationError, getAuthorizationStatus} from "../../reducers/user/selectors.js";
import {Redirect} from "react-router-dom";
import {mockCity} from "../../mocks/offers.js";

class Authorization extends PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    const {getAuthorizationPostResponse, activeCity, userData, handleGetInputValue, isAuthorizationRequired, authorizationError} = this.props;

    if (!isAuthorizationRequired) {
      return <Redirect to="/" />;
    }

    return <main className="page__main page__main--login">
      <div className="page__login-container container">
        <section className="login">
          <h1 className="login__title">Sign in</h1>
          <form className="login__form form" action="#" method="post" onSubmit={(evt) => {
            evt.preventDefault();
            getAuthorizationPostResponse(userData.email, userData.password);
          } }>
            <div className="login__input-wrapper form__input-wrapper">
              <label className="visually-hidden">E-mail</label>
              <input className="login__input form__input" type="email" name="email" placeholder="Email" required onChange={(evt) => {
                const target = evt.target;
                const value = target.value;
                const key = target.name;
                handleGetInputValue(key, value);
              }}/>
            </div>
            <div className="login__input-wrapper form__input-wrapper">
              <label className="visually-hidden">Password</label>
              <input className="login__input form__input" type="password" name="password" placeholder="Password" required onChange={(evt) => {
                const target = evt.target;
                const value = target.value;
                const key = target.name;
                handleGetInputValue(key, value);
              }}/>
            </div>
            <button className="login__submit form__submit button" type="submit">Sign in</button>
            {authorizationError ? <div style={{color: `red`}}>Ошибка 400</div> : ``}
          </form>
        </section>
        <section className="locations locations--login locations--current">
          <div className="locations__item">
            <a className="locations__item-link" href="#">
              <span>{activeCity.name}</span>
            </a>
          </div>
        </section>
      </div>
    </main>;
  }
}

Authorization.propTypes = {
  onFormSubmit: PropTypes.func,
  getAuthorizationPostResponse: PropTypes.func,
  activeCity: mockCity,
  authorizationError: PropTypes.string,
  handleGetInputValue: PropTypes.func,
  userData: PropTypes.object,
  isAuthorizationRequired: PropTypes.bool
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  activeCity: getCity(state),
  authorizationError: getAuthorizationError(state),
  isAuthorizationRequired: getAuthorizationStatus(state)
});

const mapDispatchToProps = (dispatch) => ({
  getAuthorizationPostResponse: (email, password) => {
    dispatch(onAuthorizationRequest(email, password));
  },
});


let connectedComponent = connect(mapStateToProps, mapDispatchToProps)(Authorization);

export {connectedComponent as Authorization};
