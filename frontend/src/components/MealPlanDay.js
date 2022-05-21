import React, { useState } from "react";
import styled from "styled-components";
import RecipeByDay from "./RecipeByDay";
import calendarPhoto from "../images/calendarPhoto.jpg";

const MealPlanDay = ({ recipeIDs, index, mealPlanRecipes }) => {
  const [displaying, setDisplaying] = useState(false);
  const dayByIndex = {
    0: "Monday",
    1: "Tuesday",
    2: "Wednesday",
    3: "Thursday",
    4: "Friday",
    5: "Saturday",
    6: "Sunday",
  };

  console.log(recipeIDs);

  if (recipeIDs) {
    return (
      <CardWrapper>
        <Day
          onClick={() => {
            setDisplaying(!displaying);
          }}
        >
          {dayByIndex[index]}
        </Day>

        <RecipeList displaying={displaying}>
          {recipeIDs.map((id) => {
            console.log(`This map is working!`);
            return (
              <RecipeByDay mealPlanRecipes={mealPlanRecipes} recipeIDs={id} />
            );
          })}
          No recipe found in this day
        </RecipeList>
      </CardWrapper>
    );
  }
};

const CardWrapper = styled.div`
  margin-left: 24px;
  margin-bottom: 1rem;
  margin-top: 1rem;
`;

const Day = styled.div`
  height: 150px;
  width: 85vw;
  border: solid;
  background-image: url(${calendarPhoto});
`;

const RecipeList = styled.div`
  display: ${(p) => (p.displaying ? "block" : "none")};
`;

export default MealPlanDay;
