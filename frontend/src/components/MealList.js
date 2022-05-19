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
  console.log(allMeals);
  return (
    <div>
      {allMeals.map((meal) => {
        return (
          <Wrapper>
            <StyledImg onClick={() => handleNav(meal.id)} src={meal.image} />
            <p>{meal.title}</p>
          </Wrapper>
        );
      })}
    </div>
  );
};

const StyledImg = styled.img`
  width: 100px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`;
export default MealList;
