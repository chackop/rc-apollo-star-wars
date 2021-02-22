import { Card, CardContent, Grid, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import Footer from "../components/Footer";

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

const PeopleScreen = () => {
  const { loading, error, data } = useQuery(ALL_PEOPLES);

  const [PeopleOneStat, setPeopleOneStat] = useState({ name: "", value: 0 });
  const [PeopleTwoStat, setPeopleTwoStat] = useState({ name: "", value: 0 });

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
    }
  }, [data]);

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

      <Footer type="People" />
    </>
  );
};

export default PeopleScreen;
