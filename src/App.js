import './App.css';
import HomePage from './app/pages/home-page/home';
import { Route, Switch } from "react-router-dom";
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
