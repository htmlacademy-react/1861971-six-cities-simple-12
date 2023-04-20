import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks/use-store/use-store';
import { auth, userData } from '../../store/selectors/data-authorization/selectors';
import { requestEndUserSession } from '../../store/api-actions/api-actions';
import { getNameCity } from '../../util/util';
import { Path, AuthorizationStatus, CITIES_NAMES } from '../../types/const/const';

function Header (): JSX.Element {
  const authorizationStatus = useAppSelector(auth);
  const userValue = useAppSelector(userData);
  const dispatch = useAppDispatch();

  const exitFromClosedPartApplication = () => {
    dispatch(requestEndUserSession());
  };

  const { Auth } = AuthorizationStatus;

  return (
    <ul className="header__nav-list">
      {
        (authorizationStatus === Auth ?
          <>
            <li className="header__nav-item user">
              {userValue &&
            <div className="header__nav-profile">
              <div className="header__avatar-wrapper user__avatar-wrapper" style={{ backgroundImage: `url(${userValue.avatarUrl})` }}></div>
              <span className="header__user-name user__name">{userValue.email}</span>
            </div>}
            </li>
            <li className="header__nav-item">
              <Link className="header__nav-link" to={Path.MainPath}>
                <span
                  className="header__signout"
                  onClick={exitFromClosedPartApplication}
                >
                Sign out
                </span>
              </Link>
            </li>
          </> :
          <li className="header__nav-item">
            <Link
              className="header__nav-link"
              to={Path.LoginPath}
              state={getNameCity(CITIES_NAMES)}
            >
              <div className="header__avatar-wrapper user__avatar-wrapper"></div>
              <span className="header__login">Sign in</span>
            </Link>
          </li>)
      }
    </ul>
  );
}

export default Header;
