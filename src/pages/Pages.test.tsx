import React from "react";
import { render, screen } from "@testing-library/react";
import SelectionScreen from "./SelectionScreen";
import { BrowserRouter, Route, Router } from "react-router-dom";
import ShipScreen, { ALL_STARSHIPS } from "./ShipScreen";
import PeopleScreen, { ALL_PEOPLES } from "./PeopleScreen";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";

test("renders Selection Screen", () => {
  render(
    <BrowserRouter>
      <Route exact path="/" component={SelectionScreen} />
    </BrowserRouter>
  );
  expect(screen.getByText(/Starpship/i)).toBeInTheDocument();
  expect(screen.getByText(/People/i)).toBeInTheDocument();
});

test("renders Ship Screen with GraphQL Data", () => {
  const shipmocks = [
    {
      request: {
        query: ALL_STARSHIPS,
      },
      result: {
        allStarships: {
          edges: [
            {
              node: {
                hyperdriveRating: 2,
                name: "CR90 corvette",
                __typename: "Starship",
              },
              __typename: "StarshipsEdge",
            },
            {
              node: {
                hyperdriveRating: 3,
                name: "Star Destroyer",
                __typename: "Starship",
              },
              __typename: "StarshipsEdge",
            },
          ],
        },
      },
    },
  ];
  render(
    <MockedProvider mocks={shipmocks} addTypename={false}>
      <ShipScreen />
    </MockedProvider>
  );
});

test("renders People Screen with GraphQL Data", () => {
  const popelemocks = [
    {
      request: {
        query: ALL_PEOPLES,
      },
      result: {
        allPeople: {
          edges: [
            {
              node: {
                height: 172,
                name: "Luke Skywalker",
                __typename: "Person",
              },
              __typename: "PeopleEdge",
            },
            {
              node: {
                height: 167,
                name: "C-3PO",
                __typename: "Person",
              },
              __typename: "PeopleEdge",
            },
          ],
        },
      },
    },
  ];
  render(
    <MockedProvider mocks={popelemocks} addTypename={false}>
      <PeopleScreen />
    </MockedProvider>
  );
});
