import { Chart, LinearScale, PointElement } from "chart.js";
import { Bubble } from "react-chartjs-2";

Chart.register(LinearScale);
Chart.register(PointElement);

const options = {};

const data = {
  datasets: [
    {
      label: "Red dataset",
      data: Array.from({ length: 50 }, () => ({
        x: 30,
        y: 20,
        r: 15,
      })),
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Blue dataset",
      data: Array.from({ length: 50 }, () => ({
        x: 25,
        y: 10,
        r: 10,
      })),
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
    {
      label: "Green dataset",
      data: Array.from({ length: 50 }, () => ({
        x: 5,
        y: 30,
        r: 10,
      })),
      backgroundColor: "rgba(99, 255, 132, 0.5)",
    },
    {
      label: "Yellow dataset",
      data: Array.from({ length: 50 }, () => ({
        x: 50,
        y: 20,
        r: 15,
      })),
      backgroundColor: "rgba(32, 180, 235, 0.5)",
    },
  ],
};

export function BubbleChart() {
  return <Bubble data={data} options={options} />
}