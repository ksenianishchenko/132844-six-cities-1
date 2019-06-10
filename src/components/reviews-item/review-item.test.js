import React from "react";
import renderer from "react-test-renderer";
import ReviewsItem from "./reviews-item.jsx";

it(`Review renders correctly`, () => {
  const review = {
    "id": 1,
    "user": {
      "id": 4,
      "is_pro": false,
      "name": `Max`,
      "avatar_url": `img/1.png`
    },
    "rating": 4,
    "comment": `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
    "date": `2019-05-08T14:13:56.569Z`
  };

  const tree = renderer
  .create(<ReviewsItem
    review = {review}
  />).toJSON();

  expect(tree).toMatchSnapshot();
});
