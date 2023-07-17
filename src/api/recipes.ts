import { Recipe } from '../types/Recipe';
import { ResponseError } from '../types/ResponseError';

const BASE_URL = 'https://api.punkapi.com/v2/beers';

async function request<T>(searchParams: string): Promise<T> {
  try {
    const response = await fetch(BASE_URL + searchParams, { method: 'GET' });

    const responseData = await response.json();

    return responseData;
  } catch (error) {
    throw new Error('An error occurred:' + String(error));
  }
}

export const getRecipes = async (pageNumber: number) => {
  const recipes = await request<Recipe[]>(
    `?page=${pageNumber}`,
  );

  return recipes;
};

export const getRecipeById = async (id: number) => {
  const data = await request<Recipe[] | ResponseError>(
    `/${id}`,
  );

  if ('error' in data) {
    return null;
  }

  return data[0];
};
