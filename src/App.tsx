import "./App.css";

import {
  Container,
  FormControlLabel,
  Switch as MuiSwitch,
  Typography,
} from "@material-ui/core";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import SelectionScreen from "./pages/SelectionScreen";
import ShipScreen from "./pages/ShipScreen";
import PeopleScreen from "./pages/PeopleScreen";
import { CustomTheme, StyledWrapper } from "./components/StyledComp";
import { useCallback, useState } from "react";
import { ThemeProvider } from "styled-components";
import LogResults, { RowItem } from "./pages/LogResults";

function App() {
  const [primeTheme, setprimeTheme] = useState(false);
  const [dataRows, setdataRows] = useState<RowItem[]>([]);

  const handleSwitch = () => setprimeTheme((prevprimeTheme) => !prevprimeTheme);

  const handleLogging = useCallback(
    (rowObj: RowItem) => {
      let newArr = [...dataRows, rowObj];
      setdataRows(newArr);
    },
    [dataRows]
  );

  return (
    <ThemeProvider theme={CustomTheme}>
      <Container>
        <StyledWrapper primeTheme={primeTheme}>
          <Typography variant="h2" component="h2" gutterBottom>
            Star wars TopTrumps
          </Typography>
          <FormControlLabel
            control={
              <MuiSwitch
                checked={primeTheme}
                onChange={handleSwitch}
                name="Theme Switch"
              />
            }
            label="Theme Switch"
          />
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={SelectionScreen} />
              <Route
                path="/ship"
                component={() => <ShipScreen logHandler={handleLogging} />}
              />
              <Route
                path="/people"
                component={() => <PeopleScreen logHandler={handleLogging} />}
              />
              <Route
                path="/logs"
                component={() => <LogResults dataRows={dataRows} />}
              />
            </Switch>
          </BrowserRouter>
        </StyledWrapper>
      </Container>
    </ThemeProvider>
  );
}

export default App;
