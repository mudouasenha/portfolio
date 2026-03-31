import React from "react";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { MemoryRouter, useLocation } from "react-router-dom";

import MainRoutes from "@/MainRoutes";
import i18n from "@/i18n";

function LocationDisplay() {
  const location = useLocation();
  return <span data-testid="location">{`${location.pathname}${location.search}`}</span>;
}

function renderWithRoute(initialPath: string) {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <MainRoutes />
      <LocationDisplay />
    </MemoryRouter>,
  );
}

describe("i18n route continuity", () => {
  beforeEach(async () => {
    window.localStorage.clear();
    await i18n.changeLanguage("en");
  });

  afterEach(() => {
    cleanup();
  });

  it("redirects root path to detected language", async () => {
    window.localStorage.setItem("portfolio.lang", "pt");

    renderWithRoute("/");

    await waitFor(() => {
      expect(screen.getByTestId("location")).toHaveTextContent("/pt");
    });
    expect(await screen.findByRole("heading", { name: "Projetos", level: 2 })).toBeInTheDocument();
  });

  it("redirects invalid language paths to /en fallback", async () => {
    renderWithRoute("/es/projects?from=test");

    await waitFor(() => {
      expect(screen.getByTestId("location")).toHaveTextContent("/en/projects?from=test");
    });
    expect(await screen.findByRole("heading", { name: "Projects", level: 2 })).toBeInTheDocument();
  });

  it("switching language updates both URL and localized content", async () => {
    const user = userEvent.setup();
    renderWithRoute("/en/projects");

    expect(await screen.findByRole("heading", { name: "Projects", level: 2 })).toBeInTheDocument();
    expect(screen.getByTestId("location")).toHaveTextContent("/en/projects");

    const [switchToPtButton] = screen.getAllByRole("button", { name: "Switch language to PT" });
    await user.click(switchToPtButton);

    await waitFor(() => {
      expect(screen.getByTestId("location")).toHaveTextContent("/pt/projects");
    });
    expect(await screen.findByRole("heading", { name: "Projetos", level: 2 })).toBeInTheDocument();
  });
});
