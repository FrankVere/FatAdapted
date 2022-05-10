const express = require("express");
const morgan = require("morgan");

const {
  getRecipes,
  getSingleRecipeInfo,
  postUserHandler,
  postLikedRecipe,
  getLikedRecipes,
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
  .post("/post-user/", postUserHandler)
  .post("/post-liked-recipe/", postLikedRecipe)

  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not what you are looking for.",
    });
  })

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
