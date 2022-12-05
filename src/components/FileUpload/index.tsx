import React, { useEffect, useState } from "react";
import "./style.css";
import { DataChart } from "../../App";

type FileType = {
  lastModifiedDate: Date;
  name: string;
};

interface FileUploadProps {
  label: string;
  setData: React.Dispatch<React.SetStateAction<DataChart>>;
}
export function FileUpload({ setData, label }: FileUploadProps) {
  const [selectedFile, setSelectedFile] = useState<FileType>({} as FileType);
  const [text, setText] = useState("");
  const [isSelected, setIsSelected] = useState<Boolean>(false);

  useEffect(() => {
    console.log(text);
    console.log(selectedFile);
    const array = text
      .split(/\r?\n/)
      .map((a) => Number(a))
      .filter((a) => a !== 0);
    setData((prevState) => ({
      ...prevState,
      label: selectedFile.name,
      data: array,
    }));
    console.log(array);
  }, [text]);

  const changeHandler = (event: any) => {
    event.preventDefault();
    console.log(event.target?.result);
    const reader = new FileReader();
    reader.onload = async (event) => {
      const text = event.target?.result?.toString() || "";
      setText(text);
    };
    reader.readAsText(event.target.files[0]);
    setSelectedFile(event.target.files[0]);

    console.log(event.target.files[0]);
    setIsSelected(true);
  };

  return (
    <div
      className={`container ${
        label === "Java" ? "pink-border" : "blue-border"
      } `}
    >
      <input type="file" name="file" onChange={changeHandler} />
      {isSelected ? (
        <div>
          <p>{selectedFile.name}</p>
          <p>
            Simulado em {selectedFile.lastModifiedDate.toLocaleDateString()}
            {" às "}
            {selectedFile.lastModifiedDate.toLocaleTimeString()}
          </p>
        </div>
      ) : (
        <p>Selecione o arquivo do resultado em {label}</p>
      )}
    </div>
  );
}
