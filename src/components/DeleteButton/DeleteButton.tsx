import { useMemo } from 'react';
import cn from 'classnames';
import { useRecipesStore } from '../../stores/useRecipesStore';
import './DeleteButton.scss';

export const DeleteButton = () => {
  const selectedRecipesIds = useRecipesStore(state => state.selectedRecipesIds);
  const deletedRecipesIds = useRecipesStore(state => state.deletedRecipesIds);
  const deleteRecipes = useRecipesStore(state => state.deleteRecipes);
  const cleanDeletedIds = useRecipesStore(state => state.cleanDeletedIds);

  const isCleanButtonActive = useMemo(() => (
    deletedRecipesIds.length > 0
  ), [deletedRecipesIds]);

  return (
    <div
      className={cn('delete-button-container', {
        'delete-button-container--hidden': selectedRecipesIds.length === 0,
      })}
    >
      <button
        className="delete-section-button"
        onClick={() => deleteRecipes(selectedRecipesIds)}
      >
        Delete
      </button>

      <button
        className="delete-section-button clean-button"
        onClick={() => cleanDeletedIds()}
        disabled={!isCleanButtonActive}
      >
        Clean deleted
      </button>
    </div>
  );
};
