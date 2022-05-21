const express = require("express");
const morgan = require("morgan");

const {
  getRecipes,
  getSingleRecipeInfo,
  postUserHandler,
  postLikedRecipe,
  getLikedRecipes,
  postMealPlan,
  getMealPlanRecipes,
  deleteLikedRecipe,
  getPreferenceRecipes,
  getUserPreferences,
  postUserPreference,
  updateUser,
  getUserPhoto,
} = require("./handlers");

const PORT = 8000;

express()
  .use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Methods",
      "OPTIONS, HEAD, GET, PUT, POST, DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(morgan("tiny"))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))

  //REST Endpoints//
  .get("/get-recipes/", getRecipes)
  .get("/get-single-recipe-info/:_id/", getSingleRecipeInfo)
  .get("/get-liked-recipes/:userInfo/", getLikedRecipes)
  .get("/get-preference-recipes/", getPreferenceRecipes)
  .get("/get-user-preferences/:userInfo/", getUserPreferences)
  .get("/get-user-photo/:userInfo/", getUserPhoto)
  .post("/get-meal-plan/", getMealPlanRecipes)
  .post("/post-user/", postUserHandler)
  .post("/post-liked-recipe/", postLikedRecipe)
  .post("/post-meal-plan/", postMealPlan)
  .post("/post-user-preference/", postUserPreference)
  .post("/update-user/", updateUser)
  .delete("/delete-liked-recipe/", deleteLikedRecipe)

  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not what you are looking for.",
    });
  })

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
