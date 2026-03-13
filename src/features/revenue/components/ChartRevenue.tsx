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

interface Props {
  transactionsPerMonths: Record<string, number>;
}

export default function ChartRevenue({ transactionsPerMonths }: Props) {
  const data2 = {
    labels: Object.keys(transactionsPerMonths),
    datasets: [
      {
        label: "Revenue",
        data: Object.values(transactionsPerMonths),
        backgroundColor: "#FFFFFF",
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
              return `Rp ${(tooltipItem.raw as number).toLocaleString(
                "id-ID",
              )}`;
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
            callback: function (value: string | number) {
              return `Rp ${Number(value).toLocaleString("id-ID")}`;
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
          <p className="font-bold text-[32px] leading-10">
            Rp{" "}
            {Object.values(transactionsPerMonths)
              .reduce((acc, curr) => acc + curr, 0)
              .toLocaleString("id-ID")}
          </p>
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
        <Line options={options} data={data2} />
        {/* </canvas> */}
      </div>
    </div>
  );
}
