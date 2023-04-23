import { useState, ChangeEvent, SyntheticEvent, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/use-store/use-store';
import { auth } from '../../store/selectors/data-authorization/selectors';
import { authorizationOnServer } from '../../store/api-actions/api-actions';
import { checkValidate } from '../../util/util';
import { AuthorizationStatus, Path } from '../../types/const/const';

type SetValidate = React.Dispatch<React.SetStateAction<{
  isEmail: boolean;
  isPassword: boolean;
}>>

type Validate = {
  isEmail: boolean;
  isPassword: boolean;
}

type Location = {
  state: string | null;
  key: string;
}

function LoginPage (): JSX.Element {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ validate, setValidate ] = useState({
    isEmail: false,
    isPassword: false
  });

  const { state } = useLocation() as Location;

  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(auth);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    if(authorizationStatus === AuthorizationStatus.Auth && isMounted){
      navigate(Path.MainPath);
    }

    return () => {
      isMounted = false;
    };
  });

  const handleFormSend = (evt: SyntheticEvent) => {
    evt.preventDefault();
    dispatch(authorizationOnServer({email, password}));
  };

  const handleInputEmailChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setEmail(evt.target.value);
    checkValidate<SetValidate, Validate>(setValidate, validate, email, 'isEmail');
  };

  const handleInputPasswordChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setPassword(evt.target.value);
    checkValidate<SetValidate, Validate>(setValidate, validate, password, 'isPassword');
  };

  return (
    <div className="page page--gray page--login">

      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link" to={Path.MainPath}>
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" action="#" method="post" onSubmit={handleFormSend}>
              <div className="login__input-wrapper form__input-wrapper">
                {!validate.isEmail && <p className="reviews__help" style={{color: 'red'}}>Required field !!! Filling example: ivan.v@yandex.ru</p>}
                <label className="visually-hidden">E-mail</label>
                <input className="login__input form__input" type="email" name="email" placeholder="Email" required onChange={handleInputEmailChange}/>
              </div>

              <div className="login__input-wrapper form__input-wrapper">
                {!validate.isPassword && <p className="reviews__help" style={{color: 'red'}}>Required field !!!</p>}
                <label className="visually-hidden">Password</label>
                <input className="login__input form__input" type="password" name="password" placeholder="Password" required onChange={handleInputPasswordChange}/>
              </div>
              {validate.isEmail && validate.isPassword ?
                <button className="login__submit form__submit button" type="submit" disabled={false}>Sign in</button> :
                <button className="login__submit form__submit button" type="submit" disabled>Sign in</button>}
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link
                className="locations__item-link"
                to={Path.MainPath}
                state={state}
              >
                <span>{state}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default LoginPage;
