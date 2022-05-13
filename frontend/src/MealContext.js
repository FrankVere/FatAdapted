import React, { createContext, useReducer } from "react";

export const MealContext = createContext();
//we set the state to hold 7 keys so we can add meals to the days we want in our mealplan//
const mealPlan = [
  [], //Monday [0]
  [], //Tuesday [1]
  [], //Wednesday [2]
  [], //Thursday [3]
  [], //Friday [4]
  [], //Saturday [5]
  [], //Sunday [6]
];

const initialState = {
  allMeals: [],
  isLoaded: false,
  userName: "",
  mealPlan,
  singleRecipeInfo: {},
};
//Use this array to map over all meals inside the components using meals

function reducer(state, action) {
  switch (action.type) {
    case "getAllMeals": {
      return {
        ...state,
        allMeals: action.data,
      };
    }
    case "getSingleRecipeInfo": {
      return {
        ...state,
        singleRecipeInfo: action.data,
      };
    }
    case "updateMealPlan": {
      state.mealPlan[action.data.day].push(action.data.meal);
      return {
        ...state,
      };
    }
  }
}

export const MealContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getAllMeals = (data) => {
    dispatch({ type: "getAllMeals", data });
  };
  const getSingleRecipeInfo = (data) => {
    dispatch({ type: "getSingleRecipeInfo", data });
  };
  const updateMealPlan = (data) => {
    dispatch({ type: "updateMealPlan", data });
  };

  return (
    <MealContext.Provider
      value={{
        state,
        actions: {
          getAllMeals,
          getSingleRecipeInfo,
          updateMealPlan,
        },
      }}
    >
      {children}
    </MealContext.Provider>
  );
};
