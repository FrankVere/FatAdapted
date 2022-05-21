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
        <Wrapper key={id}>
          <PhotoWrapper>
            <StyledRecipeImage onClick={handleNav} src={image} />
          </PhotoWrapper>
          <StyledTitle>{title}</StyledTitle>
          <div>
            <b className="bold">Calories: </b> {nutrition.nutrients[0].amount}
          </div>
          <div>
            <b className="bold">Fat: </b> {nutrition.nutrients[1].amount}
          </div>
          <div>
            <b className="bold">Carbohydrates: </b>
            {nutrition.nutrients[3].amount}
          </div>
          <div>
            <b className="bold">Sugar: </b>
            {nutrition.nutrients[5].amount}
          </div>
          <div>
            <b className="bold">Protein: </b>
            {nutrition.nutrients[8].amount}
          </div>
        </Wrapper>
      </ContainerCard>
    );
  }
};

const StyledTitle = styled.h2`
  font-size: 18px;
`;

const ContainerCard = styled.div`
  height: 300px;
  width: 85vw;
  border: solid;
  background-color: #ffbb99;
`;

const StyledRecipeImage = styled.img`
  width: 150px;
  border-radius: 10%;
  margin-top: 10px;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
`;

const PhotoWrapper = styled.div`
  justify-content: center;
`;

export default RecipeByDay;
