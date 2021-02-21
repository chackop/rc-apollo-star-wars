import { Card, CardContent, Grid, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";

const ALL_STARSHIPS = gql`
  {
    allStarships {
      edges {
        node {
          name
          hyperdriveRating
        }
      }
    }
  }
`;

const ShipScreen = () => {
  const { loading, error, data } = useQuery(ALL_STARSHIPS);

  const [shipOneStat, setshipOneStat] = useState({ name: "", value: 0 });
  const [shipTwoStat, setshipTwoStat] = useState({ name: "", value: 0 });

  useEffect(() => {
    if (data) {
      const shipOne =
        data["allStarships"] &&
        data["allStarships"]["edges"][
          Math.floor(
            Math.random() * data["allStarships"]["edges"]["edges"].length
          )
        ];

      const shipTwo =
        data["allStarships"] &&
        data["allStarships"]["edges"][
          Math.floor(
            Math.random() * data["allStarships"]["edges"]["edges"].length
          )
        ];

      setshipOneStat({
        name: shipOne && shipOne["node"]["name"],
        value: shipOne && shipOne["node"]["hyperdriveRating"],
      });

      setshipTwoStat({
        name: shipTwo && shipTwo["node"]["name"],
        value: shipTwo && shipTwo["node"]["hyperdriveRating"],
      });
    }
  }, [data]);

  if (loading) return <p>Loading...Star Ship Data</p>;
  if (error) return <p>Error Loading Ship Data- {error}</p>;

  return (
    <Grid container>
      <Card title="Ship One">
        <CardContent>
          <Typography color="textSecondary" gutterBottom>
            Hyper Drive Rating
          </Typography>
          <Typography variant="h5" component="h2">
            {shipOneStat.name} - {shipOneStat.value}
          </Typography>
          <Typography variant="body2" component="p">
            {shipOneStat.value > shipTwoStat.value
              ? "Ship One Wins"
              : "Ship One Lost"}
          </Typography>
        </CardContent>
      </Card>

      <Card title="Ship Two">
        <CardContent>
          <Typography color="textSecondary" gutterBottom>
            Hyper Drive Rating
          </Typography>
          <Typography variant="h5" component="h2">
            {shipTwoStat.name} - {shipTwoStat.value}
          </Typography>
          <Typography variant="body2" component="p">
            {shipOneStat.value < shipTwoStat.value
              ? "Ship Two Wins"
              : "Ship Two Lost"}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ShipScreen;
