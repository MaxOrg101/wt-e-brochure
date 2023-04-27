import React, { useEffect, useRef, useState } from "react";
import * as XLSX from "xlsx";
import ChooseTemplate from "./ChooseTemplate/ChooseTemplate";
import { EventData } from "@/components/templates/types";
import { get_data, post_data } from "@/api/data";

const Create = () => {
  const [file, setFile] = useState<File | null>();
  const [data_from_api, set_data_from_api] = useState<
    { title: string; data: string }[]
  >([]);
  const [data, setData] = useState<EventData>();
  const file_ref = useRef<HTMLInputElement>(null);

  const fetch_data = async () => {
    const d = await get_data();
    set_data_from_api(d.data.payload);
  };
  useEffect(() => {
    fetch_data();
  }, []);
  return (
    <div className="m-5">
      <h2 className="text-5xl">Create E Brochure</h2>
      <div className="my-4"></div>
      <button
        className="bg-green-600 rounded-2xl text-white p-2 mr-4"
        onClick={() => file_ref.current?.click()}
      >
        Select Excel
      </button>
      <input
        className="hidden"
        ref={file_ref}
        type="file"
        name="Excel"
        id="event-data"
        onChange={(e) => {
          setFile(e.target.files?.item(0));
          const _file = e.target.files?.item(0);
          if (!_file) {
            console.log("no file");
            return;
          }
          var reader = new FileReader();

          reader.onload = function (e: any) {
            var data = e.target.result;
            var workbook = XLSX.read(data, {
              type: "binary",
            });

            workbook.SheetNames.forEach(function (sheetName) {
              // Here is your object
              var XL_row_object = XLSX.utils.sheet_to_json(
                workbook.Sheets[sheetName]
              );
              const _data = XL_row_object as EventData[];
              const str_data = JSON.stringify(_data);
              localStorage.setItem("data", str_data);
              post_data(_file.name, str_data);
              setData(_data[0]);
            });
          };

          reader.onerror = function (ex) {
            console.log(ex);
          };

          reader.readAsBinaryString(_file);
        }}
      />
      <div className="my-4">
        <h2 className="text-3xl">Choose Data</h2>
        <div className="flex flex-wrap py-4">
          {data_from_api.map((e, idx) => (
            <h3
              onClick={() => {
                localStorage.setItem("data", e.data);
                setData(JSON.parse(e.data)[0]);
              }}
              key={idx}
            >
              {e.title}
            </h3>
          ))}
        </div>
      </div>
      {data && <ChooseTemplate data={data} />}
    </div>
  );
};

export default Create;
