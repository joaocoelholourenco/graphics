import { useMemo, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { LineChart } from "./components/LineChart";
import { FileUpload } from "./components/FileUpload";
import { TestT } from "./styles";

export type DataChart = {
  label: string;
  data: number[];
  borderColor: string;
  backgroundColor: string;
};

type CalculatedDataType = {
  media: number;
  variancia: number;
  desvioPadrao: number;
  label: string;
  data: number[];
}[];

function App() {
  const [multipleOptions, setMultipleOptions] = useState<Boolean>(false);

  const [dataGraph, setDataGraph] = useState<Array<DataChart>>(
    [] as Array<DataChart>
  );

  const calculatedData = useMemo<CalculatedDataType>(() => {
    if (!dataGraph) return {} as CalculatedDataType;
    return dataGraph.map((arrays) => {
      const total = arrays.data.length;
      const soma = Number(
        arrays.data.reduce((soma, i) => Number(i) + Number(soma)).toFixed(3)
      );

      const media = parseFloat((soma / total).toFixed(3));

      console.log(arrays.data);
      console.log("soma ", soma);

      const somaMediaAritimetica: number = arrays.data.reduce(
        (soma, i, idx) => {
          let a;

          if (idx === 1) {
            a = soma - media;

            return Math.pow(a, 2) + Math.pow(i - media, 2);
          } else {
            a = i - media;
          }

          console.log("soma", soma);
          console.log("i", i);
          console.log("a", a);
          return Math.pow(a, 2) + Number(soma);
        }
      );

      console.log("somaMediaAritimetica ", somaMediaAritimetica);

      const variancia = somaMediaAritimetica / (total - 1);

      return {
        media: Number(media.toFixed(3)),
        variancia: Number(variancia.toFixed(3)),
        desvioPadrao: Number(Math.sqrt(variancia).toFixed(3)),
        label: arrays.label,
        data: arrays.data,
      };
    });
  }, [dataGraph]);

  const testT = useMemo(() => {
    if (!calculatedData.length) return;
    const subtracaoMedia = calculatedData.reduce(
      (t, { media }) => media - t,
      0
    );
    const quadradoDesvio = calculatedData.map(
      ({ desvioPadrao, data }) => Math.pow(desvioPadrao, 2) / data.length
    );

    const resultado =
      subtracaoMedia / Math.sqrt(quadradoDesvio.reduce((t, i) => t + i));

    return resultado.toFixed(3);
  }, [calculatedData]);

  return (
    <div>
      <h1>Java vs C</h1>
      <div>
        <LineChart data={dataGraph} />
      </div>
      <div>
        <input
          type="checkbox"
          name="Upar arquivos separados"
          id="upload"
          onChange={() => {
            setMultipleOptions(!multipleOptions);
          }}
        />
        <span>Upar arquivos separados</span>
      </div>
      {!multipleOptions ? (
        <div className="container-upload">
          <FileUpload
            multipleOptions={multipleOptions}
            setData={setDataGraph}
            data={dataGraph}
          />
        </div>
      ) : (
        <div className="container-upload">
          <FileUpload
            multipleOptions={multipleOptions}
            setData={setDataGraph}
            data={dataGraph}
          />
          <FileUpload
            multipleOptions={multipleOptions}
            setData={setDataGraph}
            data={dataGraph}
          />
        </div>
      )}
      <h2>Test-t</h2>
      <TestT>
        <div>
          <div>
            <h3>Media</h3>
            {calculatedData?.map(({ media, label }) => (
              <div>
                <strong>{label}</strong>
                <span>{media}</span>
              </div>
            ))}
          </div>

          <div>
            <h3>Variância</h3>
            {calculatedData?.map(({ variancia, label }) => (
              <div>
                <strong>{label}</strong>
                <span>{variancia}</span>
              </div>
            ))}
          </div>
          <div>
            <h3>Desvio Padrão</h3>

            {calculatedData?.map(({ desvioPadrao, label }) => (
              <div>
                <strong>{label}</strong>
                <span>{desvioPadrao}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div>
            <h3>Resultado teste-t</h3>
            <span>{testT}</span>
          </div>
        </div>
      </TestT>
      <h2>Resultados Pareados</h2>
      {dataGraph?.length ? (
        <div>
          <p>
            {dataGraph[0].label} - {dataGraph[1]?.label}
          </p>
          {dataGraph[0]?.data?.map((value, idx) => (
            <p key={value}>
              {value} - {dataGraph[1]?.data[idx]}
            </p>
          ))}
        </div>
      ) : (
        <div>
          <p>Selecione arquivos dos resultados</p>
        </div>
      )}
    </div>
  );
}

export default App;
