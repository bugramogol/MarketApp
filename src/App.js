import './App.css';
import { Route, Switch } from "react-router-dom";

import Header from './app/components/header-component/header';
import Footer from './app/components/footer-component/footer';
import HomePage from './app/pages/home-page/home';
import Market from './app/pages/market-page/market';

/* 
In order to deploy the project on my github page, a double url was defined for the market page.
*/
function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path='/MarketApp' component={Market} />
        <Route exact path='/' component={Market} />
        <Route exact path="/home" component={HomePage} />

      </Switch>
      <Footer />
    </div>
  );
}

export default App;
