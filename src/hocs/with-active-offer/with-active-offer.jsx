import React, {PureComponent} from "react";

const withActiveOffer = (Component) => {
  class WithActiveOffer extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activeElement: ``
      };
    }

    render() {
      const {activeOffer} = this.state;
      return <Component
        {...this.props}
        activeOffer = {activeOffer}
        handleClick = {(item) => {
          this.setState({
            activeElement: item
          });
        }}
      />;
    }
  }
  return WithActiveOffer;
};

export default withActiveOffer;
