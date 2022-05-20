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
            <div style={{ width: "150px", textAlign: "center" }}>
              <StyledImg onClick={() => handleNav(meal.id)} src={meal.image} />
              <span className="homepageText">{meal.title}</span>
            </div>
          </Wrapper>
        );
      })}
    </>
  );
};

const StyledImg = styled.img`
  width: 150px;
  border-radius: 10%;
`;

const Wrapper = styled.div`
  padding: 22px;
  position: relative;
`;

export default MealList;
