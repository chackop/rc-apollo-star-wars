import { Button, Grid } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

const SelectionScreen = () => {
  return (
    <Grid container justify="space-evenly">
      <Button variant="contained" color="secondary">
        <Link to="/ship">Starpship</Link>
      </Button>
      <Button variant="contained" color="secondary">
        <Link to="/people">People</Link>
      </Button>
    </Grid>
  );
};

export default SelectionScreen;
