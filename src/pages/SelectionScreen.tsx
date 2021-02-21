import { Button, Grid } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

const SelectionScreen = () => {
  return (
    <Grid>
      <Button variant="contained">
        <Link to="/ship">Starpship</Link>
      </Button>
      <Button variant="contained">
        <Link to="/people">People</Link>
      </Button>
    </Grid>
  );
};

export default SelectionScreen;
