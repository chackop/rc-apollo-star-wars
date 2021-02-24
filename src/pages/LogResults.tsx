import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Button, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export interface RowItem {
  gameItem: string;
  playerOneStat: string;
  playerTwoStat: string;
  winnerDetails: string;
}

export interface LogResultsProps {
  dataRows: RowItem[];
}

const LogResults: React.FC<LogResultsProps> = ({ dataRows }) => {
  const classes = useStyles();
  return (
    <>
      {dataRows ? (
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Game Number and Date</TableCell>
                <TableCell align="right">player One Stat</TableCell>
                <TableCell align="right">player Two Stat</TableCell>
                <TableCell align="right">Winner Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataRows &&
                dataRows.map((row: RowItem) => (
                  <TableRow
                    key={
                      row.gameItem +
                      row.playerOneStat +
                      row.playerTwoStat +
                      row.winnerDetails
                    }
                  >
                    <TableCell component="th" scope="row">
                      {row.gameItem}
                    </TableCell>
                    <TableCell align="right">{row.playerOneStat}</TableCell>
                    <TableCell align="right">{row.playerTwoStat}</TableCell>
                    <TableCell align="right">{row.winnerDetails}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography variant="h4" component="h2" gutterBottom>
          No records
        </Typography>
      )}

      <Button variant="contained" color="secondary">
        <Link to="/">Back to Selection</Link>
      </Button>
    </>
  );
};

export default LogResults;
