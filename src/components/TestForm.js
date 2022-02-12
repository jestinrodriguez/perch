import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";

import styled from "styled-components";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";

import * as Yup from "yup";
const { object, string, number, date, array } = require("yup");

const initialValues = {
  levels: [],
};

const CssField = styled(Field)({
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

const TestForm = ({ setShowModal, setDataFromForm, setDataLoaded }) => {
  const handleSubmit = (values) => {
    // await new Promise((r) => {
    //   setTimeout(r, 100);
    // });

    setShowModal(false);
    setDataFromForm(values);
    setDataLoaded(true);
  };

  const validate = object().shape({
    levels: array().of(
      object().shape({
        tiers: array().of(
          object().shape({
            from: number()
              .required("Required")
              .positive("Must be a positive number"),
            rate: number()
              .required("Required")
              .min(1, "Please Enter a number between 1-100")
              .max(100, "Please Enter a number between 1-100"),
          })
        ),
      })
    ),
  });

  // let schema = Yup.object().shape({
  //   nested: Yup.object().shape({
  //     arr: Yup.array().of(Yup.object().shape({ num: number().max(4) })),
  //   }),
  // });

  return (
    <div className='container mt-3'>
      <h1 style={{ color: "white", fontFamily: "Arial", padding: "20px" }}>
        CREATE A COMPENSATION STRUCTURE
      </h1>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => handleSubmit(values)}
        validationSchema={validate}
      >
        {({ values }) => (
          <Form>
            <div
              style={{
                width: "630px",
                height: "500px",
              }}
            >
              <div style={{ paddingLeft: "40px" }}>
                <FieldArray name='levels'>
                  {({ insert, remove, push }) => (
                    <div style={{ alignItems: "center" }}>
                      {values.levels.length === 0 ? (
                        <h1 style={{ color: "#448ffb", fontFamily: "Arial" }}>
                          ADD LEVEL {""}
                          <AddCircleIcon onClick={() => push({ tiers: [] })} />
                        </h1>
                      ) : (
                        ""
                      )}

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
                            <div key={index}>
                              {console.log(lvl)}
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
                                      onClick={() =>
                                        push({
                                          tiers: [],
                                        })
                                      }
                                    />
                                  </>
                                ) : (
                                  ""
                                )}
                              </div>

                              <div className='row' key={index}></div>

                              <FieldArray name={`levels[${index}].tiers`}>
                                {({ insert, remove, push }) => (
                                  <div style={{ paddingBottom: "5px" }}>
                                    {values.levels[index].tiers.length > 0 &&
                                      values.levels[index].tiers.map(
                                        (tier, idx) => (
                                          <div key={idx}>
                                            <div
                                              style={{
                                                color: "white",
                                                paddingTop: "5px",
                                                paddingLeft: "20px",
                                                fontFamily: "Arial",
                                              }}
                                            >{`TIER ${idx + 1}`}</div>
                                            <div
                                              className='row'
                                              key={idx}
                                              style={{
                                                display: "flex",
                                                alignItems: "center",
                                                paddingLeft: "20px",
                                                justifyContent: "space-between",
                                              }}
                                            >
                                              <div className='col'>
                                                <label
                                                  htmlFor={`levels[${index}].tiers[${idx}].from`}
                                                ></label>
                                                <Field
                                                  label='From'
                                                  name={`levels[${index}].tiers[${idx}].from`}
                                                  placeholder='0$'
                                                  type='number'
                                                />
                                                <ErrorMessage
                                                  name={`levels[${index}].tiers[${idx}].from`}
                                                />
                                              </div>
                                              <div className='col'>
                                                <label
                                                  htmlFor={`levels[${index}].tiers[${idx}].rate`}
                                                ></label>
                                                <Field
                                                  label='Rate'
                                                  name={`levels[${index}].tiers[${idx}].rate`}
                                                  placeholder='15%'
                                                  type='number'
                                                />
                                                <ErrorMessage
                                                  color='red'
                                                  name={`levels[${index}].tiers[${idx}].rate`}
                                                />
                                              </div>

                                              <div className='col'>
                                                <DeleteIcon
                                                  style={{
                                                    cursor: "pointer",
                                                    color: "white",
                                                  }}
                                                  onClick={() => {
                                                    remove(idx);
                                                  }}
                                                />
                                                {values.levels[index].tiers
                                                  .length ===
                                                idx + 1 ? (
                                                  <>
                                                    <AddCircleIcon
                                                      style={{
                                                        cursor: "pointer",
                                                        color: "white",
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
                                          </div>
                                        )
                                      )}

                                    {values.levels[index].tiers.length > 0 ? (
                                      ""
                                    ) : (
                                      <div
                                        style={{
                                          color: "white",
                                          paddingLeft: "20px",
                                          paddingTop: "5px",
                                          display: "flex",
                                          alignItems: "center",
                                          fontFamily: "Arial",
                                        }}
                                      >
                                        ADD TIER
                                        <AddCircleIcon
                                          onClick={() =>
                                            push({
                                              from: "",
                                              rate: "",
                                            })
                                          }
                                        />
                                      </div>
                                    )}
                                  </div>
                                )}
                              </FieldArray>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                </FieldArray>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  paddingTop: "20px",
                  paddingBottom: "20px",
                }}
              >
                {values.levels.length > 0 ? (
                  <Button color='primary' variant='contained' type='submit'>
                    Submit
                  </Button>
                ) : (
                  ""
                )}
              </div>

              {/* <div>
                <pre style={{ fontSize: "100%", color: "white" }}>
                  {JSON.stringify(values, null, 2)}
                </pre>
              </div> */}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default TestForm;
