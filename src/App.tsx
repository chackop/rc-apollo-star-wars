import "./App.css";

import { Container } from "@material-ui/core";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import SelectionScreen from "./pages/SelectionScreen";
import ShipScreen from "./pages/ShipScreen";

function App() {
  return (
    <Container>
      <h2>Star wars TopTrumps</h2>

      <BrowserRouter>
        <Switch>
          <Route path="/">
            <SelectionScreen />
          </Route>
          <Route exact path="/ship">
            <ShipScreen />
          </Route>
          <Route exact path="/people">
            <ShipScreen />
          </Route>
        </Switch>
      </BrowserRouter>
    </Container>
  );
}

export default App;
