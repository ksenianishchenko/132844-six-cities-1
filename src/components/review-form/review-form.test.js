import React from "react";
import {ReviewForm} from "./review-form.jsx";
import ShallowRenderer from 'react-test-renderer/shallow';
import {createStore} from 'redux';
import combineReducers from "../../reducers/index.js";
import {Provider} from 'react-redux';

it(`Review form renders correctly`, () => {
  const store = createStore(combineReducers);
  const renderer = new ShallowRenderer();
  const tree = renderer.render(<Provider store={store}>
    <ReviewForm
      id = {3}
    />
  </Provider>);

  expect(tree).toMatchSnapshot();
});
