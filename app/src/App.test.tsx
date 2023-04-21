import { it, describe, expect, beforeAll } from "vitest";
import { act, render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  beforeAll(() => {
    global.fetch = (info: RequestInfo | URL, init?: RequestInit) => {
      return Promise.resolve({
        json: () =>
          Promise.resolve({
            hello: "world",
          }),
      } as any);
    };
  });

  it("component can render", async () => {
    render(<App></App>);

    const app = screen.getByTestId("App");

    await act(async () => {
      await wait(50); // Wait for useEffect to fire.
    });

    expect(app).toBeDefined();
  });
});

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
