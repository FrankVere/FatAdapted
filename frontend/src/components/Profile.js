import React, { useCallback, useContext, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Options from "./Options";
import { MealContext } from "../MealContext";

const Profile = () => {
  const { isAuthenticated, user, isLoading } = useAuth0();

  const userInfo = user.email;
  const {
    actions: { getAllMeals },
  } = useContext(MealContext);

  const initialQuery = {
    cuisine: "Italian",
  };

  const [query, setQuery] = useState(initialQuery);

  if (isAuthenticated) {
    console.log(user);
  }

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  const cuisineOptions = [
    "African",
    "American",
    "British",
    "Cajun",
    "Carribean",
    "Chinese",
    "Eastern European",
    "European",
    "French",
    "German",
    "Greek",
    "Italian",
    "Indian",
    "Irish",
    "Japanese",
    "Jewish",
    "Korean",
    "Latin American",
    "Mediterranean",
    "Mexican",
    "Middle Eastern",
    "Nordic",
    "Southern",
    "Spanish",
    "Thai",
    "Vietnamese",
  ];

  const intolerances = [
    "Dairy",
    "Egg",
    "Gluten",
    "Grain",
    "Peanut",
    "Seafood",
    "Sesame",
    "Shellfish",
    "Soy",
    "Sulfite",
    "Tree Nut",
    "Wheat",
  ];

  const diet = [
    "Gluten Free",
    "Ketogenic",
    "Vegetarian",
    "Lacto-Vegetarian",
    "Ovo-Vegatarian",
    "Vegan",
    "Pescetarian",
    "Paleo",
    "Primal",
    "Low FODMAP",
    "Whole30",
  ];

  const type = [
    "main course",
    "side dish",
    "dessert",
    "appetizer",
    "salad",
    "bread",
    "breakfast",
    "soup",
    "beverage",
    "sauce",
    "marinade",
    "fingerfood",
    "snack",
    "drink",
  ];

  const onSelectHandler = async () => {
    await fetch(`/get-preference-recipes/?cuisine=${query.cuisine}`)
      .then((res) => res.json())
      .then((data) => {
        getAllMeals(data.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
    await fetch("/post-user-preference/", {
      method: "POST",
      body: JSON.stringify({ query, userInfo }),
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
    });
  };

  console.log("hi", query);

  return (
    isAuthenticated && (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <form>
          <label>Cuisine</label>
          <Options
            list={cuisineOptions}
            setQuery={setQuery}
            query={query}
            defaultQuery="Select cuisine!"
          />
        </form>
        <button onClick={onSelectHandler}>Save preferences</button>
      </div>
    )
  );
};

export default Profile;
