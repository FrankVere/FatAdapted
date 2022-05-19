import React, { useContext, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Options from "./Options";
import styled from "styled-components";
import { MealContext } from "../MealContext";

const Profile = () => {
  const { isAuthenticated, user, isLoading } = useAuth0();
  const [savedPreferences, setSavedPreferences] = useState();
  const userInfo = user.email;
  const {
    actions: { getAllMeals, getUserMealPreferences, checkLoading },
  } = useContext(MealContext);

  const initialQuery = {
    cuisine: "",
    intolerances: "",
    diet: "",
    type: "",
    maxCarbs: 100,
    maxProtein: 100,
    maxFat: 100,
    maxCaffeine: 100,
    maxCalories: 1500,
    maxReadyTime: 120,
  };

  const getSavedPreferences = async () => {
    const res = await fetch(`/get-user-preferences/${user.email}`, {
      method: "GET",
    });
    const data = await res.json();
    setSavedPreferences(data.data);
    getUserMealPreferences(data.data);
  };

  useEffect(() => {
    getSavedPreferences();
  }, [user]);

  const handleStateNumbers = (optionName, e) => {
    let newQuery = { ...query };
    newQuery[optionName] = e.target.value;
    setQuery(newQuery);
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
    "Main course",
    "Side dish",
    "Dessert",
    "Appetizer",
    "Salad",
    "Bread",
    "Breakfast",
    "Soup",
    "Beverage",
    "Sauce",
    "Marinade",
    "Fingerfood",
    "Snack",
    "Drink",
  ];
  //here we make the complex search of preferences to the api and this replaces what's rendered on the homepage to fit the users preferences//
  const onSelectHandler = async () => {
    await fetch(
      `/get-preference-recipes/?cuisine=${query.cuisine}&intolerances=${
        query.intolerances
      }&diet=${query.diet}&type=${query.type.toLowerCase()}&maxCarbs=${Number(
        query.maxCarbs
      )}&maxProtein=${Number(query.maxProtein)}&maxFat=${Number(
        query.maxFat
      )}&maxCaffeine=${Number(query.maxCaffeine)}&maxCalories=${Number(
        query.maxCalories
      )}&maxReadyTime=${Number(query.maxReadyTime)}`
    )
      .then((res) => res.json())
      .then((data) => {
        getAllMeals(data.data.results);
        // checkLoading(false);
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
    getSavedPreferences();
  };

  const resetHandler = async () => {
    await fetch("/post-user-preference/", {
      method: "POST",
      body: JSON.stringify({ initialQuery, userInfo }),
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
    });
    getSavedPreferences();
  };
  console.log("hi", query);

  return (
    isAuthenticated && (
      <Wrapper>
        <ProfilePhoto src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <form>
          <label>Cuisine</label>
          <Options
            list={cuisineOptions}
            setQuery={setQuery}
            query={query}
            defaultQuery="Select cuisine!"
            optionName="cuisine"
          />
          <label>Intolerances</label>
          <Options
            list={intolerances}
            setQuery={setQuery}
            query={query}
            defaultQuery="Select intolerances!"
            optionName="intolerances"
          />
          <label>Diet</label>
          <Options
            list={diet}
            setQuery={setQuery}
            query={query}
            defaultQuery="Select diet!"
            optionName="diet"
          />
          <label>Type of Meal</label>
          <Options
            list={type}
            setQuery={setQuery}
            query={query}
            defaultQuery="Select Type of Meal!"
            optionName="type"
          />
          <label>Max Carbs</label>
          <input
            type="number"
            onChange={(e) => {
              handleStateNumbers("maxCarbs", e);
            }}
          />
          <label>Max Protein</label>
          <input
            type="number"
            onChange={(e) => {
              handleStateNumbers("maxProtein", e);
            }}
          />
          <label>Max Calories</label>
          <input
            type="number"
            onChange={(e) => {
              handleStateNumbers("maxCalories", e);
            }}
          />
          <label>Max Fat</label>
          <input
            type="number"
            onChange={(e) => {
              handleStateNumbers("maxFat", e);
            }}
          />
          <label>Max Caffeine</label>
          <input
            type="number"
            onChange={(e) => {
              handleStateNumbers("maxCaffeine", e);
            }}
          />
          <label>Max Ready Time</label>
          <input
            type="number"
            onChange={(e) => {
              handleStateNumbers("maxReadyTime", e);
            }}
          />
        </form>
        <button onClick={onSelectHandler}>Save preferences</button>
        <h3>Saved Preferences</h3>
        <WrapperPreferences>
          {savedPreferences && (
            <>
              {" "}
              <div>Cuisine: {savedPreferences.cuisine}</div>
              <div>Intolerances: {savedPreferences.intolerances}</div>
              <div>Type: {savedPreferences.type}</div>
              <div>Diet: {savedPreferences.diet} </div>
              <div>Maximum Carbs:{savedPreferences.maxCarbs}</div>
              <div>Max Protein: {savedPreferences.maxProtein}</div>
              <div>Max Calories: {savedPreferences.maxCalories}</div>
              <div>Max Fat: {savedPreferences.maxFat}</div>
              <div>Max Cafferine: {savedPreferences.maxCaffeine}</div>
              <div>Max Ready Time: {savedPreferences.maxReadyTime}</div>
            </>
          )}
        </WrapperPreferences>
        <button onClick={resetHandler}>Reset</button>
      </Wrapper>
    )
  );
};

const Wrapper = styled.div`
  display: block;
  overflow: auto;
  height: 91vh;
  margin-left: 10px;
`;

const WrapperPreferences = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProfilePhoto = styled.img`
  width: 50px;
`;
export default Profile;
