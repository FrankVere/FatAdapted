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
    <Container>
      {Object.keys(singleRecipeInfo).length > 0 ? (
        <>
          <RecipeInfoDetail />
          <StyledHeader>Ingredients required! </StyledHeader>

          <img src={ingredientImgSrc} />
          <ServingPrepWrapper>
            <div>Serves: {singleRecipeInfo.servings}</div>
            <div>Prep time: {singleRecipeInfo.readyInMinutes} minutes</div>
            <div>
              Weight Watcher Smart Points:{" "}
              {singleRecipeInfo.weightWatcherSmartPoints}
            </div>
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
        </>
      ) : (
        <div className="lds-hourglass" />
      )}
    </Container>
  );
};

const Instructions = styled.div`
  text-align: left;
  margin-left: 5px;
  margin-right: 5px;
  padding-right: 5px;
`;

const StyledHeader = styled.h2`
  justify-content: center;
`;

const StyledNutritionLabel = styled.img`
  height: 320px;
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
`;

const InstructionsWrapper = styled.div`
  border: 2px solid #f5ce62;
  margin: 5px;
  border-radius: 20px;
  box-shadow: 0 0 10px 5px #e85a19;
  background-color: #fff;
`;
export default RecipeInfo;
