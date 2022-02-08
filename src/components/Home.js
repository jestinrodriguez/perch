import React, { useState } from "react";
import Button from "@mui/material/Button";
import BasicTable from "./Table";
import TestForm from "./TestForm";
import Former from "./Former";
import MyForm from "./MyForm";
import TestForm1 from "./TestForm1";

const Home = () => {
  // const [showModal, setShowModal] = useState(false);

  // const openModal = () => {};

  const [formData, setFormData] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [dataFromForm, setDataFromForm] = useState([]);

  const handleCreate = () => {
    setIsCreating(true);
  };
  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <div
      style={{
        padding: "25px",
        margin: "25px",
        width: "100vw",
        height: "100vh",
      }}
    >
      <Button onClick={handleCreate}>Create</Button>
      <Button onClick={handleEdit}>Edit</Button>

      {/* <MyForm /> */}
      <TestForm
        dataFromForm={dataFromForm}
        setDataFromForm={setDataFromForm}
        setDataLoaded={setDataLoaded}
      />
      {/* <Former /> */}
      {/* <div style={{ width: "600px", height: "300px" }}>
        {!isCreating ? (
          ""
        ) : (
          <TestForm setDataLoaded={setDataLoaded} setFormData={setFormData} />
        )}
      </div> */}

      {/* {!isEditing ? (
        ""
      ) : (
        <TestForm
          setDataLoaded={setDataLoaded}
          setFormData={setFormData}
          formData={formData}
        />
      )} */}

      {/* <TestForm1
        setDataLoaded={setDataLoaded}
        setFormData={setFormData}
        formData={formData}
      /> */}

      {!dataLoaded ? (
        "Please load some data...."
      ) : (
        <BasicTable formData={formData} dataFromForm={dataFromForm} />
      )}
    </div>
  );
};

export default Home;
