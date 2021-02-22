import { Grid, Button } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

interface FooterProps {
  type: "Ships" | "People";
  handleReload: () => void;
}

const Footer: React.FC<FooterProps> = ({ type, handleReload }) => {
  return (
    <Grid container justify="space-evenly" spacing={1}>
      <Button variant="contained" color="secondary">
        <Link to="/">Back to Selection</Link>
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleReload()}
      >
        Reload {type}
      </Button>
    </Grid>
  );
};

export default Footer;
