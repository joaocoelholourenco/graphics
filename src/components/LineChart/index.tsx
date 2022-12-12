import React, { useEffect, useMemo, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { DataChart } from "../../App";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom" as const,
    },
  },
};

const labels = [
  "Rodada 1",
  "Rodada 2",
  "Rodada 3",
  "Rodada 4",
  "Rodada 5",
  "Rodada 6",
  "Rodada 7",
  "Rodada 8",
  "Rodada 9",
  "Rodada 10",
];

export let initialData = {
  labels,
  datasets: [
    {
      label: "Insira o arquivo de resuldado",
      data: [0],

      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Insira o arquivo de resuldado",
      data: [0],

      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

interface LineChartProps {
  data: DataChart[];
}

export function LineChart({ data }: LineChartProps) {
  const [dataChart, setDataChart] = useState(initialData);

  useMemo(() => {
    if (!data.length) {
      setDataChart(initialData);
      return;
    }
    setDataChart((prev) => ({
      ...prev,
      datasets: prev.datasets.map((dataset, idx) => {
        return { ...dataset, data: data[idx]?.data, label: data[idx]?.label };
      }),
      labels: data[0]?.data?.map((arr, idx) => "Rodada " + (idx + 1)),
    }));
  }, [data]);

  return <Line options={options} data={dataChart} height={450} width={750} />;
}
