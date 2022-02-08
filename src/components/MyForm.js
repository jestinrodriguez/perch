import React from "react";
import { Formik, Form, FieldArray, useFormikContext } from "formik";
const peopleData = {
  count: 2,
  people: [
    {
      name: "John",
      contacts: [{ number: "000000000" }, { number: "111111111" }],
    },
    { name: "Doe", contacts: [] },
  ],
};

const Contacts = ({ personIndex, contactsArrayHelpers }) => {
  const [number, setNumber] = React.useState("");
  const { values } = useFormikContext();

  const handleAddContactNumber = () => {
    const contact = {};
    contact.number = number;

    contactsArrayHelpers.push(contact);
    setNumber("");
  };

  const handleChange = (event) => {
    setNumber(event.currentTarget.value);
  };

  return (
    <>
      {values.people[personIndex].contacts.map((contact, index) => (
        <div key={contact.number + index}>
          {". " + contact.number}
          <br />
        </div>
      ))}
      <input type='text' value={number} onChange={handleChange} />
      <button type='button' onClick={handleAddContactNumber}>
        add contact to {values.people[personIndex].name}
      </button>
    </>
  );
};

const People = ({ peopleArrayHelpers }) => {
  const [name, setName] = React.useState("");
  const { values, setFieldValue } = useFormikContext();

  const handleAddPerson = () => {
    const person = {};
    person.name = name;
    person.contacts = [];

    peopleArrayHelpers.push(person);
    setFieldValue("count", values.count + 1);
    setName("");
  };

  const handleChange = (event) => {
    setName(event.currentTarget.value);
  };

  return (
    <>
      <input type='text' value={name} onChange={handleChange} />
      <button type='button' onClick={handleAddPerson}>
        add person
      </button>
      {values.people.map((person, index) => (
        <div key={person.name + index}>
          <br />
          <span>{person.name}'s contacts:</span>
          <FieldArray name={`people[${index}].contacts`}>
            {(arrayHelpers) => (
              <>
                <br />
                <Contacts
                  personIndex={index}
                  contactsArrayHelpers={arrayHelpers}
                />
              </>
            )}
          </FieldArray>
        </div>
      ))}
    </>
  );
};

const MyForm = () => {
  return (
    <Formik initialValues={{ ...peopleData }} enableReinitialize={true}>
      {({ values }) => (
        <Form
          onChange={(event) => {
            console.log(
              "name",
              event.target.name,
              " | value",
              event.target.value
            );
          }}
        >
          <div style={{ display: "flex" }}>
            <div style={{ float: "left" }}>
              <span>number of people: {values.count}</span>
              <FieldArray name='people'>
                {(arrayHelpers) => {
                  return (
                    <>
                      <br />
                      <People peopleArrayHelpers={arrayHelpers} />
                    </>
                  );
                }}
              </FieldArray>
            </div>
            <div>
              <pre style={{ fontSize: "65%" }}>
                {JSON.stringify(values, null, 2)}
              </pre>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default MyForm;
