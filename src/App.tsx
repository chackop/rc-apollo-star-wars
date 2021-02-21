import "./App.css";

import { Container } from "@material-ui/core";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import SelectionScreen from "./pages/SelectionScreen";
import ShipScreen from "./pages/ShipScreen";
import PeopleScreen from "./pages/PeopleScreen";
import { StyledWrapper } from "./components/StyledComp";

function App() {
  return (
    <Container>
      <StyledWrapper>
        <h2>Star wars TopTrumps</h2>

        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={SelectionScreen} />
            <Route path="/ship" component={ShipScreen} />
            <Route path="/people" component={PeopleScreen} />
          </Switch>
        </BrowserRouter>
      </StyledWrapper>
    </Container>
  );
}

export default App;
