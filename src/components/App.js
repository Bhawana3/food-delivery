import React, {lazy, Suspense} from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';

const LazyRestaurantView = lazy(() => import('./restaurant/RestaurantView'))
const LazyRestaurantDetail = lazy(() => import('./restaurant/RestaurantDetail'))

function App() {
  return (
    <div className="App">
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path='/'><LazyRestaurantView /></Route>
          <Route exact path='/:name' render={(props) => <LazyRestaurantDetail {...props} /> } /> 
        </Switch>
      </Suspense>
    </div>
  );
}

export default App;
