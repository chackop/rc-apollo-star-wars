import classes from "*.module.css";
import {
  Button,
  createStyles,
  FormControl,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  Theme,
} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  })
);

interface SelectComponentsProps {
  resourceSelect: string;
  handleChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
}

const SelectComponents: React.FC<SelectComponentsProps> = ({
  resourceSelect,
  handleChange,
}) => {
  const classes = useStyles();

  return (
    <Grid>
      {/* <Button variant="contained">Starpship</Button>
      <Button variant="contained">People</Button> */}
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="SelectComponents">Select Resources</InputLabel>
        <Select
          labelId="SelectComponents"
          value={resourceSelect}
          onChange={handleChange}
          label="Select Resources"
          className={classes.selectEmpty}
        >
          {/* <MenuItem value="">
            <em>None</em>
          </MenuItem> */}
          <MenuItem value="Starship">Starship</MenuItem>
          <MenuItem value="People">People</MenuItem>
        </Select>
      </FormControl>
    </Grid>
  );
};

export default SelectComponents;
