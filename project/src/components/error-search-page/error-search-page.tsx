import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Path } from '../../types/const/const';
import './error.css';
import './error-message.css';

function ErrorPage (): JSX.Element {
  const navigate = useNavigate();

  const closeError = () => {
    setTimeout(() => navigate(Path.MainPath), 2000);
  };

  useEffect (() => {
    let isMounted = true;

    if(isMounted) {
      closeError();
    }

    return () => {
      isMounted = false;
    };
  }
  );

  return (
    <div className="error">
      <p className="error-message">Page does not exist</p>
    </div>
  );
}

export default ErrorPage;
