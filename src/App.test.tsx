import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders Star wars TopTrumps", () => {
  render(<App />);
  const linkElement = screen.getByText(/Star wars TopTrumps/i);
  expect(linkElement).toBeInTheDocument();
});
