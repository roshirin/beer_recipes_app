import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { getRecipes } from '../api/recipes';
import { RecipesState } from '../types/RecipesState';
import { recipesOnPage } from '../constants/constants';

export const useRecipesStore = create<RecipesState>()(persist((set, get) => ({
  loadedRecipes: [],
  preparedRecipes: [],
  selectedRecipesIds: [],
  deletedRecipesIds: [],
  firstRecipeIndex: 0,
  isLastPage: false,
  nextPage: 1,
  areAllLoaded: false,

  filterDeleted: (recipes) => (
    recipes.filter(
      ({ id }) => !get().deletedRecipesIds.includes(id),
    )
  ),

  getPreparedRecipes: async () => {
    const loadedRec = get().loadedRecipes;
    const deletedRecIds = get().deletedRecipesIds;
    const firstRecIndex = get().firstRecipeIndex;
    const nextPage = get().nextPage;
    const areAllLoaded = get().areAllLoaded;
    const filterDeleted = get().filterDeleted;

    // items aviable for render
    const items = loadedRec.length - deletedRecIds.length - firstRecIndex;

    // case: need to load more recipes
    if (items < recipesOnPage && !areAllLoaded) {
      try {
        const response = await getRecipes(nextPage);

        if (response.length === 0) {
          const activeRecipes = filterDeleted(loadedRec);

          const firstRecipeIndex = activeRecipes.length - 15;

          const preparedRecipes = activeRecipes
            .slice(firstRecipeIndex, activeRecipes.length);

          set({
            areAllLoaded: true,
            isLastPage: true,
            preparedRecipes,
            firstRecipeIndex,
          });

          return;
        }

        const loadedRecipes = loadedRec.concat(response);

        const activeRecipes = filterDeleted(loadedRecipes);

        const preparedRecipes = activeRecipes
          .slice(firstRecIndex, firstRecIndex + recipesOnPage);

        set({
          loadedRecipes,
          nextPage: nextPage + 1,
          preparedRecipes,
        });

        return;
      } catch (err) {
        const error = err as Error;

        // eslint-disable-next-line no-console
        console.log(error);
      }
    }

    // case: no more recipes on server
    if (items < recipesOnPage) {
      const activeRecipes = filterDeleted(loadedRec);

      const firstRecipeIndex = activeRecipes.length - 15;

      const preparedRecipes = activeRecipes
        .slice(firstRecipeIndex, activeRecipes.length);

      set({
        isLastPage: true,
        preparedRecipes,
        firstRecipeIndex,
      });
    }

    const activeRecipes = filterDeleted(loadedRec);

    const preparedRecipes = activeRecipes
      .slice(firstRecIndex, firstRecIndex + recipesOnPage);

    set({
      preparedRecipes,
    });
  },

  selectRecipe: (id) => {
    set(state => ({
      selectedRecipesIds: [...state.selectedRecipesIds, id],
    }));
  },

  unselectRecipe: (id) => {
    set(state => ({
      selectedRecipesIds: state.selectedRecipesIds.filter(
        recipeId => recipeId !== id,
      ),
    }));
  },

  deleteRecipes: (recipesIds) => {
    set({
      deletedRecipesIds: [...get().deletedRecipesIds, ...recipesIds],
      selectedRecipesIds: [],
    });
  },

  cleanDeletedIds: () => {
    set({
      deletedRecipesIds: [],
    });
  },

  setFirstRecipeIndex: (number) => {
    set({ firstRecipeIndex: number });
  },

  setIsLastPage: (value) => {
    set({ isLastPage: value });
  },
}), {
  name: 'recipe-storage',
  storage: createJSONStorage(() => sessionStorage),
  partialize: state =>
    Object.fromEntries(
      Object.entries(state).filter(([key]) => (
        ![
          'firstRecipeIndex',
          'selectedRecipesIds',
          'preparedRecipes',
        ].includes(key))),
    ),
}));
