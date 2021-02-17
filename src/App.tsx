import React, { useState } from "react";
import "./App.css";

import { useQuery, gql, DocumentNode } from "@apollo/client";
import SelectComponents from "./components/SelectComponents";
import { Container } from "@material-ui/core";

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
  const [selection, setSelection] = useState("");

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

      {console.log("data", data)}
    </Container>
  );
}

export default App;
