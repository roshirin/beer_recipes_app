import { useEffect, useCallback, useRef } from 'react';
// import { debounce } from 'lodash';
import { RecipeItem } from '../components/RecipeItem';
import { DeleteButton } from '../components/DeleteButton';
import { useRecipesStore } from '../stores/useRecipesStore';
import { recipesStep } from '../constants/constants';
import { ObserverCallback } from '../types/ObserverCallback';
import './styles/RecipeListPage.scss';

export const RecipesListPage = () => {
  const deletedRecipesIds = useRecipesStore((state) => state.deletedRecipesIds);
  const firstRecipeIndex = useRecipesStore((state) => state.firstRecipeIndex);
  const preparedRecipes = useRecipesStore((state) => state.preparedRecipes);
  const isLastPage = useRecipesStore((state) => state.isLastPage);
  const getPreparedRecipes = useRecipesStore(
    (state) => state.getPreparedRecipes,
  );
  const setFirstRecipeIndex = useRecipesStore(
    (state) => state.setFirstRecipeIndex,
  );
  const setIsLastPage = useRecipesStore((state) => state.setIsLastPage);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const firstRecipeRef = useRef<HTMLDivElement | null>(null);
  const lastRecipeRef = useRef<HTMLDivElement | null>(null);

  const handleIntersection: ObserverCallback = useCallback(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target === firstRecipeRef.current && firstRecipeIndex > 0) {
            const newFirstRecipeIndex = firstRecipeIndex - recipesStep > 0
              ? firstRecipeIndex - recipesStep
              : 0;

            setFirstRecipeIndex(newFirstRecipeIndex);

            if (isLastPage) {
              setIsLastPage(false);
            }
          } else if (entry.target === lastRecipeRef.current) {
            setFirstRecipeIndex(firstRecipeIndex + recipesStep);
          }

          if (observerRef.current) {
            observerRef.current.disconnect();
          }
        }
      });
    },
    [preparedRecipes],
  );

  // const debounsedIntHandler = debounce(handleIntersection, 50);

  useEffect(() => {
    getPreparedRecipes();
  }, [deletedRecipesIds, firstRecipeIndex]);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const observer = new IntersectionObserver(handleIntersection, options);

    observerRef.current = observer;

    const firstTarget = firstRecipeRef.current;
    const lastTarget = lastRecipeRef.current;

    if (firstTarget && firstRecipeIndex > 0) {
      observer.observe(firstTarget);
    }

    if (lastTarget && !isLastPage) {
      observer.observe(lastTarget);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [preparedRecipes]);

  return (
    <div className="container">
      <div className="recipe-list">
        {preparedRecipes.map((recipe, index) => {
          if (index === 1) {
            return (
              <RecipeItem
                recipe={recipe}
                key={recipe.id}
                refer={firstRecipeRef}
              />
            );
          }

          if (index === preparedRecipes.length - 2) {
            return (
              <RecipeItem
                recipe={recipe}
                key={recipe.id}
                refer={lastRecipeRef}
              />
            );
          }

          return <RecipeItem recipe={recipe} key={recipe.id} />;
        })}
      </div>

      <DeleteButton />
    </div>
  );
};
