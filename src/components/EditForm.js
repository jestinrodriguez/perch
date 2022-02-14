import * as React from "react";
import { useState } from "react";

import TableCell from "@mui/material/TableCell";

import Button from "@mui/material/Button";

import Input from "@mui/material/Input";

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
      <TableCell align='center'>
        <Button
          variant='contained'
          style={{ backgroundColor: "rgb(206, 147, 216)" }}
          onClick={(e) => {
            handleSave(e);
          }}
        >
          Save
        </Button>
        <Button
          variant='contained'
          onClick={(e) => handleCancel(e)}
          style={{ backgroundColor: "#00c1ff", color: "white" }}
        >
          Cancel
        </Button>
      </TableCell>
    </>
  );
};

export default EditForm;
