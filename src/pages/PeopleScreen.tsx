import { Card, CardContent, Grid, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";

const ALL_PEOPLES = gql`
  {
    allStarPeoples {
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
    if (data) {
      const PeopleOne =
        data["allStarPeoples"] &&
        data["allStarPeoples"]["edges"][
          Math.floor(
            Math.random() * data["allStarPeoples"]["edges"]["edges"].length
          )
        ];

      const PeopleTwo =
        data["allStarPeoples"] &&
        data["allStarPeoples"]["edges"][
          Math.floor(
            Math.random() * data["allStarPeoples"]["edges"]["edges"].length
          )
        ];

      setPeopleOneStat({
        name: PeopleOne && PeopleOne["node"]["name"],
        value: PeopleOne && PeopleOne["node"]["hyperdriveRating"],
      });

      setPeopleTwoStat({
        name: PeopleTwo && PeopleTwo["node"]["name"],
        value: PeopleTwo && PeopleTwo["node"]["hyperdriveRating"],
      });
    }
  }, [data]);

  if (loading) return <p>Loading...Star People Data</p>;
  if (error) return <p>Error Loading People Data- {error}</p>;

  return (
    <Grid container>
      <Card title="People One">
        <CardContent>
          <Typography color="textSecondary" gutterBottom>
            Hyper Drive Rating
          </Typography>
          <Typography variant="h5" component="h2">
            {PeopleOneStat.name} - {PeopleOneStat.value}
          </Typography>
          <Typography variant="body2" component="p">
            {PeopleOneStat.value > PeopleTwoStat.value
              ? "People One Wins"
              : "People One Lost"}
          </Typography>
        </CardContent>
      </Card>

      <Card title="People Two">
        <CardContent>
          <Typography color="textSecondary" gutterBottom>
            Hyper Drive Rating
          </Typography>
          <Typography variant="h5" component="h2">
            {PeopleTwoStat.name} - {PeopleTwoStat.value}
          </Typography>
          <Typography variant="body2" component="p">
            {PeopleOneStat.value < PeopleTwoStat.value
              ? "People Two Wins"
              : "People Two Lost"}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default PeopleScreen;
