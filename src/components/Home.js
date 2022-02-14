import React, { useState } from "react";
import Button from "@mui/material/Button";
import TestForm from "./TestForm";
import CompensationStructureTable from "./CompensationStructureTable";
import { data } from "../data/structure";
import Header from "./Header";
import CreateModal from "./Modal/CreateModal";

const Home = () => {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [dataFromForm, setDataFromForm] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const useModal = () => {
    setShowModal(true);
  };

  return (
    <div>
      <Header>
        <Button
          variant='contained'
          onClick={useModal}
          style={{ backgroundColor: "#448ffb" }}
        >
          Create
        </Button>
      </Header>
      <CreateModal
        setShowModal={setShowModal}
        showModal={showModal}
        setDataFromForm={setDataFromForm}
        setDataLoaded={setDataLoaded}
      />

      {!dataLoaded ? (
        "Please load some data...."
      ) : (
        <CompensationStructureTable
          dataFromForm={dataFromForm}
          setDataFromForm={setDataFromForm}
          setDataLoaded={setDataLoaded}
        />
      )}
    </div>
  );
};

export default Home;
