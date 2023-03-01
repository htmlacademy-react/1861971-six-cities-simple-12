import {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { Path } from '../../types/const/const';
import './error.css';
import './error-message.css';

function ErrorPage (): JSX.Element {
  const navigate = useNavigate();

  const closeError = () => {
    setTimeout(() => navigate(Path.MinePath), 2000);
  };

  useEffect (() =>
    closeError()
  );

  return (
    <div className="error">
      <p className="error-message">Page does not exist</p>
    </div>
  );
}

export default ErrorPage;
