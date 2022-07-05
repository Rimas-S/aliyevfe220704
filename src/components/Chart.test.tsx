import { render, screen, fireEvent } from "@testing-library/react";
import Chart from "./Chart";

describe("Chart", () => {
  it("button on click should change the initial number to random number", () => {
    render(<Chart />);
    const button = screen.getByRole("button", { name: "Click me" });
    const initialValue0 = Number(screen.getByTestId("0").textContent);
    const initialValue1 = Number(screen.getByTestId("1").textContent);
    const initialValue2 = Number(screen.getByTestId("2").textContent);
    const initialValue3 = Number(screen.getByTestId("3").textContent);
    expect(initialValue0).toEqual(7.4);
    expect(initialValue1).toEqual(0.2);
    expect(initialValue2).toEqual(7);
    expect(initialValue3).toEqual(3.8);
    fireEvent.click(button);
    const value0 = Number(screen.getByTestId("0").textContent);
    const value1 = Number(screen.getByTestId("1").textContent);
    const value2 = Number(screen.getByTestId("2").textContent);
    const value3 = Number(screen.getByTestId("3").textContent);
    expect(value0).not.toEqual(7.4);
    expect(value1).not.toEqual(0.2);
    expect(value2).not.toEqual(7);
    expect(value3).not.toEqual(3.8);
  });

  jest.useFakeTimers();
  jest.spyOn(global, "setInterval");
  it("cheking setInterval", () => {
    render(<Chart />);
    expect(setInterval).toHaveBeenCalledTimes(1);
  });
});
