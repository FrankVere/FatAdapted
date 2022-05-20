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
    actions: { getAllMeals, getUserMealPreferences },
    loadingRecipes,
    setLoadingRecipes,
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
    setLoadingRecipes(true);
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
        setLoadingRecipes(false);
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

    await getSavedPreferences();
    setLoadingRecipes(false);
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
    setQuery(initialQuery);
    getSavedPreferences();
  };
  console.log("hi", query);

  return (
    isAuthenticated && (
      <>
        <AccountInfo>
          <ProfilePhoto src={user.picture} alt={user.name} />
          <h3>{user.name}</h3>
        </AccountInfo>
        <PreferenceWrapper>
          <form>
            <InputWrapper>
              <label>Cuisine</label>
              <Options
                list={cuisineOptions}
                setQuery={setQuery}
                query={query}
                defaultQuery="Select cuisine!"
                optionName="cuisine"
              />
            </InputWrapper>
            <InputWrapper>
              <label>Intolerances</label>
              <Options
                list={intolerances}
                setQuery={setQuery}
                query={query}
                defaultQuery="Select intolerances!"
                optionName="intolerances"
              />
            </InputWrapper>
            <InputWrapper>
              <label>Diet</label>
              <Options
                list={diet}
                setQuery={setQuery}
                query={query}
                defaultQuery="Select diet!"
                optionName="diet"
              />
            </InputWrapper>
            <InputWrapper>
              <label>Type of Meal</label>
              <Options
                list={type}
                setQuery={setQuery}
                query={query}
                defaultQuery="Select Type of Meal!"
                optionName="type"
              />
            </InputWrapper>
            <InputWrapper>
              <label>Max Carbs</label>
              <input
                className="input"
                type="number"
                onChange={(e) => {
                  handleStateNumbers("maxCarbs", e);
                }}
              />
            </InputWrapper>
            <InputWrapper>
              <label>Max Protein</label>
              <input
                className="input"
                type="number"
                onChange={(e) => {
                  handleStateNumbers("maxProtein", e);
                }}
              />
            </InputWrapper>
            <InputWrapper>
              <label>Max Calories</label>
              <input
                className="input"
                type="number"
                onChange={(e) => {
                  handleStateNumbers("maxCalories", e);
                }}
              />
            </InputWrapper>
            <InputWrapper>
              <label>Max Fat</label>
              <input
                className="input"
                type="number"
                onChange={(e) => {
                  handleStateNumbers("maxFat", e);
                }}
              />
            </InputWrapper>
            <InputWrapper>
              <label>Max Caffeine</label>
              <input
                className="input"
                type="number"
                onChange={(e) => {
                  handleStateNumbers("maxCaffeine", e);
                }}
              />
            </InputWrapper>
            <InputWrapper>
              <label>Max Ready Time</label>
              <input
                className="input"
                type="number"
                onChange={(e) => {
                  handleStateNumbers("maxReadyTime", e);
                }}
              />
            </InputWrapper>
          </form>
        </PreferenceWrapper>
        <SaveButtonStyled
          className="bn632-hover bn19"
          onClick={onSelectHandler}
        >
          Save preferences
        </SaveButtonStyled>
        <h3>Saved Preferences</h3>
        {savedPreferences && loadingRecipes === false ? (
          <>
            <WrapperPreferences>
              {" "}
              <div>
                Cuisine:{" "}
                {savedPreferences.cuisine
                  .replace(",", "")
                  .replaceAll(",", ", ")}
              </div>
              <div>
                Intolerances:{" "}
                {savedPreferences.intolerances
                  .replace(",", "")
                  .replaceAll(",", ", ")}
              </div>
              <div>
                Type:{" "}
                {savedPreferences.type.replace(",", "").replaceAll(",", ", ")}
              </div>
              <div>
                Diet:{" "}
                {savedPreferences.diet.replace(",", "").replaceAll(",", ", ")}{" "}
              </div>
              <div>Maximum Carbs: {savedPreferences.maxCarbs}</div>
              <div>Max Protein: {savedPreferences.maxProtein}</div>
              <div>Max Calories: {savedPreferences.maxCalories}</div>
              <div>Max Fat: {savedPreferences.maxFat}</div>
              <div>Max Cafferine: {savedPreferences.maxCaffeine}</div>
              <div>Max Ready Time: {savedPreferences.maxReadyTime}</div>
            </WrapperPreferences>
          </>
        ) : (
          loadingRecipes && <div className="lds-hourglass" />
        )}
        <button className="bn632-hover bn19" onClick={resetHandler}>
          Reset
        </button>
      </>
    )
  );
};

const InputWrapper = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  padding: 5px;
  .input {
    margin-left: 10px;
    width: 40px;
  }
`;

const AccountInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const WrapperPreferences = styled.div`
  border: 2px solid #f5ce62;
  align-text: left;
  margin-left: 5px;
  border-radius: 20px;
  box-shadow: 0 0 10px 5px #e85a19;
  background-color: #fff;
`;

const ProfilePhoto = styled.img`
  width: 50px;
`;

const SaveButtonStyled = styled.button`
  margin-top: 20px;
  margin-left: 150px;
`;

const PreferenceWrapper = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  padding: 4px;
  border: 2px solid #e85a19;
  margin: 5px;
  border-radius: 20px;
  box-shadow: 0 0 10px 5px #f5ce62;
  background-color: #fff;
`;

export default Profile;
