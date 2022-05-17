import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { MealContext } from "../MealContext";
import { useParams } from "react-router-dom";
import RecipeInfoDetail from "./RecipeInfoDetail";
import { useAuth0 } from "@auth0/auth0-react";

const RecipeInfo = () => {
  const {
    actions: { getSingleRecipeInfo },
  } = useContext(MealContext);

  const {
    state: { singleRecipeInfo },
  } = useContext(MealContext);

  const { recipeName } = useParams();

  const _id = singleRecipeInfo.id;

  const [imgSrc, setImgSrc] = useState("");
  const [ingredientImgSrc, setIngredientImgSrc] = useState("");

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

  useEffect(() => {
    getSingleRecipe();
    getNutritonLabel();
    getIngredientsImages();
  }, [_id]);

  console.log(singleRecipeInfo);

  return (
    <div>
      {Object.keys(singleRecipeInfo).length > 0 ? (
        <>
          <RecipeInfoDetail />
          <LabelWrapper>
            <StyledNutritionLabel src={imgSrc} />
          </LabelWrapper>
          <StyledHeader>Ingredients required! </StyledHeader>
          <img
            src={ingredientImgSrc}
            style={{ width: "100vw", height: "300px" }}
          />
          <Instructions>
            {Object.keys(singleRecipeInfo).length > 0 && (
              <ol>
                {singleRecipeInfo.analyzedInstructions[0].steps.map((step) => (
                  <li>{step.step}</li>
                ))}
              </ol>
            )}
          </Instructions>
        </>
      ) : (
        <div> Loading... </div>
      )}
    </div>
  );
};

const Instructions = styled.div`
  display: flex;
  text-align: left;
  margin-top: -200px;
`;
const StyledHeader = styled.h2`
  display: flex;
  justify-content: center;
`;
const StyledNutritionLabel = styled.img`
  height: 340px;
  width: 240px;
`;

const LabelWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
export default RecipeInfo;
