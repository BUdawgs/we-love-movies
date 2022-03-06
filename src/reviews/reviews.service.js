const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

const addCritics = mapProperties({
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
});

// get review data from reviewId
const read = (reviewId) => {
  return knex("reviews").select("*").where({ review_id: reviewId }).first();
};

// list movie reviews for movieId
const update = (updatedReview) => {
  return knex("reviews")
    .select("*")
    .where({ review_id: updatedReview.review_id })
    .update(updatedReview);
};

// read review with critics
const readReviewWithCritics = (reviewId) => {
  return knex("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select("*")
    .where({ review_id: reviewId })
    .first()
    .then(addCritics);
};

// delete review from database
const destroy = (reviewId) => {
  return knex("reviews").select("*").where({ review_id: reviewId }).del();
};

module.exports = {
  read,
  update,
  readReviewWithCritics,
  destroy,
};