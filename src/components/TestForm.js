import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";

import styled from "styled-components";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";

const initialValues = {
  levels: [],
};

const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#448ffb",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#448ffb",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#448ffb",
    },
    "&:hover fieldset": {
      borderColor: "white",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#448ffb",
    },
  },
});

const TestForm = ({
  dataFromForm,
  setDataFromForm,
  setDataLoaded,
  setIsCreating,
  setShowModal,
}) => {
  return (
    <div className='col-md-5'>
      <h1 style={{ color: "white", fontFamily: "Arial" }}>
        CREATE A COMPENSATION STRUCTURE
      </h1>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values) => {
          await new Promise((r) => setTimeout(r, 500));
          // alert(JSON.stringify(values, null, 2));
          // console.log(JSON.stringify(values, null, 2));

          console.log(JSON.stringify(values, null, 2));
          setIsCreating(true);
          setShowModal(false);
          setDataFromForm(values);
          setDataLoaded(true);
        }}
      >
        {({ values }) => (
          <Form>
            <div
              style={{
                width: "630px",
                height: "500px",
              }}
            >
              <div>
                <FieldArray name='levels'>
                  {({ insert, remove, push }) => (
                    <div style={{ alignItems: "center" }}>
                      <h1 style={{ color: "white", fontFamily: "Arial" }}>
                        ADD LEVEL {""}
                        <AddCircleIcon onClick={() => push({ tiers: [] })} />
                      </h1>
                      {/* <Button
                        type='button'
                        variant='contained'
                        className='secondary'
                        onClick={() => push({ tiers: [] })}
                      >
                        Add Levels
                      </Button> */}

                      <div
                        style={{
                          flexDirection: "column",
                        }}
                      >
                        {values.levels.length > 0 &&
                          values.levels.map((lvl, index) => (
                            <>
                              <div
                                style={{
                                  color: "#448ffb",
                                  fontFamily: "Arial",
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                {`LEVEL ${index + 1}`}
                                <DeleteIcon
                                  onClick={() => {
                                    remove(index);
                                  }}
                                />

                                {values.levels.length === index + 1 ? (
                                  <>
                                    <AddCircleIcon
                                      onClick={() => push({ tiers: [] })}
                                    />
                                  </>
                                ) : (
                                  ""
                                )}
                              </div>
                              <br />
                              <div className='row' key={index}></div>

                              <FieldArray name={`levels[${index}].tiers`}>
                                {({ insert, remove, push }) => (
                                  <div>
                                    {values.levels[index].tiers.length > 0 &&
                                      values.levels[index].tiers.map(
                                        (tier, idx) => (
                                          <>
                                            <div
                                              style={{
                                                color: "#448ffb",
                                                fontFamily: "Arial",
                                              }}
                                            >{`TIER ${idx + 1}`}</div>
                                            <div
                                              className='row'
                                              key={idx}
                                              style={{
                                                display: "flex",
                                                alignItems: "center",
                                              }}
                                            >
                                              <div className='col'>
                                                <label
                                                  htmlFor={`levels[${index}].tiers[${idx}].from`}
                                                ></label>
                                                <CssTextField
                                                  label='From'
                                                  name={`levels[${index}].tiers[${idx}].from`}
                                                  placeholder='0$'
                                                  type='text'
                                                />
                                              </div>
                                              <div className='col'>
                                                <label
                                                  htmlFor={`levels[${index}].tiers[${idx}].rate`}
                                                ></label>
                                                <CssTextField
                                                  label='Rate'
                                                  name={`levels[${index}].tiers[${idx}].rate`}
                                                  placeholder='15%'
                                                  type='text'
                                                />
                                              </div>
                                              <div className='col'>
                                                <DeleteIcon
                                                  style={{
                                                    cursor: "pointer",
                                                  }}
                                                  onClick={() => {
                                                    remove(idx);
                                                    console.log(tier);
                                                  }}
                                                />
                                                {values.levels[index].tiers
                                                  .length ===
                                                idx + 1 ? (
                                                  <>
                                                    <AddCircleIcon
                                                      style={{
                                                        cursor: "pointer",
                                                      }}
                                                      onClick={() =>
                                                        push({
                                                          from: "",
                                                          rate: "",
                                                        })
                                                      }
                                                    />
                                                  </>
                                                ) : (
                                                  ""
                                                )}
                                              </div>
                                            </div>
                                          </>
                                        )
                                      )}
                                    {/* <Button
                                      variant='contained'
                                      type='button'
                                      className='secondary'
                                      onClick={() =>
                                        push({ from: "", rate: "" })
                                      }
                                    >
                                      Add Tier
                                    </Button> */}
                                    ADD TIER
                                    <AddCircleIcon
                                      style={{
                                        cursor: "pointer",
                                      }}
                                      onClick={() =>
                                        push({
                                          from: "",
                                          rate: "",
                                        })
                                      }
                                    />
                                  </div>
                                )}
                              </FieldArray>
                            </>
                          ))}
                      </div>
                    </div>
                  )}
                </FieldArray>
              </div>

              {values.levels.length > 0 ? (
                <Button color='primary' variant='contained' type='submit'>
                  Submit
                </Button>
              ) : (
                ""
              )}

              <div>
                <pre style={{ fontSize: "100%", color: "white" }}>
                  {JSON.stringify(values, null, 2)}
                </pre>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default TestForm;
