function HeaderPage (): JSX.Element {
  const authorizationStatus = false;

  return (
    <ul className="header__nav-list">
      {(authorizationStatus &&
        <>
          <li className="header__nav-item user">
            <div className="header__nav-profile">
              <div className="header__avatar-wrapper user__avatar-wrapper"></div>
              <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
            </div>
          </li>
          <li className="header__nav-item">
            <a className="header__nav-link" href='#todo'>
              <span className="header__signout">Sign out</span>
            </a>
          </li>
        </>) || (!authorizationStatus &&
        <li className="header__nav-item">
          <a className="header__nav-link" href='#todo'>
            <span className="header__signout">Login</span>
          </a>
        </li>)}
    </ul>
  );
}

export default HeaderPage;
