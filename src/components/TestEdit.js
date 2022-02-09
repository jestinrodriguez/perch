import React, { useState, useEffect } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import Input from "@mui/material/Input";
const TestEdit = () => {
  const [showButton, setShowButton] = useState(false);
  const [showButtonIndex, setShowButtonIndex] = useState(null);
  const [names, setNames] = useState(["a", "b", "c"]);

  const handleEdit = (e) => {
    e.preventDefault();
    setShowButton(true);
    setShowButtonIndex(Number(e.target.id));
  };

  return (
    <div>
      <h2> Names: </h2>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
          </TableRow>
        </TableHead>
        {names.map((name, index) => {
          return (
            <tbody>
              <TableRow>
                <TableCell> {name} </TableCell>
                <TableCell>
                  <button
                    id={index}
                    type='button'
                    onClick={(e) => handleEdit(e)}
                  >
                    Edit
                  </button>
                </TableCell>
                {showButton && showButtonIndex === index && (
                  <div>I am being editted</div>
                )}

                <>
                  <TableRow>
                    <Input></Input>
                    <Input></Input>
                  </TableRow>
                </>
              </TableRow>
            </tbody>
          );
        })}
      </Table>
    </div>
  );
};

export default TestEdit;
