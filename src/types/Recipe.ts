interface RecipeVolume {
  value: number,
  unit: string,
};

export interface Recipe {
  id: number,
  name: string,
  tagline: string,
  first_brewed: string,
  description: string,
  image_url: string,
  abv: number,
  ibu: number,
  target_fg: number,
  target_og: number,
  ebc: number,
  srm: number,
  ph: number,
  attenuation_level: number,
  volume: RecipeVolume,
  boil_volume: RecipeVolume,
  method: any,
  ingredients: any,
  food_pairing: string[],
  brewers_tips: string,
}
