import React, { createContext, useReducer } from "react";

export const MealContext = createContext();
const initialState = {
  allMeals: [],
  isLoaded: false,
  userName: "",
  likedRecipes: [],
  mealPlan: [],
};
//Use this array to map over all meals inside the components using meals

function reducer(state, action) {
  switch (action.type) {
    case "getAllMeals":
      return {
        ...state,
        allMeals: action.getAllMeals,
      };
  }
}

export const MealContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getAllMeals = (data) => {
    dispatch({ type: "getAllMeals", allMeals: data });
  };
  return (
    <MealContext.Provider value={{ state, actions: { getAllMeals } }}>
      {children}
    </MealContext.Provider>
  );
};
