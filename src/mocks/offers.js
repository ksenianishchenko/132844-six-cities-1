import PropTypes from "prop-types";

export const mockPlaces = PropTypes.shape({
  "id": PropTypes.number,
  "city": PropTypes.shape({
    "name": PropTypes.string,
    "location": PropTypes.shape({
      "latitude": PropTypes.number,
      "longitude": PropTypes.number,
      "zoom": PropTypes.number
    })
  }),
  "is_premium": PropTypes.bool,
  "is_favorite": PropTypes.bool,
  "preview_image": PropTypes.string,
  "images": PropTypes.array,
  "price": PropTypes.number,
  "rating": PropTypes.number,
  "title": PropTypes.string,
  "type": PropTypes.string,
  "bedrooms": PropTypes.number,
  "max_adults": PropTypes.number,
  "goods": PropTypes.array,
  "host": PropTypes.shape({
    "id": PropTypes.number,
    "is_pro": PropTypes.bool,
    "name": PropTypes.string,
    "avatar_url": PropTypes.string
  }),
  "description": PropTypes.string,
});

export const mockCity = PropTypes.shape({
  "city": PropTypes.shape({
    "name": PropTypes.string,
    "location": PropTypes.shape({
      "latitude": PropTypes.number,
      "longitude": PropTypes.number,
      "zoom": PropTypes.number
    })
  })
});

export const mockReview = PropTypes.shape({
  "id": PropTypes.number,
  "user": PropTypes.shape({
    "id": PropTypes.number,
    "is_pro": PropTypes.bool,
    "name": PropTypes.string,
    "avatar_url": PropTypes.string
  }),
  "rating": PropTypes.number,
  "comment": PropTypes.string
});
