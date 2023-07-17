import React, { FC, RefObject } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { useRecipesStore } from '../../stores/useRecipesStore';
import { Recipe } from '../../types/Recipe';
import { shortDescriptionLength } from '../../constants/constants';
import './RecipeItem.scss';

type Props = {
  recipe: Recipe;
  refer?: RefObject<HTMLDivElement>;
}

export const RecipeItem: FC<Props> = ({ recipe, refer }) => {
  const {
    id,
    name,
    tagline,
    image_url: imageUrl,
    abv,
    ibu,
    description,
  } = recipe;

  const selectedRecipesIds = useRecipesStore(state => state.selectedRecipesIds);
  const selectRecipe = useRecipesStore(state => state.selectRecipe);
  const unselectRecipe = useRecipesStore(state => state.unselectRecipe);

  const isSelected = selectedRecipesIds.includes(id);
  const shortDescription = description.slice(0, shortDescriptionLength) + '...';

  const handleItemSelection = (
    contextEvent: React.MouseEvent<HTMLDivElement>,
  ) => {
    contextEvent.preventDefault();

    if (isSelected) {
      unselectRecipe(id);

      return;
    }

    selectRecipe(id);
  };

  return (
    <div
      className={cn('recipe-card', {
        'selected-item': isSelected,
      })}
      onContextMenu={(contextEvent) => handleItemSelection(contextEvent)}
      ref={refer}
    >
      <Link to={`/recipe/${id}`} className="card-content">
        <div className="media">
          <div className="media-left">
            <figure className="list-image-container">
              <img
                className="list-image"
                src={imageUrl}
                alt={name}
              />
            </figure>
          </div>
          <div className="media-content">
            <p className="title is-4">{name}</p>
            <p className="subtitle is-6">{tagline}</p>
            <div className="content short-desc">
              <div>
                <strong>ABV:</strong> {abv}%
              </div>
              <div>
                <strong>IBU:</strong> {ibu}
              </div>
              <div className="mobile-hidden">
                <strong>Description:</strong> {shortDescription}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};
