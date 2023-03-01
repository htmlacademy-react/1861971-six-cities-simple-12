import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from '../main-pege/main-page';
import OfferPage from '../offer-page/offer-page';
import ErrorPage from '../../pages/error-search-page/error-search-page';
import { Path } from '../../types/const/const';

function App(): JSX.Element {
  const { MinePath, OfferPath, Mistake } = Path;

  return (
    <BrowserRouter>
      <Routes>
        <Route path={MinePath} element={<MainPage/>}/>
        <Route path={OfferPath}>
          <Route path=':id' element={<OfferPage/>}/>
        </Route>
        <Route path={Mistake} element={<ErrorPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;