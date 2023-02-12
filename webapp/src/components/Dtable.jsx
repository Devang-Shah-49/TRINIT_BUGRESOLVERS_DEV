import React, { useState, useEffect } from "react";
import { CsvToHtmlTable } from "react-csv-to-table";
import Papa from "papaparse";

export default function Dtable() {
  // const [parsedCsvData, setParsedCsvData] = useState([]);

  // useEffect(() => {
  //   async function getData() {
  //     const response = await fetch("../src/assets/test.csv");
  //     const reader = response.body.getReader();
  //     const result = await reader.read(); // raw array
  //     const decoder = new TextDecoder("utf-8");
  //     const csv = decoder.decode(result.value); // the csv text
  //     const results = Papa.parse(csv, { header: true }); // object with { data, errors, meta }
  //     const rows = results.data; // array of objects
  //     console.log(rows);
  //     const columns = Object.keys(rows[0]);
  //     console.log(columns);
  //     for (let i=0; i<rows.length();i++){
  //     for (const [key, value] of Object.entries(rows[i])) {
  //       console.log(`${key}: ${value}`);
  //     }}
  //     setParsedCsvData(rows);
  //   }
  //   getData();
  // }, []);

//   function Table({ columns, data }) {
//     // Use the state and functions returned from useTable to build your UI
//     const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
//       useTable({
//         columns,
//         data,
//       });

//     // Render the UI for your table
//     return (
//       <table {...getTableProps()}>
//         <thead>
//           {headerGroups.map((headerGroup) => (
//             <tr {...headerGroup.getHeaderGroupProps()}>
//               {headerGroup.headers.map((column) => (
//                 <th {...column.getHeaderProps()}>{column.render("Header")}</th>
//               ))}
//             </tr>
//           ))}
//         </thead>
//         <tbody {...getTableBodyProps()}>
//           {rows.map((row, i) => {
//             prepareRow(row);
//             return (
//               <tr {...row.getRowProps()}>
//                 {row.cells.map((cell) => {
//                   return (
//                     <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
//                   );
//                 })}
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     );
//   }

  return (
    <div>
      <table>
        <thead>
                <tr>
                    <th>OBID</th>
                    <th>Test 1</th>
                    <th>Test 2</th>
                    <th>Test 3</th>
                    </tr>
                </thead>
        <tbody>
          {/* {rows.map((item) => {
            return (
              <tr key={item.password}>
                <td>{item.firstname}</td>
                <td>{item.lastname}</td>
                <td>{item.password}</td>
                <td>{item.email}</td>
              </tr>
            );
          })} */}
          <tr>
            <td>4</td>
            <td>1</td>
            <td>3</td>
            <td>28</td>
          </tr>
          <tr>
            <td>2</td>
            <td>2</td>
            <td>1</td>
            <td>22</td>
          </tr>
          <tr>
            <td>7</td>
            <td>3</td>
            <td>2</td>
            <td>64</td>
          </tr>
        </tbody>
      </table>
      {/* <CsvToHtmlTable data={parsedCsvData} csvDelimiter="," tableClassName="table table-striped table-hover"/> */}
    </div>
  );
}
