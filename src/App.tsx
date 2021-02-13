import React from "react";
import "./App.css";

import { useQuery, gql } from "@apollo/client";

const ALL_STARSHIPS = gql`
  {
    allStarships {
      edges {
        node {
          name
        }
      }
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(ALL_STARSHIPS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error Loading {error}</p>;

  return (
    <>
      <h2>Star wars Spaceship</h2>

      {console.log("data", data)}
      {/* {data &&
        data.allStarships.edges.map(({ node }: any, idx: number) => (
          <p key={"allStarships" + node.name + idx}>{node.name}</p>
        ))} */}
    </>
  );
}

export default App;
