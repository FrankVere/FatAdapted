import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { MealContext } from "../MealContext";

const LikedRecipes = () => {
  const { user } = useAuth0();
  const {
    actions: { getSingleRecipeInfo },
  } = useContext(MealContext);

  //this useEffect allows me to reset the singleRecipeInfo state to empty so I can trigger a loading spinner when going to recipeInfoDetail//

  useEffect(() => {
    getSingleRecipeInfo({});
  }, []);

  const userInfo = user.email;

  let navigate = useNavigate();

  const handleNav = (id) => {
    navigate(`/${id}`);
  };

  const [likedRecipeIds, setLikedRecipeIds] = useState();

  const [allLikedRecipes, setAllLikedRecipes] = useState();

  const fetchRecipes = async () => {
    const getRecipeID = await fetch(`/get-liked-recipes/${userInfo}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
    });
    const recipeIDs = await getRecipeID.json();

    setLikedRecipeIds(recipeIDs.data.toString());

    if (likedRecipeIds) {
      const getRecipes = await fetch(
        `https://api.spoonacular.com/recipes/informationBulk?includeNutrition=true&ids=${likedRecipeIds},=true&apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const likedRecipes = await getRecipes.json();
      setAllLikedRecipes(likedRecipes);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, [likedRecipeIds]);

  return (
    <>
      <h2 style={{ textAlign: "center" }}>My Liked Recipes!</h2>
      <Wrapper>
        {allLikedRecipes ? (
          allLikedRecipes.map((likedRecipe) => {
            return (
              <WrapperLiked>
                <StyledImg
                  key={likedRecipe.id}
                  onClick={() => handleNav(likedRecipe.id)}
                  src={likedRecipe.image}
                />
                <RecipeName key={likedRecipe.title} className="homepageText">
                  {likedRecipe.title}
                </RecipeName>
              </WrapperLiked>
            );
          })
        ) : (
          <WrapperSpinner>
            <div className="lds-hourglass" />
          </WrapperSpinner>
        )}
      </Wrapper>
    </>
  );
};

const WrapperLiked = styled.div`
  padding: 22px;
  position: relative;
  width: 150px;
  text-align: center;
`;
const StyledImg = styled.img`
  width: 150px;
  border-radius: 10%;
`;

const WrapperSpinner = styled.div`
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translateY(-50%);
  transform: translateX(-50%);
`;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const RecipeName = styled.span``;

export default LikedRecipes;
