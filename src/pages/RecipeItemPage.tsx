import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { RecipeInfo } from '../components/RecipeInfo';
import { GoBackButton } from '../components/GoBackButton';
import { Loader } from '../components/Loader';
import { useRecipesStore } from '../stores/useRecipesStore';
import { Recipe } from '../types/Recipe';
import { getRecipeById } from '../api/recipes';

export const RecipeItemPage = () => {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const loadedRecipes = useRecipesStore(state => state.loadedRecipes);
  const { recipeId } = useParams();

  const getSingleRecipe = useCallback(async () => {
    setIsLoading(true);

    if (recipeId) {
      let recipeLoaded = loadedRecipes.find(
        ({ id }) => String(id) === recipeId,
      ) || null;

      if (!recipeLoaded) {
        recipeLoaded = await getRecipeById(Number(recipeId));

        if (!recipeLoaded) {
          setErrorMessage('Sorry, we do not have this recipe');
        }
      }

      setRecipe(recipeLoaded);
    }

    setIsLoading(false);
  }, [recipeId]);

  useEffect(() => {
    getSingleRecipe();
  }, [recipeId]);

  return (
    <div className="container">
      <GoBackButton />

      {!isLoading ? (
        recipe ? (
          <RecipeInfo recipe={recipe} />
        ) : (
          <h2>{errorMessage}</h2>
        )
      ) : (
        <Loader />
      )}
    </div>
  );
};
