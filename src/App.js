import './App.css';
import HomePage from './app/pages/home-page/home';
import { Link, Route, Switch } from "react-router-dom";
import Sorting from './app/components/sorting-component/sorting';
function App() {
  return (
    <div>
      <Switch>
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
