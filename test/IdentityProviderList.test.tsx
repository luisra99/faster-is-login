import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import IdentityProviderList from "../src/IdentityProviderList";

describe("IdentityProviderList", () => {
  it("muestra loading mientras carga", () => {
    render(<IdentityProviderList variant="button" redirectPath="/redirect" />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("muestra error si falla el fetch", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() =>
        Promise.resolve({
          ok: false,
          json: () => Promise.resolve([]),
        })
      ) as any
    );

    render(<IdentityProviderList variant="button" redirectPath="/redirect" />);

    await waitFor(() => {
      expect(
        screen.getByText(/Error al cargar proveedores/i)
      ).toBeInTheDocument();
    });
  });

  it("renderiza lista de proveedores si la carga es exitosa", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve([
              { is: "google", name: "Google", image: "https://logo.com/g.png" },
            ]),
        })
      ) as any
    );

    render(
      <IdentityProviderList variant="container" redirectPath="/redirect" />
    );

    await waitFor(() => {
      expect(screen.getByText(/Continuar con Google/)).toBeInTheDocument();
    });
  });
});
