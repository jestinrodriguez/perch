import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditForm from "./EditForm";
import Button from "@mui/material/Button";

const CompensationStructureTable = ({
  dataFromForm,
  setDataFromForm,
  setDataLoaded,
}) => {
  const [isEditting, setIsEditting] = useState(false);
  const [editIndex, setEditIndex] = useState(0);
  const [currLevel, setCurrLevel] = useState(0);

  //set new data when data from form updates
  useEffect(() => {
    setDataFromForm(dataFromForm);
  }, [dataFromForm]);

  // handles editing edit button is clicked
  const handleEditButton = (e, items, idx) => {
    setCurrLevel(Number(e.target.value));
    setEditIndex(Number(e.target.id));
    setIsEditting(true);
  };
  // handles tier deletion when delete button is clicked
  const handleDeleteTier = (index, idx) => {
    let newData = { ...dataFromForm };
    newData.levels[index].tiers.splice(idx, 1);
    setDataFromForm(newData);
  };
  // handles level deletion when delete button is clicked
  const handleDeleteLevel = (index) => {
    setIsEditting(false);
    let newData = { ...dataFromForm };
    newData.levels.splice(index, 1);
    setDataFromForm(newData);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell colSpan='2'>Compensation Structure</TableCell>
            <TableCell align='center'>Actions</TableCell>
            <TableCell align='center'>
              <Button
                color='secondary'
                variant='contained'
                onClick={() => setDataLoaded(false)}
              >
                Delete
              </Button>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataFromForm.levels.map((items, index) => {
            return (
              <>
                <TableRow>
                  <TableCell>{`Level ${index + 1}`}</TableCell>
                  <TableCell>
                    <Table>
                      {items.tiers.length > 0 ? (
                        <TableHead>
                          <TableCell>Tier</TableCell>
                          <TableCell>From</TableCell>
                          <TableCell>Rate</TableCell>
                          <TableCell align='center'>Actions</TableCell>
                        </TableHead>
                      ) : (
                        ""
                      )}
                      <TableBody>
                        {items.tiers.map((item, idx) => {
                          return (
                            <>
                              <TableRow>
                                <TableCell>{`Tier ${idx + 1}`}</TableCell>
                                {isEditting &&
                                dataFromForm.levels[currLevel].tiers[
                                  editIndex
                                ] === dataFromForm.levels[index].tiers[idx] ? (
                                  <>
                                    <EditForm
                                      item={item}
                                      setIsEditting={setIsEditting}
                                      setDataFromForm={setDataFromForm}
                                      dataFromForm={dataFromForm}
                                      index={index}
                                      idx={idx}
                                    />
                                  </>
                                ) : (
                                  <>
                                    <TableCell>{item.from}</TableCell>
                                    <TableCell>{item.rate}</TableCell>
                                    <TableCell align='center'>
                                      <Button
                                        id={idx}
                                        key={index}
                                        value={index}
                                        variant='contained'
                                        onClick={(e) =>
                                          handleEditButton(
                                            e,
                                            items,
                                            idx,
                                            index,
                                            item,
                                            dataFromForm
                                          )
                                        }
                                      >
                                        Edit
                                      </Button>
                                      <Button
                                        onClick={() =>
                                          handleDeleteTier(index, idx)
                                        }
                                        color='secondary'
                                        variant='contained'
                                      >
                                        Delete
                                      </Button>
                                    </TableCell>
                                  </>
                                )}
                              </TableRow>
                            </>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </TableCell>
                  <TableCell align='center'>
                    <Button
                      color='secondary'
                      variant='contained'
                      onClick={() => handleDeleteLevel(index)}
                    >
                      DELETE
                    </Button>
                  </TableCell>
                </TableRow>
              </>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CompensationStructureTable;
