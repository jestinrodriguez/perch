import * as React from "react";
import { useState } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import { purple } from "@mui/material/colors";
import Input from "@mui/material/Input";
import styled from "styled-components";

const ColorButton = styled(Button)(({ theme }) => ({
  color: "purple",
  backgroundColor: purple[500],
  "&:hover": {
    backgroundColor: purple[700],
  },
}));

const EditForm = ({
  item,
  setIsEditting,
  setDataFromForm,
  dataFromForm,
  index,
  idx,
}) => {
  const [editFormData, setEditFormData] = useState(dataFromForm);

  const [deepDataCopy, setDeepDataCopy] = useState(
    JSON.parse(JSON.stringify(dataFromForm))
  );

  const handleSave = (e) => {
    e.preventDefault();
    setDataFromForm(editFormData);
    setIsEditting(false);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setIsEditting(false);
  };

  const handleOnChange = (e) => {
    e.preventDefault();
    let newData = { ...deepDataCopy };
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    newData.levels[index].tiers[idx][fieldName] = fieldValue;
    setEditFormData(newData);
  };

  return (
    <>
      <TableCell>
        <Input
          sx={{ width: "50px" }}
          defaultValue={item.from}
          onChange={(e) => handleOnChange(e)}
          name='from'
        ></Input>
      </TableCell>
      <TableCell>
        <Input
          sx={{ width: "50px" }}
          defaultValue={item.rate}
          onChange={(e) => handleOnChange(e)}
          name='rate'
        ></Input>
      </TableCell>
      <TableCell>
        <Button
          onClick={(e) => {
            handleSave(e);
          }}
        >
          Save
        </Button>
        <Button onClick={(e) => handleCancel(e)}>Cancel</Button>
      </TableCell>
    </>
  );
};

export default EditForm;
