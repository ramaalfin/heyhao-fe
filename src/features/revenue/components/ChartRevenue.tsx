import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Filler,
  TooltipItem,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { faker } from "@faker-js/faker";
import { useMemo } from "react";

ChartJS.register(
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Filler,
);

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: labels.map(() => faker.finance.amount({ min: 0, max: 1000 })),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Dataset 2",
      data: labels.map(() => faker.finance.amount({ min: -1000, max: 1000 })),
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

export default function ChartRevenue() {
  const data = {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        label: "My First Dataset",
        data: [300, 50, 100],
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#36A2EB",
          "#FFCE56",
          "#FF6384",
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#36A2EB",
          "#FFCE56",
          "#FF6384",
        ],
      },
    ],
  };

  const options = useMemo(() => {
    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          callbacks: {
            label: function (tooltipItem: TooltipItem<"line">) {
              return `Rp ${(tooltipItem.raw as number).toLocaleString()}`;
            },
          },
          backgroundColor: "#165DFF",
          titleFont: { size: 14 },
          bodyFont: { size: 14 },
          displayColors: false,
          padding: 8,
          yAlign: "bottom" as const,
        },
      },
      scales: {
        x: {
          grid: {
            display: false,
          },
          ticks: {
            color: "#080C1A",
          },
          padding: 20,
        },
        y: {
          beginAtZero: true,
          grid: {
            color: "transparent",
          },
          ticks: {
            stepSize: 100,
            callback: function (value: string | number) {
              return `Rp ${Number(value).toLocaleString()}`;
            },
            color: "#617686",
            padding: 20,
          },
        },
      },
      elements: {
        line: {
          fill: true,
          borderColor: "#165DFF",
          tension: 0.3,
        },
        point: {
          backgroundColor: "#FFFFFF",
          borderColor: "#165DFF",
          radius: 9,
          borderWidth: 2,
        },
      },
    };
  }, []);

  return (
    <div
      id="Total-Revenue"
      className="flex flex-col rounded-2xl border border-heyhao-border p-6 gap-6 bg-white"
    >
      <div className="flex items-center justify-between gap-6">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-[6px]">
            <img
              src="/assets/images/icons/dollar-circle-yellow-opacity.svg"
              className="flex size-11 shrink-0"
              alt="icon"
            />
            <p className="font-medium text-heyhao-secondary">Total Revenue</p>
          </div>
          <p className="font-bold text-[32px] leading-10">Rp320.500.000</p>
        </div>
        <button className="flex items-center rounded-3xl border-[1.5px] border-heyhao-border py-3 px-4 gap-1 bg-heyhao-blue/10">
          <img
            src="/assets/images/icons/calendar-2-blue.svg"
            className="flex size-6 shrink-0"
            alt="icon"
          />
          <p className="font-medium text-sm text-heyhao-blue">Last 8 Month</p>
        </button>
      </div>
      <div>
        {/* <canvas id="revenueChart" height="306px"> */}
        <Line options={options} data={data} />
        {/* </canvas> */}
      </div>
    </div>
  );
}
