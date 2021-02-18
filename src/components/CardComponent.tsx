import { Card, CardContent, Typography } from "@material-ui/core";
import React from "react";

interface CardComponentProps {
  stats: { name: string; value: number };
  selection: string;
  isWinner: boolean;
}
const CardComponent: React.FC<CardComponentProps> = ({
  stats,
  selection,
  isWinner,
}) => {
  return (
    <Card>
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          {selection === "people" ? "Height" : "Hyper Drive Rating"}
        </Typography>
        <Typography variant="h5" component="h2">
          {stats.name} - {stats.value}
        </Typography>
        <Typography variant="body2" component="p">
          {isWinner ? "Winner" : "Loser"}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CardComponent;
