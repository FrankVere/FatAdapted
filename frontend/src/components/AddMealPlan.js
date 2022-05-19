import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import { MealContext } from "../MealContext";

const AddMealPlan = () => {
  const {
    state: { mealPlan, singleRecipeInfo },
    actions: { updateMealPlan },
  } = useContext(MealContext);

  const { user, isLoading } = useAuth0();
  const userInfo = user.email;
  const weeklyMealPlan = mealPlan;
  const [selectedDay, setSelectedDay] = useState();
  const [addMealPlanButton, setAddMealPlanButton] = useState(false);
  const handleSelectedDay = (e) => {
    setSelectedDay(e.target.value);
  };

  const handleAddMealPlan = () => {
    updateMealPlan({ day: selectedDay, meal: singleRecipeInfo.id });
    setAddMealPlanButton(!addMealPlanButton);
  };

  console.log("day", mealPlan);

  useEffect(() => {
    fetch("/post-meal-plan/", {
      method: "POST",
      body: JSON.stringify({ userInfo, weeklyMealPlan }),
      headers: {
        "Content-type": "application/json",
      },
    });
  }, [addMealPlanButton]);

  return (
    <>
      <div>
        <select value={selectedDay} onChange={handleSelectedDay}>
          <option>Select a Day!</option>
          <option value={0}>Monday</option>
          <option value={1}>Tuesday</option>
          <option value={2}>Wednesday</option>
          <option value={3}>Thursday</option>
          <option value={4}>Friday</option>
          <option value={5}>Saturday</option>
          <option value={6}>Sunday</option>
        </select>
        <button className="bn632-hover bn19" onClick={handleAddMealPlan}>
          Add to Meal Plan!
        </button>
      </div>
    </>
  );
};

export default AddMealPlan;
