import React, { useState } from "react";
import styled from "styled-components";
import { NavLink, resolvePath } from "react-router-dom";

const RecipeRandomizer = () => {
  const SPOONACULAR_API_KEY = "83f54ac71dc9427e97aaf9cdae18beb3";
  const [mealInfo, setMealInfo] = useState();
  const [calories, setCalories] = useState(2000);

  const handleChange = (e) => {
    setCalories(e.target.value);
  };

  const getMealInfo = () => {
    fetch(
      `https://api.spoonacular.com/mealplanner/generate?apiKey=${SPOONACULAR_API_KEY}&timeFrame=day&targetCalories=${calories}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMealInfo(data);
      })
      .catch((error) => {
        console.log(error);
      }, []);
  };

  console.log(mealInfo);

  return (
    <Container>
      {mealInfo &&
        mealInfo.meals.map((meal) => (
          <>
            <p>{meal.title}</p>
            <img src={meal.sourceUrl} />
          </>
        ))}
      <Wrapper>
        <input
          type="number"
          placeholder="Calories (e.g. 2000)"
          onChange={handleChange}
        />
      </Wrapper>
      <StyledSubmitButton onClick={getMealInfo}>
        Get Randomized Daily Meal Plan!{" "}
      </StyledSubmitButton>
    </Container>
  );
};

const Container = styled.div``;
const Wrapper = styled.div``;
const StyledSubmitButton = styled.button``;

export default RecipeRandomizer;
