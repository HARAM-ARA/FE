import React from "react";
import Modal from "react-modal";
import styled from "@emotion/styled";
import Btn from "../button.jsx";

Modal.setAppElement("#root");

const modalStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    width: "100%",
    height: "100vh",
    zIndex: "20",
    position: "fixed",
    top: "0",
    left: "0",
  },
  content: {
    width: "648px",
    height: "445px",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "24px",
    backgroundColor: "#fff",
    padding: "40px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
};

const Message = styled.p`
    color: #1D1D1D;
    font-feature-settings: 'liga' off, 'clig' off;
    font-family: Pretendard;
    font-size: 40px;
    font-style: normal;
    font-weight: 700;
    line-height: 160%; /* 64px */
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 12px;
`;

const Button = styled.button`
    display: flex;
    width: 180px;
    height: 50px;
    justify-content: center;
    padding: 16px 24px;
    align-items: center;
    border-radius: 12px;
    border: 2px solid #B2B2B2;
    background-color: #fff;
    &:hover{
        border: 2px solid #B2B2B2;
    }
`;

const Btntext = styled.p`
    color: #646464;
  
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
`;

export default function DeleteConfirmModal({ isOpen, onClose, onConfirm, message = "정말 팀을 삭제하시겠어요?" }) {
  const handleConfirm = () => {
    onConfirm?.();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={modalStyles}
      shouldCloseOnOverlayClick={true}
    >
      <Message>{message}</Message>
      <ButtonWrapper>
          <Button onClick={handleConfirm}><Btntext>삭제하기</Btntext></Button>
      </ButtonWrapper>
    </Modal>
  );
}