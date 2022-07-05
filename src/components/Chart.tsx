import React, { useEffect, useState } from "react";

import "../styles/Chart.css";

interface InputRow {
  name: string;
  time: number;
  interval?: number;
}

const Chart = () => {
  const [initialInput, setInitialInput] = useState<InputRow[]>([
    { name: "Landing Page", time: 7.4 },
    { name: "Configurator", time: 0.2 },
    { name: "Check-out", time: 7.0 },
    { name: "Deal", time: 3.8 },
  ]);
  const SECONDS = 30000;

  // Function to calculate total time spended
  const total = (arr: InputRow[]): number => {
    let total = 0;
    for (let i = 0; i < arr.length; i++) {
      arr[i] = { ...arr[i], interval: total };
      total = total + arr[i].time;
    }
    return Math.round(total * 100) / 100;
  };

  let totalTime = total(initialInput);

  // getting div width for making responsive chart
  const inputEl = React.useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number | undefined>();

  const getDivSize = () => {
    const newWidth = inputEl.current?.clientWidth;
    setWidth(newWidth);
  };

  useEffect(() => {
    getDivSize();
    window.addEventListener("resize", getDivSize);
  }, []);

  // Handler to reset random time values on click or on assigned time
  const resetHandler = () => {
    const newInput = initialInput.map((elm) => ({
      name: elm.name,
      time: (Math.floor(Math.random() * 100) + 1) / 10,
    }));

    setInitialInput(newInput);
  };

  // Refresh times every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      resetHandler();
    }, SECONDS);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="chart">
      <h1>SPENT TIME (SECONDS)</h1>
      {initialInput.map((element: InputRow, index: number) => {
        return (
          <div className="container" key={index}>
            <div className="name">{element.name}</div>

            <div className="time-container" ref={inputEl}>
              <div
                data-testid={index}
                className="time"
                style={{
                  width: width ? width * (element.time / totalTime) : 0,
                  left: width ? width * (element.interval! / totalTime) : 0,
                }}
              >
                <p>{element.time}</p>
              </div>
            </div>
          </div>
        );
      })}
      <div id="btn">
        <button onClick={resetHandler}>Click me</button>
      </div>
    </div>
  );
};

export default Chart;
