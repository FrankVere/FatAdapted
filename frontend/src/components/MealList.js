import React, { useContext } from "react";
import { MealContext } from "../MealContext";
import { NavLink } from "react-router-dom";

const MealList = () => {
  const {
    state: { allMeals },
  } = useContext(MealContext);

  return (
    <div>
      {allMeals.map((meal) => {
        return <NavLink to={`/${meal.id}`}>{meal.title}</NavLink>;
      })}
    </div>
  );
};

export default MealList;
