import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from '../main-pege/main-page';
import ErrorPage from '../../pages/error-search-page/error-search-page';
import LoadOffer from '../../pages/load-offer/load-offer';
import LoginPage from '../login-page/login-page';
import { Path } from '../../types/const/const';

function App(): JSX.Element {
  const { MainPath, LoginPath, OfferPath, ErrorPath } = Path;

  return (
    <BrowserRouter>
      <Routes>
        <Route path={MainPath} element={<MainPage/>}/>
        <Route path={LoginPath} element={<LoginPage/>}/>
        <Route path={OfferPath}>
          <Route path=':id' element={<LoadOffer/>}/>
        </Route>
        <Route path={ErrorPath} element={<ErrorPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
