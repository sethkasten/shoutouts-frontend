import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import UserShoutOuts from "./components/UserShoutOuts";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/" exact>
            <Redirect to="/" />
          </Route>
          <Route path="/user/:name">
            <UserShoutOuts />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
