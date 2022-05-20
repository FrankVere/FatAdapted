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
    <>
      {allMeals.map((meal) => {
        return (
          <Wrapper>
            <StyledImg onClick={() => handleNav(meal.id)} src={meal.image} />
            <span>{meal.title}</span>
          </Wrapper>
        );
      })}
    </>
  );
};

const StyledImg = styled.img`
  width: 150px;
`;

const Wrapper = styled.div`
  // display: flex;
  // flex-direction: column;
  // align-items: center;
  // justify-content: center;
  // padding: 1rem;
  // position: relative;
`;

export default MealList;
