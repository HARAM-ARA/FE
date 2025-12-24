
import React, { useState } from "react";
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
    width: "440px",
    height: "auto",
    minHeight: "180px",
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
    padding: "120px 80px",
  },
};

const CloseButton = styled.img`
  position: absolute;
  top: 30px;
  right: 30px;
  width: 35px;
  height: 35px;
  cursor: pointer;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 32px;
`;

const Title = styled.h2`
  color: #1D1D1D;
  font-family: Pretendard;
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: 160%;
  margin: 0;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
`;

const Input = styled.input`
  flex: 1;
  padding: 16px 24px;
  border-radius: 12px;
  border: 1px solid #B2B2B2;
  background-color: white;
  color: #1D1D1D;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  &::placeholder {
    color: #B2B2B2;
  }

  &:focus {
    outline: none;
    border: 1px solid #F07F23;
  }
`;

const AddButton = styled.button`
  display: inline-flex;
  padding: 16px 32px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 12px;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  white-space: nowrap;

  ${props => props.disabled ? `
    border: 1px solid #f0f0f0;
    background-color: white;
    color: #e0e0e0;
    cursor: not-allowed;
  ` : `
    border: 1px solid #b2b2b2;
    background-color: white;
    color: #646464;

    &:hover {
      border: none;
      background-color: #FFF2E4;
      color: #F07F23;
    }
  `}

  &:focus {
    outline: none;
  }
`;

export default function AddCreditModal({ isOpen, onClose, teamName, onAdd }) {
  const [creditValue, setCreditValue] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (value === "" || /^\d+$/.test(value)) {
      setCreditValue(value);
    }
  };

  const handleAdd = () => {
    if (creditValue && parseInt(creditValue) > 0) {
      onAdd(parseInt(creditValue));
      setCreditValue("");
      onClose();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && creditValue && parseInt(creditValue) > 0) {
      handleAdd();
    }
  };

  const handleClose = () => {
    setCreditValue("");
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      style={customModalStyles}
      shouldCloseOnOverlayClick={true}
    >
      <CloseButton src={xImg} onClick={handleClose} />
      <ModalContent>
        <Title>{teamName}팀 크레딧 추가하기</Title>
        <InputWrapper>
          <Input
            type="text"
            placeholder="추가할 크레딧을 입력하세요.."
            value={creditValue}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          />
          <AddButton
            disabled={!creditValue || parseInt(creditValue) <= 0}
            onClick={handleAdd}
          >
            추가하기
          </AddButton>
        </InputWrapper>
      </ModalContent>
    </Modal>
  );
}