import React, { useContext } from "react";
import { MealContext } from "../MealContext";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const MealList = () => {
  const {
    state: { allMeals },
  } = useContext(MealContext);

  let navigate = useNavigate();

  const handleNav = (id) => {
    navigate(`/${id}`);
  };

  return (
    <div>
      {allMeals.map((meal) => {
        return (
          <StyledImg onClick={() => handleNav(meal.id)} src={meal.image} />
        );
      })}
    </div>
  );
};

const StyledImg = styled.img``;

export default MealList;
