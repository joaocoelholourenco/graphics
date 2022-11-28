import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { LineChart } from "./components/LineChart";
import { FileUpload } from "./components/FileUpload";

export type DataChart = {
  label: string;
  data: number[];
  borderColor: string;
  backgroundColor: string;
};

function App() {
  const [javaData, setJavaData] = useState<DataChart>({
    label: "Java",
    borderColor: "rgb(255, 99, 132)",
    backgroundColor: "rgba(255, 99, 132, 0.5)",
  } as DataChart);
  const [cData, setCData] = useState<DataChart>({
    label: "C",
    borderColor: "rgb(53, 162, 235)",
    backgroundColor: "rgba(53, 162, 235, 0.5)",
  } as DataChart);
  return (
    <div>
      <h1>Java vs C</h1>
      <div>
        <LineChart data={[javaData, cData]} />
      </div>
      <div className="uploads-container">
        <FileUpload label="Java" setData={setJavaData} />
        <FileUpload label="C" setData={setCData} />
      </div>
      <h1>Test-t</h1>
      <h1>Resultados Pareados</h1>

      <div>
        {javaData.data && cData.data.length ? (
          <div>
            <p>Java - C</p>
            {javaData.data.map((value, idx) => (
              <p>
                {value} - {cData.data[idx]}
              </p>
            ))}
          </div>
        ) : (
          <div>
            <p>Selecione os dois arquivos txt dos resultados</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
