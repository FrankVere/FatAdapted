import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const RecipeByDay = ({ recipeIDs, mealPlanRecipes }) => {
  const [thisRecipeData, setThisRecipeData] = useState(null);
  const navigate = useNavigate();

  const handleNav = () => {
    navigate(`/${recipeIDs}`);
  };

  useEffect(() => {
    if (mealPlanRecipes) {
      console.log(mealPlanRecipes, recipeIDs);
      setThisRecipeData(
        mealPlanRecipes.filter((meal) => {
          return meal.id == recipeIDs;
        })
      );
    }
  }, []);

  if (thisRecipeData) {
    const { id, image, title, nutrition } = thisRecipeData[0];

    return (
      <ContainerCard>
        This is a recipe
        <Wrapper key={id}>
          <StyledRecipeImage onClick={handleNav} src={image} />
          <StyledTitle>{title}</StyledTitle>
          <StyledNutritionalInfo>
            <div>Calories: {nutrition.nutrients[0].amount}</div>
            <div>Fat: {nutrition.nutrients[1].amount}</div>
            <div>Carbohydrates: {nutrition.nutrients[3].amount}</div>
            <div>Sugar: {nutrition.nutrients[5].amount}</div>
            <div>Protein: {nutrition.nutrients[8].amount}</div>
          </StyledNutritionalInfo>
        </Wrapper>
      </ContainerCard>
    );
  }
};

const StyledTitle = styled.h2``;

const ContainerCard = styled.div`
  height: 300px;
  width: 85vw;
  border: solid;
  background-color: #ffbb99;
`;

const StyledRecipeImage = styled.img`
  height: 120px;
  width: 120px;
  margin-left: 110px;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
`;
const StyledNutritionalInfo = styled.div``;

export default RecipeByDay;
