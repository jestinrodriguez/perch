import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { data } from "../data/structure";
import { useState, useEffect } from "react";

const fromData = (data, idx) => {
  // console.log(data[0]);

  const currData = data[0][idx];

  return (
    <>
      {data[0][idx].tiers.map((item, idx) => (
        <>
          <TableCell align='center'>{currData.tiers[idx].from}</TableCell>
          <TableCell align='center'>{currData.tiers[idx].rate}</TableCell>
        </>
      ))}
    </>
  );
};

const levelNums = (data) => {
  console.log(data);
  return (
    <>
      {data[0].map((item, idx) => (
        <TableRow key={idx}>
          <TableCell align='center'>{`Level ${idx + 1}`}</TableCell>
          {fromData(data, idx)}
        </TableRow>
      ))}
    </>
  );
};

// const tierNums = (data) => {
//   function getMostTiers() {
//     let longest = 0;
//     let tier;
//     data.levels.forEach(function (item, idx) {
//       if (item.tiers.length > longest) {
//         longest = item.tiers.length;
//         tier = item.tiers;
//       }
//     });
//     console.log(longest, tier);
//   }

//   return (
//     <>
//       {data[0].map((item, i) => (
//         <TableCell key={i} colSpan={2} align='center'>
//           {`Tier ${i + 1}`}
//         </TableCell>
//       ))}
//     </>
//   );
// };

const fromName = (data) => {
  return (
    <>
      {data[0].map((item, i) => (
        <>
          <TableCell align='center'>FROM</TableCell>
          <TableCell align='center'>RATE</TableCell>
        </>
      ))}
    </>
  );
};

export default function BasicTable({ dataFromForm }) {
  const [obtainedData, setObtainedData] = useState([dataFromForm.levels]);

  const [tierLength, setTierLength] = useState([]);

  useEffect(() => {
    setObtainedData([dataFromForm.levels]);
    setTierLength(tierNums());
  }, [dataFromForm]);

  const test = () => {
    console.log(tierLength);
  };

  // useEffect(() => {
  //   const tierNums = (tierLength, setTierLength) => {
  //     function getMostTiers(tierLength, setTierLength) {
  //       let longest = 0;
  //       let tier;
  //       formData.levels.forEach(function (item, idx) {
  //         if (item.tiers.length > longest) {
  //           longest = item.tiers.length;
  //           tier = item.tiers;
  //         }
  //       });
  //       setTierLength(tier);
  //       console.log(tierLength);
  //     }
  //   };
  // }, [formData, tierLength]);

  const tierNums = () => {
    let longest = 0;
    let tier;
    dataFromForm.levels.forEach(function (item, idx) {
      if (item.tiers.length > longest) {
        longest = item.tiers.length;
        tier = item.tiers;
      }
    });
    return tier;
  };

  return (
    <>
      {/* <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell rowSpan={3} align='center'>
                LEVELS
              </TableCell>
              <TableCell align='center' colSpan={100}>
                TIERS
              </TableCell>
            </TableRow>

            <TableRow> {tierNums(tierLength, setTierLength)}</TableRow>
            <TableRow>{fromName(currData)}</TableRow>
          </TableHead>
          <TableBody>{levelNums(currData)}</TableBody>
        </Table>
      </TableContainer> */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell rowSpan={3} align='center'>
                LEVELS
              </TableCell>
              <TableCell align='center' colSpan={100}>
                TIERS
              </TableCell>
            </TableRow>
            <TableRow>
              {tierLength.map((item, idx) => (
                <TableCell key={idx} colSpan={2} align='center'>
                  {`Tier ${idx + 1}`}
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              {tierLength.map((item, idx) => (
                <>
                  <TableCell align='center'>FROM</TableCell>
                  <TableCell align='center'>RATE</TableCell>
                </>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>{levelNums(obtainedData)}</TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
