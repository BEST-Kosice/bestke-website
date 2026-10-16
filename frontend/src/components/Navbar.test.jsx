import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom"; // or 'react-router', whichever you import from
import { describe, it, expect } from "vitest";
import Navbar from "./Navbar";
import { LanguageProvider } from "../context/LanguageContext";

function renderNavbar() {
  return render(
    <MemoryRouter>
      <LanguageProvider>
        <Navbar />
      </LanguageProvider>
    </MemoryRouter>,
  );
}

describe("Navbar mobile toggle", () => {
  it("is closed by default", () => {
    renderNavbar();

    const toggle = screen.getByRole("button", { name: /open menu/i });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
  });

  it("opens and closes the menu when clicked", async () => {
    const user = userEvent.setup();
    renderNavbar();

    await user.click(screen.getByRole("button", { name: /open menu/i }));

    const closeButton = screen.getByRole("button", { name: /close menu/i });
    expect(closeButton).toHaveAttribute("aria-expanded", "true");

    await user.click(closeButton);

    expect(screen.getByRole("button", { name: /open menu/i })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
  });
});
