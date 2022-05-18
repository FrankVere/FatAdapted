import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

const LikedRecipes = () => {
  const { user } = useAuth0();

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
    console.log(likedRecipeIds);

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

  console.log(allLikedRecipes);

  return (
    <Wrapper>
      <div>
        <h1>My Liked Recipes!</h1>
        {allLikedRecipes ? (
          allLikedRecipes.map((likedRecipe) => {
            return (
              <StyledImg
                onClick={() => handleNav(likedRecipe.id)}
                src={likedRecipe.image}
              />
            );
          })
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 80vh;
`;
const StyledImg = styled.img`
  width: 150px;
  height: 150px;
`;

export default LikedRecipes;
