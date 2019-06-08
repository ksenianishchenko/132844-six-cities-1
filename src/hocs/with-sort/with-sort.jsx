import React, {PureComponent} from "react";

const withSort = (Component) => {
  class WithSort extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        sortingPlaces: null,
        activeElement: `Popular`,
        sortListOpen: false
      };

      this._getSortedPlaces = this._getSortedPlaces.bind(this);
    }

    render() {
      const {sortingPlaces, activeElement} = this.state;
      return <Component
        {...this.props}
        sortingPlaces = {sortingPlaces}
        activeElement = {activeElement}
        onGetActiveElement = {(item) => {
          this.setState({
            activeElement: item
          });
        }}
        onSortPlaces = {(places, item) => {
          this._getSortedPlaces(places, item);
        }}
        sortListOpen = {this.state.sortListOpen}
        onSortListToggle = {() => {
          this.setState({
            sortListOpen: !this.state.sortListOpen
          });
        }}
      />;
    }

    _getSortedPlaces(places, item) {
      let sorted = null;
      switch (item) {
        case `Popular`: sorted = null;
          break;
        case `Price: low to high`: sorted = places.sort(function (a, b) {
          return a.price - b.price;
        });
          break;
        case `Price: high to low`: sorted = places.sort(function (a, b) {
          return b.price - a.price;
        });
          break;
        case `Top rated first`: sorted = places.sort(function (a, b) {
          return b.rating - a.rating;
        });
          break;
      }

      this.setState({
        sortingPlaces: sorted
      });
    }
  }
  return WithSort;
};

export default withSort;
