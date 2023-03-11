import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks/use-store/use-store';
import { auth, userData } from '../../store/selectors/data-authorization/selectors';
import { Path, AuthorizationStatus } from '../../types/const/const';

function HeaderPage (): JSX.Element {
  const authorizationStatus = useAppSelector(auth);
  const userValue = useAppSelector(userData);

  const {Auth, NoAuth} = AuthorizationStatus;

  return (
    <ul className="header__nav-list">
      {(authorizationStatus === Auth &&
        <>
          <li className="header__nav-item user">
            {userValue &&
            <div className="header__nav-profile">
              <div className="header__avatar-wrapper user__avatar-wrapper" style={{ backgroundImage: `url(${userValue.avatarUrl})` }}></div>
              <span className="header__user-name user__name">{userValue.email}</span>
            </div>}
          </li>
          <li className="header__nav-item">
            <a className="header__nav-link" href='#todo'>
              <span className="header__signout">Sign out</span>
            </a>
          </li>
        </>) || (authorizationStatus === NoAuth &&
        <li className="header__nav-item">
          <Link className="header__nav-link" to={Path.LoginPath}>
            <span className="header__signout">Login</span>
          </Link>
        </li>)}
    </ul>
  );
}

export default HeaderPage;
