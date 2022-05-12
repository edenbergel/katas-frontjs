import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

const BeersList = lazy(() => import('../BeerList/BeerList'));
const BeerDetails = lazy(() => import('../BeerDetails/BeerDetails'));
const Cart = lazy(() => import('../Cart/Cart'));

function Router() {
  
  return (
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/beer/:id" element={<BeerDetails />}></Route>
          <Route path="/" element={<BeersList />}></Route>
        </Routes>
      </Suspense>
  )
}

export default Router;
