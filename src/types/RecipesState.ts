import { Recipe } from './Recipe';

export interface RecipesState {
  loadedRecipes: Recipe[];
  preparedRecipes: Recipe[];
  selectedRecipesIds: number[];
  deletedRecipesIds: number[];
  firstRecipeIndex: number;
  isLastPage: boolean;
  areAllLoaded: boolean;
  nextPage: number;
  filterDeleted: (recipes: Recipe[]) => Recipe[];
  getPreparedRecipes: () => void;
  selectRecipe: (id: number) => void;
  unselectRecipe: (id: number) => void;
  deleteRecipes: (recipesIds: number[]) => void;
  cleanDeletedIds: () => void;
  setFirstRecipeIndex: (number: number) => void;
  setIsLastPage: (value: boolean) => void;
}
