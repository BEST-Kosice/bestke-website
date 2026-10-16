import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

describe("test setup", () => {
  it("renders a component and asserts on its output", () => {
    render(<h1>Hello BEST</h1>);
    expect(
      screen.getByRole("heading", { name: "Hello BEST" }),
    ).toBeInTheDocument();
  });
});
