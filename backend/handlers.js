require("dotenv").config();
const { SPOONACULAR_API_KEY } = process.env;
const request = require("request-promise");

const getRecipes = async (req, res) => {
  try {
    const result = await request(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${SPOONACULAR_API_KEY}&diet=Paleo&number=100`,
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

module.exports = {
  getRecipes,
};
