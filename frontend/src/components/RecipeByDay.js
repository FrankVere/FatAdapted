import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const RecipeByDay = ({ recipeIDs, mealPlanRecipes }) => {
  let mealArray = mealPlanRecipes;
  let navigate = useNavigate();
  const handleNav = () => {
    navigate(`/${recipeIDs}`);
  };

  return (
    <ContainerCard>
      {mealArray &&
        mealArray.map(
          (meal) =>
            meal.id === recipeIDs && (
              <Wrapper key={meal.id}>
                <StyledRecipeImage onClick={handleNav} src={meal.image} />
                <StyledTitle>{meal.title}</StyledTitle>
                <StyledNutritionalInfo>
                  <div>Calories: {meal.nutrition.nutrients[0].amount}</div>
                  <div>Fat: {meal.nutrition.nutrients[1].amount}</div>
                  <div>Carbohydrates: {meal.nutrition.nutrients[3].amount}</div>
                  <div>Sugar: {meal.nutrition.nutrients[5].amount}</div>
                  <div>Protein: {meal.nutrition.nutrients[8].amount}</div>
                </StyledNutritionalInfo>
              </Wrapper>
            )
        )}
    </ContainerCard>
  );
};

export default RecipeByDay;

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
