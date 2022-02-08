import React from "react";
import ReactDOM from "react-dom";
import { Formik, Form, FieldArray, Field, getIn } from "formik";

const INITIAL_VALUES = {
  dates: [
    { date: "2019-03-10", events: ["Late night run"] },
    { date: "2019-03-11", events: ["Netflix and chill"] },
  ],
};

const Former = () => {
  return (
    <Formik initialValues={INITIAL_VALUES}>
      <Form>
        <FieldArray name='dates'>
          {(arrayHelpers) => {
            console.log(arrayHelpers);

            const dates = getIn(arrayHelpers.form.values, arrayHelpers.name);
            return dates.map((day, index) => (
              <EventEditor
                key={index}
                date={day.date}
                name={`${arrayHelpers.name}.${index}`}
              />
            ));
          }}
        </FieldArray>
      </Form>
    </Formik>
  );
};

export default Former;

function EventEditor({ date, name }) {
  return (
    <Field name={name}>
      {(fieldProps) => (
        <>
          <div>
            {console.log(fieldProps)}
            <div>{fieldProps.field.value.date}</div>
            <FieldArray name={`${fieldProps.field.name}.events`}>
              {(arrayHelpers) => (
                <>
                  {console.log(`${fieldProps.field.name}.events`)}
                  <div>
                    {fieldProps.field.value.events.map((event, index) => (
                      <div key={index}>
                        {event}
                        <button
                          type='button'
                          onClick={() => arrayHelpers.remove(index)}
                        >
                          remove
                        </button>
                      </div>
                    ))}
                  </div>
                  <button
                    type='button'
                    onClick={() => {
                      arrayHelpers.push(prompt("What are you up to?"));
                    }}
                  >
                    add
                  </button>
                </>
              )}
            </FieldArray>
          </div>
        </>
      )}
    </Field>
  );
}
