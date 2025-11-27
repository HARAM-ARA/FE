
import React from "react";
import Modal from "react-modal";
import styled from "@emotion/styled";
import xImg from "../assets/Frame.svg";

Modal.setAppElement("#root"); 

const customModalStyles = {
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
    flexDirection: "column" 
  },
};

const Div = styled.div`
  display: flex;
  width: 479px;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`;

const Title = styled.div`
  color: #1D1D1D;
  font-feature-settings: 'liga' off, 'clig' off;
  font-family: Pretendard;
  font-size: 40px;
  font-style: normal;
  font-weight: 700;
  line-height: 160%; /* 64px */
`;

const Img = styled.img`
  position: absolute;
  top: 30px;
  right: 30px;
  width: 35px;  
  height: 35px;
  cursor: pointer;
`;

export default function ModalComponent({ isOpen, onClose, title, img, }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customModalStyles}
      shouldCloseOnOverlayClick={true}
    >
      <Img src={xImg} onClick={onClose}></Img>
      <Div>
        <img src={img} ></img>
        <Title>{title}</Title>
      </Div>
    </Modal>
  );
}
