import { useContext, useEffect, useState } from "react";
import { axiosClient } from "../axios";
import { appContext } from "../context";

export default function FileUpload() {
  const [file, setFile] = useState(null);
  const [columnCount, setColumnCount] = useState(0);
  const [dataType, setDataType] = useState([]);
  const [success, setSuccess] = useState(false);
  const { user } = useContext(appContext);

  useEffect(() => {
    setDataType(
      Array.from(
        {
          length: columnCount,
        },
        (_, __) => ""
      )
    );
  }, [columnCount]);

  if (success) {
    return (
      <div className="flex items-center justify-center w-[60%] mr-auto ml-auto">
        File Uploaded Successfully
      </div>
    )
  }

  if (user === null) {
    return (
      <div className="flex items-center justify-center w-[60%] mr-auto ml-auto">
        <h1>Please sign in</h1>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center w-[60%] mr-auto ml-auto">
      {file === null ? (
        <>
          <label
            for="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg- hover:bg-gray-100 dark:border-indigo-600 dark:bg-indigo-600 dark:hover:border-indigo-700 dark:hover:bg-indigo-700"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                aria-hidden="true"
                class="w-10 h-10 mb-3 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                ></path>
              </svg>
              <p className="mb-2 text-sm text-white dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-white dark:text-gray-400">CSV Files</p>
            </div>
          </label>
        </>
      ) : (
        <div className="flex-col">
          <div className="w-full p-4 bg-indigo-600 text-white shadow-md lg:max-w-lg border-r-[50%]">
            <div className="space-y-2">
              <h3 className="text-2xl text-center font-semibold">
                {file.name}
              </h3>
            </div>
          </div>
          <div>
            <label>Column Count</label>
            <input
              type="number"
              value={columnCount}
              className="relative block w-full border rounded-md my-4 border-gray-300 px-3 py-3 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              onChange={(e) => {
                if (e.target.value >= 0) {
                  setColumnCount(e.target.value);
                }
              }}
            />
          </div>
          <div>
            {dataType.map((type, i) => (
              <div key={i}>
                <label>Data type for column #{i + 1}</label>
                <input
                  type="string"
                  value={type}
                  className="relative block w-full border rounded-md my-4 border-gray-300 px-3 py-3 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  onChange={(e) => {
                    setDataType((types) => {
                      const n = [...types];
                      n[i] = e.target.value;
                      return n;
                    });
                  }}
                />
              </div>
            ))}
          </div>
          <button
            onClick={() => setFile(null)}
            className="mt-3 ml-auto mr-auto inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
          >
            Pick up different file
          </button>
          <button
            onClick={async (e) => {
              e.preventDefault();
              const formData = new FormData();
              formData.append("userid", user._id["$oid"]);
              formData.append("data", file);
              formData.append("datatype", dataType.join(","));
              await axiosClient.post("/cluster/data", formData);
              setFile(null);
              setColumnCount(0);
              setSuccess(true)
            }}
            className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
          >
            Submit
          </button>
        </div>
      )}
      <input
        id="dropzone-file"
        onChange={(e) => {
          if (e.target.files[0].name.split(".").includes("csv")) {
            setFile(e.target.files[0]);
          }
        }}
        type="file"
        className="hidden"
      />
    </div>
  );
}
