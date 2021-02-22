import { Card, CardContent, Grid, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import Footer from "../components/Footer";

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

const ShipScreen = () => {
  const { loading, error, data } = useQuery(ALL_STARSHIPS);

  const [shipOneStat, setshipOneStat] = useState({ name: "", value: 0 });
  const [shipTwoStat, setshipTwoStat] = useState({ name: "", value: 0 });

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
    }
  }, [data]);

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

      <Footer type="Ships" />
    </>
  );
};

export default ShipScreen;
