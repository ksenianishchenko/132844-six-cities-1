import React, {PureComponent} from "react";

const withAuthorizationForm = (Component) => {
  class WithAuthorizationForm extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        userData: {
          email: null,
          password: null
        }
      };

      this._handleGetInputValue = this._handleGetInputValue.bind(this);
    }

    render() {
      const {userData} = this.state;
      return <Component
        {...this.props}
        userData = {userData}
        handleGetInputValue = {this._handleGetInputValue}
      />;
    }

    _handleGetInputValue(key, value) {
      this.setState({
        userData: Object.assign({}, this.state.userData, {
          [key]: value
        })
      });
    }
  }
  return WithAuthorizationForm;
};

export default withAuthorizationForm;
