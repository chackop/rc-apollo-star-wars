import { Button, Card, CardContent, Grid, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { Link } from "react-router-dom";

const ALL_PEOPLES = gql`
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

const PeopleScreen = () => {
  const { loading, error, data } = useQuery(ALL_PEOPLES);

  const [PeopleOneStat, setPeopleOneStat] = useState({ name: "", value: 0 });
  const [PeopleTwoStat, setPeopleTwoStat] = useState({ name: "", value: 0 });

  useEffect(() => {
    console.log("in useffect", data);

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
    }
  }, [data]);

  if (loading) return <p>Loading...Star People Data</p>;
  if (error) return <p>Error Loading People Data- {error}</p>;

  return (
    <>
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

      <Grid container justify="space-evenly" spacing={1}>
        <Button variant="contained" color="secondary">
          <Link to="/">Back to Selection</Link>
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => window.location.reload()}
        >
          Reload People
        </Button>
      </Grid>
    </>
  );
};

export default PeopleScreen;
