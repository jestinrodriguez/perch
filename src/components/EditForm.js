import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";

import Input from "@mui/material/Input";

const EditForm = ({ item }) => {
  //   console.log(item);

  return (
    <>
      <TableCell>
        <Input value={item.from}></Input>
      </TableCell>
      <TableCell>
        <Input value={item.rate}></Input>
      </TableCell>
      <TableCell>
        <button>Save</button>
        <button>Cancel</button>
      </TableCell>
    </>
  );
};

export default EditForm;
