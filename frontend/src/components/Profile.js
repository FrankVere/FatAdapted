import React, { useContext, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Options from "./Options";
import styled from "styled-components";
import { MealContext } from "../MealContext";

const Profile = () => {
  const { isAuthenticated, user } = useAuth0();
  const [savedPreferences, setSavedPreferences] = useState();
  const [loadingPicture, setLoadingPicture] = useState(false);
  const [image, setImage] = useState();
  const [userPicture, setUserPicture] = useState({
    userInfo: user.email,
    profilePicture: "",
  });

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

  const uploadProfilePic = async (e) => {
    const imgFile = e.target.files;
    const data = new FormData();
    data.append("file", imgFile[0]);
    data.append("upload_preset", "HealthAdapted");
    setLoadingPicture(true);
    const uploadPic = await fetch(
      "https://api.cloudinary.com/v1_1/dfekpka0x/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const picture = await uploadPic.json();
    setUserPicture({ ...userPicture, profilePicture: picture.secure_url });
    setLoadingPicture(false);
  };

  const updateUser = async () => {
    const postPicture = await fetch("/update-user/", {
      method: "POST",
      body: JSON.stringify(userPicture),
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
    });
    await postPicture.json();
    const something = await fetch(`/get-user-photo/${user.email}`);
    const photo = await something.json();
    setImage(photo.data);
  };

  const getSavedPreferences = async () => {
    const res = await fetch(`/get-user-preferences/${user.email}`, {
      method: "GET",
    });
    const data = await res.json();
    setSavedPreferences(data.data);
    getUserMealPreferences(data.data);
  };

  const getUserPhoto = async () => {
    const res = await fetch(`/get-user-photo/${user.email}`);
    const picture = await res.json();
    setImage(picture.data);
  };

  useEffect(() => {
    getSavedPreferences();
    getUserPhoto();
  }, [user]);

  const handleStateNumbers = (optionName, e) => {
    let newQuery = { ...query };
    newQuery[optionName] = e.target.value;
    setQuery(newQuery);
  };
  const [query, setQuery] = useState(initialQuery);

  //these are the preselected options needed to set preference using complex search with our api //
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

  return (
    isAuthenticated && (
      <>
        <AccountInfo>
          {image ? (
            <ProfilePhoto src={image} />
          ) : (
            <ProfilePhoto src={user.picture} />
          )}

          <input
            required
            type="file"
            name="file"
            placeholder="Upload a profile picture"
            onChange={uploadProfilePic}
          />
          <button className="buttonstyle-hover click" onClick={updateUser}>
            Save
          </button>
          <h3 className="bold">{user.name}</h3>
        </AccountInfo>
        <PreferenceWrapper>
          <form>
            <InputWrapper>
              <label>
                <b className="bold">Cuisine:</b>
              </label>
              <Options
                list={cuisineOptions}
                setQuery={setQuery}
                query={query}
                defaultQuery="Select cuisine!"
                optionName="cuisine"
              />
            </InputWrapper>
            <InputWrapper>
              <label>
                <b className="bold">Intolerances:</b>
              </label>
              <Options
                list={intolerances}
                setQuery={setQuery}
                query={query}
                defaultQuery="Select intolerances!"
                optionName="intolerances"
              />
            </InputWrapper>
            <InputWrapper>
              <label>
                <b className="bold">Diet:</b>
              </label>
              <Options
                list={diet}
                setQuery={setQuery}
                query={query}
                defaultQuery="Select diet!"
                optionName="diet"
              />
            </InputWrapper>
            <InputWrapper>
              <label>
                <b className="bold">Type of Meal:</b>
              </label>
              <Options
                list={type}
                setQuery={setQuery}
                query={query}
                defaultQuery="Select Type of Meal!"
                optionName="type"
              />
            </InputWrapper>
            <InputWrapper>
              <label>
                <b className="bold">Max Carbs:</b>
              </label>
              <input
                className="input"
                type="number"
                onChange={(e) => {
                  handleStateNumbers("maxCarbs", e);
                }}
              />
            </InputWrapper>
            <InputWrapper>
              <label>
                <b className="bold">Max Protein:</b>
              </label>
              <input
                className="input"
                type="number"
                onChange={(e) => {
                  handleStateNumbers("maxProtein", e);
                }}
              />
            </InputWrapper>
            <InputWrapper>
              <label>
                <b className="bold">Max Calories: </b>
              </label>
              <input
                className="input"
                type="number"
                onChange={(e) => {
                  handleStateNumbers("maxCalories", e);
                }}
              />
            </InputWrapper>
            <InputWrapper>
              <label>
                <b className="bold">Max Fat:</b>
              </label>
              <input
                className="input"
                type="number"
                onChange={(e) => {
                  handleStateNumbers("maxFat", e);
                }}
              />
            </InputWrapper>
            <InputWrapper>
              <label>
                <b className="bold">Max Caffeine:</b>
              </label>
              <input
                className="input"
                type="number"
                onChange={(e) => {
                  handleStateNumbers("maxCaffeine", e);
                }}
              />
            </InputWrapper>
            <InputWrapper>
              <label>
                <b className="bold">Max Ready Time:</b>
              </label>
              <input
                style={{ backgroundColor: "#f5ce62", border: "none" }}
                className="input"
                type="number"
                onChange={(e) => {
                  handleStateNumbers("maxReadyTime", e);
                }}
              />
            </InputWrapper>
          </form>
        </PreferenceWrapper>
        <ButtonWrapper>
          <button className="buttonstyle-hover click" onClick={onSelectHandler}>
            Save preferences
          </button>
        </ButtonWrapper>
        <h3 className="bold" style={{ textAlign: "center" }}>
          Saved Preferences
        </h3>
        {savedPreferences && loadingRecipes === false ? (
          <>
            <WrapperPreferences>
              {" "}
              <p>
                <b className="bold">Cuisine: </b>
                {savedPreferences.cuisine
                  .replace(",", "")
                  .replaceAll(",", ", ")}
              </p>
              <p>
                <b className="bold">Intolerances: </b>
                {savedPreferences.intolerances
                  .replace(",", "")
                  .replaceAll(",", ", ")}
              </p>
              <p>
                <b className="bold">Type: </b>
                {savedPreferences.type.replace(",", "").replaceAll(",", ", ")}
              </p>
              <p>
                <b className="bold">Diet: </b>
                {savedPreferences.diet
                  .replace(",", "")
                  .replaceAll(",", ", ")}{" "}
              </p>
              <p>
                <b className="bold">Maximum Carbs:</b>{" "}
                {savedPreferences.maxCarbs}
              </p>
              <p>
                <b className="bold">Max Protein:</b>{" "}
                {savedPreferences.maxProtein}
              </p>
              <p>
                <b className="bold">Max Calories:</b>{" "}
                {savedPreferences.maxCalories}
              </p>
              <p>
                <b className="bold">Max Fat:</b> {savedPreferences.maxFat}
              </p>
              <p>
                <b className="bold">Max Cafferine:</b>{" "}
                {savedPreferences.maxCaffeine}
              </p>
              <p>
                <b className="bold">Max Ready Time: </b>
                {savedPreferences.maxReadyTime}
              </p>
            </WrapperPreferences>
          </>
        ) : (
          loadingRecipes && (
            <LoadingSpinnerWrap>
              {" "}
              <div className="lds-hourglass" />{" "}
            </LoadingSpinnerWrap>
          )
        )}
        <ButtonWrapper>
          <button className="buttonstyle-hover click" onClick={resetHandler}>
            Reset
          </button>
        </ButtonWrapper>
      </>
    )
  );
};

const InputWrapper = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  padding: 5px;
`;

const AccountInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const WrapperPreferences = styled.div`
  border: 2px solid #f5ce62;
  padding-left: 5px;
  text-align: left;
  margin-left: 5px;
  border-radius: 20px;
  box-shadow: 0 0 10px 5px #e85a19;
  background-color: #fff;
`;

const ProfilePhoto = styled.img`
  margin-top: 10px;
  width: 50px;
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

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const LoadingSpinnerWrap = styled.div`
  position: absolute;
  top: 80%;
  left: 39%;
`;

export default Profile;
