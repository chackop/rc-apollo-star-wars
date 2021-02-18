import React, { useState, useEffect } from "react";
import "./App.css";

import { useQuery, gql, DocumentNode } from "@apollo/client";
import SelectComponents from "./components/SelectComponents";
import { Container, Grid } from "@material-ui/core";
import CardComponent from "./components/CardComponent";

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

const ALL_PEOPLE = gql`
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

function App() {
  const [selection, setSelection] = useState("People");
  const [playOneStat, setplayOneStat] = useState({ name: "", value: 0 });
  const [playTwoStat, setplayTwoStat] = useState({ name: "", value: 0 });

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelection(event.target.value as string);
  };

  let RES_QUERY: DocumentNode = gql`
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

  if (selection === "Starship") {
    RES_QUERY = ALL_STARSHIPS;
  } else if (selection === "People") {
    RES_QUERY = ALL_PEOPLE;
  }

  const { loading, error, data } = useQuery(RES_QUERY);

  useEffect(() => {
    if (data) {
      const dataEdges =
        selection === "Starship" ? data["allStarships"] : data["allPeople"];

      const playOne =
        dataEdges &&
        dataEdges["edges"][
          Math.floor(Math.random() * dataEdges["edges"].length)
        ];

      const playTwo =
        dataEdges &&
        dataEdges["edges"][
          Math.floor(Math.random() * dataEdges["edges"].length)
        ];

      setplayOneStat({
        name: playOne && playOne["node"]["name"],
        value:
          selection === "Starship"
            ? playOne.node["hyperdriveRating"]
            : playOne.node["height"],
      });

      setplayTwoStat({
        name: playTwo && playTwo["node"]["name"],
        value:
          playTwo && selection === "Starship"
            ? playTwo.node["hyperdriveRating"]
            : playTwo.node["height"],
      });
    }
  }, [selection, data]);

  if (loading) return <p>Loading...{selection}</p>;
  if (error)
    return (
      <p>
        Error Loading {selection}- {error}
      </p>
    );

  return (
    <Container>
      <h2>Star wars TopTrumps</h2>

      <SelectComponents
        resourceSelect={selection}
        handleChange={handleChange}
      />

      <Grid container>
        <CardComponent
          stats={playOneStat}
          selection={selection}
          isWinner={playOneStat.value > playTwoStat.value}
        />
        <CardComponent
          stats={playTwoStat}
          selection={selection}
          isWinner={playTwoStat.value > playOneStat.value}
        />
      </Grid>
    </Container>
  );
}

export default App;
