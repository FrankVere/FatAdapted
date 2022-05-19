import React, { createContext, useReducer, useState } from "react";

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
  isLoaded: true,
  userName: "",
  mealPlan,
  singleRecipeInfo: {},
  mealPlanRecipeIDs: [],
  userMealPreferences: {},
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
      if (!state.mealPlan[action.data.day].includes(action.data.meal)) {
        state.mealPlan[action.data.day].push(action.data.meal);
      }
      return {
        ...state,
      };
    }
    case "getMealPlanIDs": {
      return {
        ...state,
        mealPlanRecipeIDs: action.data,
      };
    }
    case "getUserMealPreferences": {
      return {
        ...state,
        userMealPreferences: action.data,
      };
    }
    case "Loading": {
      return {
        ...state,
        isLoaded: action.data,
      };
    }
  }
}

export const MealContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [loadingRecipes, setLoadingRecipes] = useState(false);

  const getAllMeals = (data) => {
    dispatch({ type: "getAllMeals", data });
  };
  const getSingleRecipeInfo = (data) => {
    dispatch({ type: "getSingleRecipeInfo", data });
  };
  const updateMealPlan = (data) => {
    dispatch({ type: "updateMealPlan", data });
  };
  const getMealPlanRecipeIDs = (data) => {
    dispatch({ type: "getMealPlanIDs", data });
  };
  const getUserMealPreferences = (data) => {
    dispatch({ type: "getUserMealPreferences", data });
  };
  const checkLoading = (data) => {
    dispatch({ type: "Loading", data });
  };

  return (
    <MealContext.Provider
      value={{
        state,
        actions: {
          getAllMeals,
          getSingleRecipeInfo,
          updateMealPlan,
          getMealPlanRecipeIDs,
          getUserMealPreferences,
          checkLoading,
        },
        loadingRecipes,
        setLoadingRecipes,
      }}
    >
      {children}
    </MealContext.Provider>
  );
};
