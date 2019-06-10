import React from "react";
import renderer from "react-test-renderer";
import ReviewsList from "./reviews-list.jsx";

it(`Reviews list renders correctly`, () => {
  const reviews = [
    {
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
    }
  ];

  const tree = renderer
  .create(<ReviewsList
    reviewsArray = {reviews}
  />).toJSON();

  expect(tree).toMatchSnapshot();
});
