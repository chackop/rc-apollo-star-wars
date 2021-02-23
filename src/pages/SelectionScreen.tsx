import { Button, Grid } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

const SelectionScreen = () => {
  return (
    <>
      <Grid container justify="space-evenly">
        <Button variant="contained" color="secondary">
          <Link to="/ship">Starships</Link>
        </Button>
        <Button variant="contained" color="secondary">
          <Link to="/people">People</Link>
        </Button>
      </Grid>

      <Button variant="contained" color="primary">
        <Link to="/logs">See Logs</Link>
      </Button>
    </>
  );
};

export default SelectionScreen;
