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
  console.log(req.params);
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
  const { email } = req.body;

  try {
    const client = await new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("FatAdapted");
    const userExists = await db.collection("users").findOne({ email: email });
    if (userExists) {
      return res
        .status(400)
        .json({ status: 400, message: "Email already registered!" });
    } else {
      await db.collection("users").insertOne(req.body);
      return res
        .status(200)
        .json({ status: 200, message: "Successfully created user!" });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getRecipes,
  getSingleRecipeInfo,
  postUserHandler,
};
