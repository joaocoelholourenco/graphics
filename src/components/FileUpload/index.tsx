import React, { useEffect, useState } from "react";
import "./style.css";
import { DataChart } from "../../App";
import Papa from "papaparse";

type FileType = {
  lastModifiedDate: Date;
  name: string;
};

interface FileUploadProps {
  data: DataChart[];
  multipleOptions: Boolean;
  setData: React.Dispatch<React.SetStateAction<DataChart[]>>;
}
export function FileUpload({
  setData,
  multipleOptions,
  data,
}: FileUploadProps) {
  const [selectedFile, setSelectedFile] = useState<FileType>({} as FileType);
  const [parsedData, setParsedData] = useState([]);
  const [isSelected, setIsSelected] = useState<Boolean>(false);

  useEffect(() => {
    if (!parsedData.length) return;
    const columns = Object.keys(parsedData[0]);

    console.log(parsedData);

    const arrayDataColumns: any = [];

    for (let index = 0; index < columns.length; index++) {
      let array = parsedData.map((obj: any, idx) => obj[columns[index]]);

      arrayDataColumns.push(array);
    }

    console.log(columns);
    console.log(arrayDataColumns);

    const dataFormated: any = columns.map((column, idx) => {
      const label = column.charAt(0).toUpperCase() + column.slice(1);

      return { label, data: arrayDataColumns[idx] };
    });

    console.log(dataFormated);

    if (data.length === 1) {
      setData([data[0], dataFormated[0]]);
    } else {
      setData(dataFormated);
    }

    // setData(dataFormated);
  }, [parsedData]);

  function removeFile() {
    setIsSelected(false);
    setData([]);
  }

  useEffect(() => {
    removeFile();
  }, [multipleOptions]);

  const changeHandler = (event: any) => {
    setSelectedFile(event.target.files[0]);

    setIsSelected(true);

    // Passing file data (event.target.files[0]) to parse using Papa.parse
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results: any) {
        const rowsArray = [];

        // Iterating data to get column name and their values
        results.data.map((d: any, idx: number) => {
          if (idx === 0) {
            rowsArray.push(Object.keys(d));
          }
          rowsArray.push(Object.values(d));
        });

        // Parsed Data Response in array format
        setParsedData(results.data);

        // Filtered Column Names
        // setTableRows(rowsArray[0]);

        // Filtered Values
        // setValues(valuesArray);
      },
    });
  };

  // const changeHandler = (event: any) => {
  //   event.preventDefault();

  //   const reader = new FileReader();
  //   reader.onload = async (event) => {
  //     const text = event.target?.result?.toString() || "";
  //     setDataResponse(text);
  //   };
  //   reader.readAsText(event.target.files[0]);
  //   setSelectedFile(event.target.files[0]);

  //   console.log(event.target.files[0]);
  //   setIsSelected(true);
  // };

  return (
    <div className={`container ${isSelected ? "white-border" : ""} `}>
      {isSelected ? (
        <div>
          <p>{selectedFile.name}</p>
          <p>
            Simulado em {selectedFile.lastModifiedDate.toLocaleDateString()}
            {" às "}
            {selectedFile.lastModifiedDate.toLocaleTimeString()}
          </p>
          <button onClick={removeFile}>Remover</button>
        </div>
      ) : (
        <>
          <input
            type="file"
            accept=".csv"
            name="file"
            onChange={changeHandler}
          />
          <p>Selecione o arquivo de um dos resultado</p>
        </>
      )}
    </div>
  );
}
