import React from "react";
import { render, screen } from "@testing-library/react";
import SelectionScreen from "./SelectionScreen";
import { BrowserRouter, Route, Router } from "react-router-dom";
import ShipScreen from "./ShipScreen";
import PeopleScreen from "./PeopleScreen";
import { MockedProvider } from "@apollo/client/testing";

test("renders Selection Screen", () => {
  render(
    <BrowserRouter>
      <Route exact path="/" component={SelectionScreen} />
    </BrowserRouter>
  );
  expect(screen.getByText(/Starpship/i)).toBeInTheDocument();
  expect(screen.getByText(/People/i)).toBeInTheDocument();
});

test("renders Ship Screen", () => {
  render(
    <BrowserRouter>
      <Route exact path="/ship" component={ShipScreen} />
    </BrowserRouter>
  );
});

test("renders People Screen", () => {
  render(
    <BrowserRouter>
      <Route exact path="/people" component={PeopleScreen} />
    </BrowserRouter>
  );
});

// test("renders Ship Screen with GraphQL Data", () => {
// const mocks = [
//   {
//     request: {
//       query: ALL_STARSHIPS,
//
//     },
//     result: {
//       allStarships: {
//         edges: [
// node: {
//     name: 'Test Name',
//     hyperdriveRating: 59
//   }
// ],
//       },
//     },
//   },
// ];
//   render(
//     <MockedProvider mocks={mocks} addTypename={false}>
//       <BrowserRouter>
//         <Route exact path="/ship" component={ShipScreen} />
//       </BrowserRouter>
//     </MockedProvider>
//   );
// });
