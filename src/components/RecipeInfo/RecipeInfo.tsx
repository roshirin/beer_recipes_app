import { FC } from 'react';
import { Recipe } from '../../types/Recipe';
import mock from '../../images/mock_image.png';
import './RecipeInfo.scss';

type Props = {
  recipe: Recipe;
}

export const RecipeInfo: FC<Props> = ({ recipe }) => {
  const {
    name,
    tagline,
    first_brewed: firstBrewed,
    description,
    image_url: imageUrl,
    abv,
    ibu,
    target_fg: targetFg,
    target_og: targetOg,
    ebc,
    srm,
    ph,
    attenuation_level: attenuationLevel,
    volume,
    boil_volume: boilVolume,
    food_pairing: foodPairing,
    brewers_tips: brewerTips,
  } = recipe;

  return (
    <>
      <h2 className="recipe-title">
        {name}
      </h2>
      <div className="recipe-content">
        <div className="image-container">
          <img
            src={imageUrl || mock}
            alt={name}
            className="image-container__img"
          />
        </div>
        <div className="features-container">
          <p><em>{tagline}</em></p>
          <p><b>First Brewed: </b>{firstBrewed}</p>
          <p>{description}</p>
          <div className="features-container__info-block">
            <div className="features-container__info-group">
              <p><b>ABV:</b> {abv}</p>
              <p><b>IBU:</b> {ibu}</p>
              <p><b>Target FG:</b> {targetFg}</p>
              <p><b>Target OG:</b> {targetOg}</p>
              <p><b>EBC:</b> {ebc}</p>
              <p><b>SRM:</b> {srm}</p>
              <p><b>pH:</b> {ph}</p>
              <p><b>Attenuation:</b> {attenuationLevel}</p>
            </div>
            <div className="features-container__info-group">
              <p>
                <b>Volume:</b> {volume.value} {volume.unit}
              </p>
              <p>
                <b>Boil Volume:</b> {boilVolume.value} {boilVolume.unit}
              </p>
            </div>
          </div>
          <div>
            <p><b>Food Pairing:</b></p>
            <ul className="features-container__food-pairing">
              {foodPairing.map((food) => (
                <li key={food}>{food}</li>
              ))}
            </ul>
          </div>
          <p className="recipe-brewers-tips">
            <b>Brewers Tips:</b> {brewerTips}
          </p>
        </div>
      </div>
    </>
  );
};
