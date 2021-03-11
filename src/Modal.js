import React from "react";
import Modal from "react-modal";

const customStyles = {
  content: {
    position: "absolute",
    display: "grid",
    placeContent: "center",
    border: "10px solid #434343",
    backgroundColor: "white",
    overflow: "hidden",
    WebkitOverflowScrolling: "touch",
    borderRadius: "16px",
    outline: "none",
    width: "850px",
    height: "550px",
    left: "370px",
    topr: "95px",
    boxShadow: [
      "0px 8px 28px -6px rgba(24, 39, 75, 0.25)",
      "0px 18px 88px -4px rgba(24, 39, 75, 0.28)",
    ].join(","),
  },
};

Modal.setAppElement('#root')

function ModalComponent({ link, setClickOpen, view }) {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
    setClickOpen(modalIsOpen);
  }

  function closeModal() {
    setIsOpen(false);
    setClickOpen(modalIsOpen);
  }

  return (
    <div>
      <button
        onClick={openModal}
        className={view === "list" ? "listBtn" : "cardBtn"}
      ></button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        allowFullScreen
      >
        <iframe
          width="900px"
          height="600px"
          src={link}
          frameBorder="0"
          allowFullScreen
          title="News"
        ></iframe>
      </Modal>
    </div>
  );
}

export default ModalComponent;
