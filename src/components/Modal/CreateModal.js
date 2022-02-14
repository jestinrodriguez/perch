import React, { useState } from "react";
import Modal from "react-modal";

import TestForm from "../TestForm";

const CreateModal = ({
  showModal,
  setShowModal,
  setDataFromForm,
  setDataLoaded,
}) => {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      transform: "translate(-50%,-50%)",
      backgroundColor: "rgba(10,11,13,0.75)",
      padding: 0,
      border: "none",
    },

    overlay: {
      backgroundColor: "rgba(10,11,13,0.75)",
    },
  };

  return (
    <div>
      <Modal
        isOpen={showModal}
        contentLabel='onRequestClose Example'
        onRequestClose={() => setShowModal(false)}
        style={customStyles}
        ariaHideApp={false}
      >
        <TestForm
          setShowModal={setShowModal}
          setDataFromForm={setDataFromForm}
          setDataLoaded={setDataLoaded}
        />
      </Modal>
    </div>
  );
};

export default CreateModal;
