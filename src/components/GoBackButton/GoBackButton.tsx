import { useNavigate } from 'react-router-dom';
import './GoBackButton.scss';

export const GoBackButton = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <button className="go-back" onClick={goBack}>
      {'< Back'}
    </button>
  );
};
