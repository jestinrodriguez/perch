import React, { useState } from "react";
import Modal from "react-modal";

import TestForm from "../TestForm";
import "./Modal.css";

const CreateModal = ({
  showModal,
  setShowModal,
  setDataFromForm,
  setDataLoaded,
}) => {
  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      transform: "translate(-50%,-50%)",
      backgroundColor: "#222529",
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
        // className='Modal'
        // overlayClassName='Overlay'
        style={customStyles}
        ariaHideApp={false}
      >
        <TestForm
          setShowModal={setShowModal}
          setDataFromForm={setDataFromForm}
          setDataLoaded={setDataLoaded}
        />
        {/* <button onClick={() => setShowModal(false)}>Close Modal</button> */}
      </Modal>
    </div>
  );
};

export default CreateModal;
