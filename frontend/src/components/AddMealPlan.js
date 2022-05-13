import React, { useState, useContext } from "react";
import styled from "styled-components";
import { MealContext } from "../MealContext";

const AddMealPlan = () => {
  const {
    state: { mealPlan },
    actions: { updateMealPlan },
  } = useContext(MealContext);

  const [selectedDay, setSelectedDay] = useState();

  const handleSelectedDay = (e) => {
    setSelectedDay(e.target.value);
  };

  const handleAddMealPlan = () => {
    updateMealPlan({ day: selectedDay, meal: "pizza" });
  };

  console.log("day", mealPlan);

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
        <button onClick={handleAddMealPlan}>Add to Meal Plan!</button>
      </div>
    </>
  );
};

export default AddMealPlan;
