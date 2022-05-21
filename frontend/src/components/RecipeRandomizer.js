import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const RecipeRandomizer = () => {
  const SPOONACULAR_API_KEY = "83f54ac71dc9427e97aaf9cdae18beb3";
  const [mealInfo, setMealInfo] = useState();
  const [calories, setCalories] = useState(2000);

  const handleChange = (e) => {
    setCalories(e.target.value);
  };

  const navigate = useNavigate();

  const handleNav = (id) => {
    navigate(`/${id}`);
  };

  const getMealInfo = () => {
    fetch(
      `https://api.spoonacular.com/mealplanner/generate?apiKey=${SPOONACULAR_API_KEY}&timeFrame=day&targetCalories=${calories}`
    )
      .then((res) => res.json())
      .then((data) => {
        setMealInfo(data);
      })
      .catch((error) => {
        console.log(error);
      }, []);
  };

  return (
    <Container>
      {mealInfo &&
        mealInfo.meals.map((meal) => (
          <Wrapper>
            <StyledImage
              onClick={() => handleNav(meal.id)}
              src={`https://spoonacular.com/recipeImages/${meal.id.toString()}-312x231.jpg`}
            />
            <span className="homepageText">{meal.title}</span>
          </Wrapper>
        ))}
      <WrapperTwo>
        <input
          type="number"
          placeholder="Calories (e.g. 2000)"
          onChange={handleChange}
        />
        <button className="buttonstyle-hover click" onClick={getMealInfo}>
          Surprise me!{" "}
        </button>
      </WrapperTwo>
      <div></div>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const Wrapper = styled.div`
  padding: 22px;
  position: relative;
  width: 150px;
  text-align: center;
`;
const WrapperTwo = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding-left: 22px;
  padding-bottom: 10px;
`;
const StyledImage = styled.img`
  width: 150px;
  border-radius: 10%;
`;

export default RecipeRandomizer;
