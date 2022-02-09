import React from "react";
import ReactDOM from "react-dom";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";

const initialValues = {
  levels: [],
};

const TestForm = ({ dataFromForm, setDataFromForm, setDataLoaded }) => {
  return (
    <div>
      <h1>Tiers</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values) => {
          await new Promise((r) => setTimeout(r, 500));
          // alert(JSON.stringify(values, null, 2));
          // console.log(JSON.stringify(values, null, 2));
          setDataFromForm(values);
          setDataLoaded(true);
        }}
      >
        {({ values }) => (
          <Form>
            <div style={{ display: "flex" }}>
              <div style={{ float: "left" }}>
                <FieldArray name='levels'>
                  {({ insert, remove, push }) => (
                    <div>
                      {values.levels.length > 0 &&
                        values.levels.map((lvl, index) => (
                          <>
                            <div>{`LEVEL ${index + 1}`}</div>
                            <br />
                            <div className='row' key={index}>
                              <div className='col'>
                                <button
                                  type='button'
                                  className='secondary'
                                  onClick={() => {
                                    remove(index);
                                  }}
                                >
                                  REMOVE LEVELS
                                </button>
                              </div>
                            </div>

                            <FieldArray name={`levels[${index}].tiers`}>
                              {({ insert, remove, push }) => (
                                <div>
                                  {values.levels[index].tiers.length > 0 &&
                                    values.levels[index].tiers.map(
                                      (tier, idx) => (
                                        <>
                                          <div>{`TIER ${idx + 1}`}</div>
                                          <br />
                                          <div className='row' key={idx}>
                                            <div className='col'>
                                              <label
                                                htmlFor={`levels[${index}].tiers[${idx}].from`}
                                              >
                                                From:
                                              </label>
                                              <Field
                                                name={`levels[${index}].tiers[${idx}].from`}
                                                placeholder='0$'
                                                type='text'
                                              />
                                            </div>
                                            <div className='col'>
                                              <label
                                                htmlFor={`levels[${index}].tiers[${idx}].rate`}
                                              >
                                                Rate:
                                              </label>
                                              <Field
                                                name={`levels[${index}].tiers[${idx}].rate`}
                                                placeholder='15%'
                                                type='text'
                                              />
                                            </div>
                                            <div className='col'>
                                              <button
                                                type='button'
                                                className='secondary'
                                                onClick={() => {
                                                  remove(idx);
                                                  console.log(tier);
                                                }}
                                              >
                                                REMOVE TIERS
                                              </button>
                                            </div>
                                          </div>
                                        </>
                                      )
                                    )}

                                  <button
                                    type='button'
                                    className='secondary'
                                    onClick={() => push({ from: "", rate: "" })}
                                  >
                                    Add Tier
                                  </button>
                                </div>
                              )}
                            </FieldArray>
                          </>
                        ))}

                      <button
                        type='button'
                        className='secondary'
                        onClick={() => push({ tiers: [] })}
                      >
                        Add Levels
                      </button>
                    </div>
                  )}
                </FieldArray>
              </div>
              <button type='submit'>Submit</button>
              <div>
                <pre style={{ fontSize: "100%" }}>
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
