import React from "react";
import Modal from "react-modal";
import styled from "@emotion/styled";
import xImg from "../assets/Frame.svg";

Modal.setAppElement("#root");

const defaultModalStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    width: "100%",
    height: "100vh",
    zIndex: "10",
    position: "fixed",
    top: "0",
    left: "0",
  },
  content: {
    width: "648px",
    height: "445px",
    flexShrink: "0",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "24px",
    backgroundColor: "#fff",
    overflow: "auto",
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    padding: "0",
  },
};

const Img = styled.img`
  position: absolute;
  top: 30px;
  right: 30px;
  width: 35px;
  height: 35px;
  cursor: pointer;
  z-index: 100;
`;

export default function ModalBase({ isOpen, onClose, children, width, height, showCloseButton = true }) {
  const customStyles = {
    ...defaultModalStyles,
    content: {
      ...defaultModalStyles.content,
      ...(width && { width }),
      ...(height && { height }),
    },
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
      shouldCloseOnOverlayClick={true}
    >
      {showCloseButton && <Img src={xImg} onClick={onClose} />}
      {children}
    </Modal>
  );
}