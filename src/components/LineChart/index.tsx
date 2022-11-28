import React, { useEffect, useState } from "react";
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
      position: "top" as const,
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
      label: "Java",
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],

      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "C",
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
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

  useEffect(() => {
    setDataChart((prev) => ({
      ...prev,
      datasets: data,
      labels: data[0].data?.map((arr, idx) => idx.toString()),
    }));

    console.log(data);
  }, [data]);

  return <Line options={options} data={dataChart} height={450} width={750} />;
}
