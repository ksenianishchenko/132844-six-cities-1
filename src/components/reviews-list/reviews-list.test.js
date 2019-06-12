import React from "react";
import ShallowRenderer from 'react-test-renderer/shallow';
import {ReviewsList} from "./reviews-list.jsx";
import {createStore} from 'redux';
import combineReducers from "../../reducers/index.js";
import {Provider} from 'react-redux';

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

  const renderer = new ShallowRenderer();
  const store = createStore(combineReducers);
  const tree = renderer
  .render(<Provider store={store}>
    <ReviewsList
      reviewsArray = {reviews}
    />
  </Provider>);

  expect(tree).toMatchSnapshot();
});
