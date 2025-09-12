import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  type ChartOptions,
  type ChartData,
} from "chart.js";
import { useMemo } from "react";
import { Line } from "react-chartjs-2";

ChartJS.register(
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title
);

type optionProps = ChartOptions<"line">;
type dataProps = ChartData<"line">;

export default function ChartRevenue() {
  const data: dataProps = useMemo(
    () => ({
      labels: ["Mar", "Jun", "Jul", "Aug", "Sep", "Nov", "Dec"],
      datasets: [
        {
          label: "Revenue",
          data: [
            4000000, 6000000, 5000000, 10250000, 8000000, 9000000, 10000000,
          ],
        },
      ],
    }),
    []
  );

  const options: optionProps = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false, // Hide legend
        },
        tooltip: {
          callbacks: {
            label: function (tooltipItem) {
              return `Rp${(tooltipItem.raw as string).toLocaleString()}`;
            },
          },
          backgroundColor: "#165DFF",
          titleFont: { size: 14 },
          bodyFont: { size: 14 },
          displayColors: false,
          padding: 10,
          yAlign: "bottom",
        },
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { color: "#080C1A" },
          padding: 20,
        },
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 2000000,
            callback: function (value) {
              return `Rp${value.toLocaleString()}`;
            },
            color: "#6A7686",
            padding: 20,
          },
          grid: { color: "transparent" },
        },
      },
      elements: {
        line: {
          fill: true, // Enable gradient fill
          //   backgroundColor: gradient,
          borderColor: "#165DFF", // Line color
          tension: 0.3, // Smooth line
        },
        point: {
          backgroundColor: "#fff", // Point color
          borderColor: "#165DFF",
          borderWidth: 2,
          radius: 9,
        },
      },
    }),
    []
  );

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
        <Line data={data} options={options} />
      </div>
    </div>
  );
}
