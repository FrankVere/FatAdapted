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
      `https://api.spoonacular.com/recipes/${_id}/information?apiKey=${SPOONACULAR_API_KEY}`,
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
  const { email, given_name, picture } = req.body;
  console.log(req.body);

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
      await db.collection("users").insertOne(req.body);
      return res.status(200).json({
        status: 200,
        message: "Successfully created user!",
        data: { email: email, given_name: given_name, picture: picture },
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const postLikedRecipe = async (req, res) => {
  const { id, userInfo } = req.body;
  console.log(userInfo);
  try {
    const client = await new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("FatAdapted");
    const userExists = await db
      .collection("users")
      .findOne({ email: userInfo });
    console.log(userExists);
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
  const { email, id } = req.body;
  try {
    const client = await new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("FatAdapted");
    db.collection("users").find();
    return res
      .status(200)
      .json({ status: 200, message: "Successfully found liked recipe!" });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ status: 400, error: "Couldn't locate liked recipe!" });
  }
};

module.exports = {
  getRecipes,
  getSingleRecipeInfo,
  getLikedRecipes,
  postUserHandler,
  postLikedRecipe,
};
