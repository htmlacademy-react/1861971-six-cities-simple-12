import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from '../main-page/main-page';
import ScreenError from '../../components/screen-error/screen-error';
import LoadOffer from '../../components/load-offer/load-offer';
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
        <Route path={ErrorPath} element={<ScreenError/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
