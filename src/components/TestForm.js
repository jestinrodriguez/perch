import React, { useState, useEffect } from "react";
import { Formik, Form, FieldArray } from "formik";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { TextField } from "./TextField";
const { object, number, array } = require("yup");

const initialValues = {
  levels: [],
};

const TestForm = ({ setShowModal, setDataFromForm, setDataLoaded }) => {
  // check if 'from' values are valid
  // compares "currFromValue" with "nextFromValue"
  // nextFromValue should be greater than currFromValue
  const isValid = (data, index, idx) => {
    if (!data) return;
    let currLevel = index;
    let currFromValue = idx;
    let nextFromValue = currFromValue + 1;

    if (nextFromValue === data.levels[currLevel].tiers.length) {
      return;
    }

    if (
      (data.levels[currLevel].tiers[currFromValue].from ||
        data.levels[currLevel].tiers[nextFromValue].from) === ""
    ) {
      return "";
    } else if (
      data.levels[currLevel].tiers[currFromValue].from >=
      data.levels[currLevel].tiers[nextFromValue].from
    ) {
      return (
        <div style={{ color: "red" }}>
          {`
      TIER ${nextFromValue + 1}: Value should be greater than tier ${
            currFromValue + 1
          } value `}
        </div>
      );
    }
    return "";
  };

  // handle submit
  const handleSubmit = (values) => {
    setShowModal(false);
    setDataFromForm(values);
    setDataLoaded(true);
  };

  // custom validation for yup
  const tierValidationForYup = (value, testContext) => {
    for (let i = 0; i < value.tiers.length; i++) {
      let j = i + 1;
      if (j === value.tiers.length) {
        continue;
      }
      if (value.tiers[i].from >= value.tiers[j].from) {
        return `TIER ${j + 1}: Value should be greater than tier ${
          i + 1
        } value`;
      }
    }
    return "";
  };

  //Yup Validation schema
  const validate = object().shape({
    levels: array().of(
      object()
        .shape({
          tiers: array().of(
            object().shape({
              from: number()
                .required("Required")
                .min(0, "Must be zero or greater than 0"),
              rate: number()
                .required("Required")
                .min(1, "Please Enter a number between 1-100")
                .max(100, "Please Enter a number between 1-100")
                .integer("Must be an integer"),
            })
          ),
        })
        .test("compare", "error", function (value, testContext) {
          const message = tierValidationForYup(value, testContext);
          return !message;
        })
    ),
  });

  return (
    <div className='container mt-3'>
      <h1 style={{ color: "white", padding: "20px" }}>
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
                width: "660px",
                height: "400px",
              }}
            >
              <div style={{ paddingLeft: "40px" }}>
                <FieldArray name='levels'>
                  {({ insert, remove, push }) => (
                    <div>
                      {values.levels.length === 0 ? (
                        <div
                          style={{ cursor: "pointer" }}
                          onClick={() => push({ tiers: [] })}
                        >
                          <h1>
                            ADD LEVEL {""}
                            <AddCircleIcon />
                          </h1>
                        </div>
                      ) : (
                        ""
                      )}
                      <div>
                        {values.levels.length > 0 &&
                          values.levels.map((lvl, index) => (
                            <div key={index}>
                              <div
                                style={{
                                  color: "#448ffb",

                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                {`LEVEL ${index + 1}`}
                                <DeleteIcon
                                  style={{ cursor: "pointer" }}
                                  onClick={() => {
                                    remove(index);
                                  }}
                                />
                                {values.levels.length === index + 1 ? (
                                  <>
                                    <AddCircleIcon
                                      style={{ cursor: "pointer" }}
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

                              <div className='row'></div>

                              <FieldArray
                                key={index}
                                name={`levels[${index}].tiers`}
                              >
                                {({ insert, remove, push }) => (
                                  <div style={{ paddingBottom: "5px" }}>
                                    {values.levels[index].tiers.length > 0 &&
                                      values.levels[index].tiers.map(
                                        (tier, idx) => (
                                          <>
                                            <div
                                              key={idx}
                                              style={{ paddingBottom: "5px" }}
                                            >
                                              <div
                                                style={{
                                                  color: "white",
                                                  paddingTop: "5px",
                                                  paddingLeft: "20px",
                                                }}
                                              >{`TIER ${idx + 1}`}</div>
                                              <div
                                                key={idx}
                                                style={{
                                                  display: "flex",
                                                  alignItems: "center",
                                                  paddingLeft: "20px",
                                                  justifyContent:
                                                    "space-between",
                                                }}
                                              >
                                                <TextField
                                                  label='From'
                                                  name={`levels[${index}].tiers[${idx}].from`}
                                                  type='number'
                                                />
                                                <TextField
                                                  label='Rate'
                                                  name={`levels[${index}].tiers[${idx}].rate`}
                                                  type='number'
                                                />
                                                <div>
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
                                              <div
                                                style={{
                                                  paddingLeft: "20px",
                                                  paddingTop: "5px",
                                                }}
                                              >
                                                {isValid(values, index, idx)}
                                              </div>
                                            </div>
                                          </>
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
                                          cursor: "pointer",
                                        }}
                                        onClick={() =>
                                          push({
                                            from: "",
                                            rate: "",
                                          })
                                        }
                                      >
                                        ADD TIER
                                        <AddCircleIcon />
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
                  <Button
                    variant='contained'
                    type='submit'
                    style={{ backgroundColor: "#448ffb", color: "white" }}
                  >
                    Submit
                  </Button>
                ) : (
                  ""
                )}
              </div>
              {/* {SHOW TABLE STRUCTURE IN UI} */}
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
