require("dotenv").config();
const { SPOONACULAR_API_KEY, MONGO_URI } = process.env;
const request = require("request-promise");

const { MongoClient } = require("mongodb");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getRecipes = async (req, res) => {
  try {
    const result = await request(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${SPOONACULAR_API_KEY}&diet=Paleo&Ketogenic&number=2`,
      { headers: { Accept: "application/json" } }
    );
    return res.status(200).json({
      status: 200,
      message: "Succesfully retrieved data!",
      data: JSON.parse(result),
    });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ status: 400, message: "Something went wrong!" });
  }
};

const getSingleRecipeInfo = async (req, res) => {
  const _id = req.params._id;

  try {
    const result = await request(
      `https://api.spoonacular.com/recipes/${_id}/information?includeNutrition=true&apiKey=${SPOONACULAR_API_KEY}`,
      { headers: { Accept: "application/json" } }
    );
    return res.status(200).json({
      status: 200,
      message: "Successfully retrieved recipe details!",
      data: JSON.parse(result),
    });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ status: 400, message: "Something went wrong!" });
  }
};

const postUserHandler = async (req, res) => {
  const {
    email,
    given_name,
    family_name,
    nickname,
    name,
    updated_at,
    email_verified,
    sub,
    picture,
  } = req.body;
  const likedRecipes = [];
  const userObject = {
    email: email,
    given_name: given_name,
    family_name: family_name,
    nickname: nickname,
    name: name,
    updated_at: updated_at,
    email_verified: email_verified,
    sub: sub,
    picture: picture,
    likedRecipes: likedRecipes,
  };

  try {
    const client = await new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("FatAdapted");
    const userExists = await db.collection("users").findOne({ email: email });

    if (userExists) {
      return res.status(400).json({
        status: 400,
        message: "Email already registered!",
        data: { email: email, given_name: given_name, picture: picture },
      });
    } else {
      await db.collection("users").insertOne(userObject);
      return res.status(200).json({
        status: 200,
        message: "Successfully created user!",
        data: userObject,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const postLikedRecipe = async (req, res) => {
  const { id, userInfo } = req.body;

  try {
    const client = await new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("FatAdapted");
    const userExists = await db
      .collection("users")
      .findOne({ email: userInfo });
    if (userExists.likedRecipes.includes(id.toString())) {
      return res
        .status(400)
        .json({ status: 400, message: "Recipe already liked!" });
    } else {
      await db
        .collection("users")
        .updateOne(
          { email: userInfo },
          { $push: { likedRecipes: id.toString() } }
        );
      return res.status(200).json({
        status: 200,
        message: "Successfully liked recipe!",
        data: id,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: 400, error: "Unexpected error" });
  }
};

const getLikedRecipes = async (req, res) => {
  const { userInfo } = req.params;
  try {
    const client = await new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("FatAdapted");
    const userExists = await db
      .collection("users")
      .findOne({ email: userInfo });
    return res.status(200).json({
      status: 200,
      message: "Successfully found liked recipe!",
      data: userExists.likedRecipes,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ status: 400, error: "Couldn't locate liked recipe!" });
  }
};

const postMealPlan = async (req, res) => {
  const { userInfo, weeklyMealPlan } = req.body;
  console.log("hi", req.body);
  try {
    const client = await new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("FatAdapted");
    const userExists = await db
      .collection("users")
      .findOne({ email: userInfo });
    if (userExists) {
      await db
        .collection("users")
        .updateMany(
          { email: userInfo },
          { $set: { mealPlan: weeklyMealPlan } }
        );
      return res
        .status(200)
        .json({ status: 200, message: "Successfully posted meal plan!" });
    } else {
      return res
        .status(400)
        .json({ status: 400, error: "Couldn't find user!" });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ status: 400, error: "Couldn't post meal plan!" });
  }
};
// this is shaped as a post because the routes weren't working for some reason using params, it would give me errors inside a different component. initially had two gets using useParams but they were in conflict with one another/
const getMealPlanRecipes = async (req, res) => {
  const { userInfo } = req.body;
  try {
    const client = await new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("FatAdapted");
    const userExists = await db
      .collection("users")
      .findOne({ email: userInfo });
    return res.status(200).json({
      status: 200,
      message: "Successfully found meal plan recipe!",
      data: userExists.mealPlan,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ status: 400, error: "Couldn't locate meal plan recipes!" });
  }
};

const deleteLikedRecipe = async (req, res) => {
  const { userInfo, id } = req.body;
  try {
    const client = await new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("FatAdapted");
    const userExists = await db
      .collection("users")
      .findOne({ email: userInfo });
    if (userExists) {
      await db
        .collection("users")
        .updateOne(
          { email: userInfo },
          { $pull: { likedRecipes: id.toString() } }
        );
      return res
        .status(200)
        .json({ status: 200, message: "Liked recipe sucessfully removed!" });
    } else {
      return res
        .status(400)
        .json({ status: 400, message: "Couldn't remove liked recipe!" });
    }
  } catch (error) {
    return res
      .status(400)
      .json({ status: 400, error: "Couldn't delete liked recipe!" });
  }
};

const getPreferenceRecipes = async (req, res) => {
  const {
    cuisine,
    diet,
    intolerances,
    type,
    maxReadyTime,
    maxCarbs,
    maxProtein,
    maxCalories,
    maxFat,
    maxCaffeine,
  } = req.query;
  try {
    const result = await request(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${SPOONACULAR_API_KEY}&number=3&cuisine=${cuisine}&intolerances=${intolerances}&diet=${diet}&type=${type}&maxCarbs=${maxCarbs}&maxProtein=${maxProtein}&maxFat=${maxFat}&maxCaffeine=${maxCaffeine}&maxCalories=${maxCalories}&maxReadyTime=${maxReadyTime}`,
      { headers: { Accept: "application/json" } }
    );
    return res.status(200).json({
      status: 200,
      message: "Succesfully retrieved data!",
      data: JSON.parse(result),
    });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ status: 400, message: "Something went wrong!" });
  }
};

const postUserPreference = async (req, res) => {
  const { userInfo, query } = req.body;

  try {
    const client = await new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("FatAdapted");
    const userExists = await db
      .collection("users")
      .findOne({ email: userInfo });
    if (userExists) {
      await db
        .collection("users")
        .updateOne({ email: userInfo }, { $set: { preferences: query } });
      return res.status(200).json({
        status: 200,
        message: "Successfully added preferences!",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: 400, error: "Unexpected error" });
  }
};

const getUserPreferences = async (req, res) => {
  const { userInfo } = req.params;
  try {
    const client = await new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("FatAdapted");
    const userExists = await db
      .collection("users")
      .findOne({ email: userInfo });
    return res.status(200).json({
      status: 200,
      message: "Successfully retrieved preferences!",
      data: userExists.preferences,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ status: 400, error: "Couldn't locate preferences" });
  }
};

const updateUser = async (req, res) => {
  const { userInfo, profilePicture } = req.body;
  console.log(req.body);
  try {
    const client = await new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("FatAdapted");
    await db
      .collection("users")
      .updateOne(
        { email: userInfo },
        { $set: { profilePicture: profilePicture } }
      );
    return res.status(200).json({
      status: 200,
      message: "Updated Profile Photo",
    });
  } catch (error) {
    console.log(error);
  }
};
const getUserPhoto = async (req, res) => {
  const { userInfo } = req.params;
  try {
    const client = await new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("FatAdapted");
    const userProfile = await db
      .collection("users")
      .findOne({ email: userInfo });
    return res.status(200).json({
      status: 200,
      message: "Found profile photo!",
      data: userProfile.profilePicture,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getRecipes,
  getSingleRecipeInfo,
  getLikedRecipes,
  postUserHandler,
  postLikedRecipe,
  postMealPlan,
  postUserPreference,
  getMealPlanRecipes,
  deleteLikedRecipe,
  getPreferenceRecipes,
  getUserPreferences,
  updateUser,
  getUserPhoto,
};
