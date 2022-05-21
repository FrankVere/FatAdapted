import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { MealContext } from "../MealContext";
import { useParams } from "react-router-dom";
import RecipeInfoDetail from "./RecipeInfoDetail";
import { useNavigate } from "react-router-dom";

const RecipeInfo = () => {
  const {
    actions: { getSingleRecipeInfo },
  } = useContext(MealContext);

  const {
    state: { singleRecipeInfo },
  } = useContext(MealContext);

  const { recipeName } = useParams();

  const navigate = useNavigate();

  const handleNav = (id) => {
    navigate(`/${id}`);
  };

  const _id = singleRecipeInfo.id;
  const [imgSrc, setImgSrc] = useState("");
  const [ingredientImgSrc, setIngredientImgSrc] = useState("");
  const [similarRecipes, setSimilarRecipes] = useState([]);

  const getSingleRecipe = () => {
    fetch(`/get-single-recipe-info/${recipeName}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        getSingleRecipeInfo(data.data);
      });
  };

  const getNutritonLabel = () => {
    fetch(
      `https://api.spoonacular.com/recipes/${_id}/nutritionLabel.png?apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "image/png",
        },
      }
    ).then((data) => {
      setImgSrc(data.url);
    });
  };

  const getIngredientsImages = () => {
    fetch(
      `https://api.spoonacular.com/recipes/${_id}/ingredientWidget.png?apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}`,
      {
        method: "GET",
        headers: {
          Accept: "image/png",
          "Content-Type": "image/png",
        },
      }
    ).then((data) => {
      setIngredientImgSrc(data.url);
    });
  };

  const getSimilarRecipes = () => {
    fetch(
      `https://api.spoonacular.com/recipes/${_id}/similar?apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}&number=3`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setSimilarRecipes(data);
      });
  };

  useEffect(() => {
    getSingleRecipe();
    getNutritonLabel();
    getIngredientsImages();
    getSimilarRecipes();
  }, [_id]);

  console.log("similarRecipes");

  return (
    <Container>
      {Object.keys(singleRecipeInfo).length > 0 ? (
        <>
          <RecipeInfoDetail />
          <StyledHeader>Ingredients required </StyledHeader>
          <img src={ingredientImgSrc} />
          <ServingPrepWrapper>
            <p>Serves: {singleRecipeInfo.servings}</p>
            <p>Prep time: {singleRecipeInfo.readyInMinutes} minutes</p>
            <p>
              Weight Watcher Smart Points:{" "}
              {singleRecipeInfo.weightWatcherSmartPoints}
            </p>
          </ServingPrepWrapper>
          <InstructionsWrapper>
            <Instructions>
              {Object.keys(singleRecipeInfo).length > 0 && (
                <ol>
                  {singleRecipeInfo.analyzedInstructions[0].steps.map(
                    (step) => (
                      <li>{step.step}</li>
                    )
                  )}
                </ol>
              )}
            </Instructions>
          </InstructionsWrapper>
          <LabelWrapper>
            <StyledNutritionLabel src={imgSrc} />
          </LabelWrapper>
          <Wrapper>
            {similarRecipes.map((meal) => (
              <>
                <StyledSimilarRecipesWrapper>
                  <StyledImage
                    onClick={() => handleNav(meal.id)}
                    src={`https://spoonacular.com/recipeImages/${meal.id}-312x231.jpg`}
                  />
                  <span
                    className="homepageText"
                    style={{ fontSize: "12px", display: "block" }}
                  >
                    {meal.title}
                  </span>
                </StyledSimilarRecipesWrapper>
              </>
            ))}
          </Wrapper>
        </>
      ) : (
        <SpinnerWrapper>
          <div className="lds-hourglass" />
        </SpinnerWrapper>
      )}
    </Container>
  );
};
const StyledImage = styled.img`
  width: 100px;
  border-radius: 10%;
`;

const Instructions = styled.div`
  text-align: left;
  margin-left: 5px;
  margin-right: 5px;
  padding-right: 5px;
`;

const StyledHeader = styled.h2`
  text-align: center;
  font-size: 20px;
`;

const StyledNutritionLabel = styled.img`
  height: 320px;
  margin-top: 40px;
`;

const LabelWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 70px;
`;

const ServingPrepWrapper = styled.div`
  text-align: center;
  margin-bottom: 30px;
`;

const InstructionsWrapper = styled.div`
  border: 2px solid #f5ce62;
  margin: 5px;
  border-radius: 20px;
  box-shadow: 0 0 10px 5px #e85a19;
  background-color: #fff;
`;

const SpinnerWrapper = styled.div`
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translateY(-50%);
  transform: translateX(-50%);
`;

const StyledSimilarRecipesWrapper = styled.div`
  padding: 20px;
`;
const Wrapper = styled.div`
  padding: 22px;
  width: 150px;
  text-align: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 87vw;
`;
export default RecipeInfo;
