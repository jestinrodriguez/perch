import React, { useState } from "react";
import Button from "@mui/material/Button";
import TestForm from "./TestForm";
import CompensationStructureTable from "./CompensationStructureTable";
import { data } from "../data/structure";
import Header from "./Header";
import CreateModal from "./Modal/CreateModal";

const Home = () => {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [dataFromForm, setDataFromForm] = useState(null);

  const [showModal, setShowModal] = useState(false);

  // const handleCreate = () => {
  //   setIsCreating(true);
  // };

  const useModal = () => {
    setShowModal(true);
  };

  return (
    <div>
      <Header>
        <Button
          style={{ backgroundColor: "#3987f7" }}
          variant='contained'
          color='success'
          onClick={useModal}
        >
          Create
        </Button>
      </Header>
      <CreateModal setShowModal={setShowModal} showModal={showModal} />

      {!isCreating ? (
        ""
      ) : (
        <TestForm
          dataFromForm={dataFromForm}
          setDataFromForm={setDataFromForm}
          setDataLoaded={setDataLoaded}
          setIsCreating={setIsCreating}
          setShowModal={setShowModal}
        />
      )}

      {!dataLoaded ? (
        "Please load some data...."
      ) : (
        <CompensationStructureTable
          dataFromForm={dataFromForm}
          setDataFromForm={setDataFromForm}
        />
      )}
    </div>
  );
};

export default Home;
