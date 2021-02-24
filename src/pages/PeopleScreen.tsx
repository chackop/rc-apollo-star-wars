import { Card, CardContent, Grid, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import Footer from "../components/Footer";
import { RowItem } from "./LogResults";

export const ALL_PEOPLES = gql`
  {
    allPeople {
      edges {
        node {
          name
          height
        }
      }
    }
  }
`;

interface PeopleScreenProps {
  logHandler: (params: RowItem) => void;
}

const PeopleScreen: React.FC<PeopleScreenProps> = ({ logHandler }) => {
  const { loading, error, data } = useQuery(ALL_PEOPLES);

  const [PeopleOneStat, setPeopleOneStat] = useState({ name: "", value: 0 });
  const [PeopleTwoStat, setPeopleTwoStat] = useState({ name: "", value: 0 });
  const [reload, setReload] = useState(false);

  useEffect(() => {
    if (data) {
      const PeopleOne =
        data["allPeople"] &&
        data["allPeople"]["edges"][
          Math.floor(Math.random() * data["allPeople"]["edges"].length)
        ];

      const PeopleTwo =
        data["allPeople"] &&
        data["allPeople"]["edges"][
          Math.floor(Math.random() * data["allPeople"]["edges"].length)
        ];

      setPeopleOneStat({
        name: PeopleOne && PeopleOne["node"]["name"],
        value: PeopleOne && PeopleOne["node"]["height"],
      });

      setPeopleTwoStat({
        name: PeopleTwo && PeopleTwo["node"]["name"],
        value: PeopleTwo && PeopleTwo["node"]["height"],
      });

      const dte = new Date();

      logHandler({
        gameItem: `#-${dte.toISOString()}`,
        playerOneStat: `${PeopleOne["node"]["name"]}-${PeopleOne["node"]["height"]}`,
        playerTwoStat: `${PeopleTwo["node"]["name"]}-${PeopleTwo["node"]["height"]}`,
        winnerDetails:
          PeopleOne["node"]["height"] > PeopleTwo["node"]["height"]
            ? "Person One is Winner"
            : "Person Two is Winner",
      });
    }
  }, [data, logHandler, reload]);

  if (loading) return <p>Loading...Star People Data</p>;
  if (error) return <p>Error Loading People Data- {error}</p>;
  return (
    <>
      <Typography variant="h4" component="h2" gutterBottom>
        People
      </Typography>

      <Grid container justify="space-evenly">
        <Card title="People One">
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Person One
            </Typography>
            <Typography variant="h5" component="h2" gutterBottom>
              {PeopleOneStat.name}
            </Typography>
            <Typography variant="body2" component="p">
              Height Rating- {PeopleOneStat.value}
            </Typography>
          </CardContent>
        </Card>

        <Card title="People Two">
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Person Two
            </Typography>
            <Typography variant="h5" component="h2" gutterBottom>
              {PeopleTwoStat.name}
            </Typography>
            <Typography variant="body2" component="p">
              Height Rating- {PeopleTwoStat.value}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Typography variant="h4" component="h2" color="secondary" gutterBottom>
        {PeopleOneStat.value > PeopleTwoStat.value
          ? "Person One Wins"
          : "Person Two Wins"}
      </Typography>

      <Footer
        type="People"
        handleReload={() => setReload((prevReload) => !prevReload)}
      />
    </>
  );
};

export default PeopleScreen;
