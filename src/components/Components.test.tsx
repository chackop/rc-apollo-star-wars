import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "./Footer";
import { BrowserRouter } from "react-router-dom";

test("renders Footer", () => {
  render(
    <BrowserRouter>
      <Footer type="People" />
    </BrowserRouter>
  );
  expect(screen.getByText("Reload People")).toBeInTheDocument();
});
