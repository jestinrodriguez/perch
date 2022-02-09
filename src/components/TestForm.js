import React from "react";
import ReactDOM from "react-dom";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";

import styled from "styled-components";
import Button from "@material-ui/core/Button";

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
    <div>
      <h1 style={{ color: "white", fontFamily: "Arial" }}>
        CREATE A COMPENSATION STRUCTURE
      </h1>
      <Formik
        style={{ overflow: "scroll" }}
        initialValues={initialValues}
        onSubmit={async (values) => {
          await new Promise((r) => setTimeout(r, 100));
          // alert(JSON.stringify(values, null, 2));
          // console.log(JSON.stringify(values, null, 2));

          setIsCreating(true);
          setShowModal(false);
          setDataFromForm(values);
          setDataLoaded(true);
        }}
      >
        {({ values }) => (
          <Form style={{ overflow: "auto" }}>
            <div style={{ display: "flex", overflow: "scroll" }}>
              <div style={{ float: "left" }}>
                <FieldArray name='levels' style={{ overflow: "scroll" }}>
                  {({ insert, remove, push }) => (
                    <div style={{ overflow: "auto" }}>
                      {values.levels.length > 0 &&
                        values.levels.map((lvl, index) => (
                          <>
                            <div
                              style={{
                                color: "#448ffb",
                                fontFamily: "Arial",
                              }}
                            >{`LEVEL ${index + 1}`}</div>
                            <br />
                            <div className='row' key={index}>
                              <div className='col'>
                                <Button
                                  type='button'
                                  variant='contained'
                                  className='secondary'
                                  onClick={() => {
                                    remove(index);
                                  }}
                                >
                                  REMOVE LEVELS
                                </Button>
                              </div>
                            </div>

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
                                          <br />
                                          <div className='row' key={idx}>
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
                                              <Button
                                                variant='contained'
                                                type='button'
                                                className='secondary'
                                                onClick={() => {
                                                  remove(idx);
                                                  console.log(tier);
                                                }}
                                              >
                                                REMOVE TIERS
                                              </Button>
                                            </div>
                                          </div>
                                        </>
                                      )
                                    )}

                                  <Button
                                    variant='contained'
                                    type='button'
                                    className='secondary'
                                    onClick={() => push({ from: "", rate: "" })}
                                  >
                                    Add Tier
                                  </Button>
                                </div>
                              )}
                            </FieldArray>
                          </>
                        ))}

                      <Button
                        type='button'
                        variant='contained'
                        className='secondary'
                        onClick={() => push({ tiers: [] })}
                      >
                        Add Levels
                      </Button>
                    </div>
                  )}
                </FieldArray>
              </div>
              <Button color='primary' variant='contained' type='submit'>
                Submit
              </Button>
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
