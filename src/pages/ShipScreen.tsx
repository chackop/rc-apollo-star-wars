import { Card, CardContent, Grid, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import Footer from "../components/Footer";
import { RowItem } from "./LogResults";

export const ALL_STARSHIPS = gql`
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

interface ShipScreenProps {
  logHandler: (params: RowItem) => void;
}

const ShipScreen: React.FC<ShipScreenProps> = ({ logHandler }) => {
  const { loading, error, data } = useQuery(ALL_STARSHIPS);

  const [shipOneStat, setshipOneStat] = useState({ name: "", value: 0 });
  const [shipTwoStat, setshipTwoStat] = useState({ name: "", value: 0 });
  const [reload, setReload] = useState(false);

  useEffect(() => {
    if (data) {
      const shipOne =
        data["allStarships"] &&
        data["allStarships"]["edges"][
          Math.floor(Math.random() * data["allStarships"]["edges"].length)
        ];

      const shipTwo =
        data["allStarships"] &&
        data["allStarships"]["edges"][
          Math.floor(Math.random() * data["allStarships"]["edges"].length)
        ];

      setshipOneStat({
        name: shipOne && shipOne["node"]["name"],
        value: shipOne && shipOne["node"]["hyperdriveRating"],
      });

      setshipTwoStat({
        name: shipTwo && shipTwo["node"]["name"],
        value: shipTwo && shipTwo["node"]["hyperdriveRating"],
      });

      const dte = new Date();

      logHandler({
        gameItem: `#-${dte.toISOString()}`,
        playerOneStat: `${shipOne["node"]["name"]}-${shipOne["node"]["hyperdriveRating"]}`,
        playerTwoStat: `${shipTwo["node"]["name"]}-${shipTwo["node"]["hyperdriveRating"]}`,
        winnerDetails:
          shipOne["node"]["hyperdriveRating"] >
          shipTwo["node"]["hyperdriveRating"]
            ? "Ship One is Winner"
            : "Ship Two is Winner",
      });
    }
  }, [data, logHandler, reload]);

  if (loading) return <p>Loading...Star Ship Data</p>;
  if (error) return <p>Error Loading Ship Data- {error}</p>;

  return (
    <>
      <Typography variant="h4" component="h2" gutterBottom>
        Ships
      </Typography>

      <Grid container justify="space-evenly">
        <Card title="Ship One">
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Ship One
            </Typography>
            <Typography variant="h5" component="h2" gutterBottom>
              {shipOneStat.name}
            </Typography>
            <Typography variant="body2" component="p">
              Hyper Drive Rating- {shipOneStat.value}
            </Typography>
          </CardContent>
        </Card>

        <Card title="Ship Two">
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Ship Two
            </Typography>
            <Typography variant="h5" component="h2" gutterBottom>
              {shipTwoStat.name}
            </Typography>
            <Typography variant="body2" component="p">
              Hyper Drive Rating- {shipTwoStat.value}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Typography variant="h4" component="h2" color="secondary" gutterBottom>
        {shipOneStat.value > shipTwoStat.value
          ? "Ship One Wins"
          : "Ship Two Wins"}
      </Typography>

      <Footer
        type="Ships"
        handleReload={() => setReload((prevReload) => !prevReload)}
      />
    </>
  );
};

export default ShipScreen;
