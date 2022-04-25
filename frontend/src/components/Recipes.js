import React, { useState } from "react";
import styled from "styled-components";

const Recipes = () => {
  const SPOONACULAR_API_KEY = "83f54ac71dc9427e97aaf9cdae18beb3";
  const [mealInfo, setMealInfo] = useState(null);
  const [calories, setCalories] = useState(2000);

  const handleChange = (e) => {
    setCalories(e.target.value);
  };

  const getMealInfo = () => {
    fetch()
      //   `https://api.spoonacular.com/mealplanner/generate?apiKey=${SPOONACULAR_API_KEY}&timeFrame=day&targetCalories=${calories}&diet=Paleo&Ketogenic`
      .then((response) => response.json())
      .then((data) => {
        setMealInfo(data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Container>
      <h1>hi</h1>
      <Wrapper>
        <input
          type="number"
          placeholder="Calories (e.g. 2000)"
          onChange={handleChange}
        />
      </Wrapper>
      <StyledSubmitButton onClick={getMealInfo}>
        Get Randomized Daily Meal Plan!{" "}
        {/* {mealInfo && <MealList mealList={mealInfo} />} */}
      </StyledSubmitButton>
    </Container>
  );
};

const Container = styled.div``;
const Wrapper = styled.div``;
const StyledSubmitButton = styled.button``;

export default Recipes;
