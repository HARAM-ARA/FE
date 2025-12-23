import React, { useState } from "react";
import Modal from "react-modal";
import styled from "@emotion/styled";
import xImg from "../assets/Frame.svg";
import storeImg from "../assets/store.svg";

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
        flexDirection: "column",
        padding: "40px",
    },
};

const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const CloseImg = styled.img`
  position: absolute;
  top: 30px;
  right: 30px;
  width: 35px;
  height: 35px;
  cursor: pointer;
`;

const TTSLabel = styled.p`
    color: #000;
    font-feature-settings: 'liga' off, 'clig' off;
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 160%; /* 25.6px */
    margin-bottom: 4px;
`;

const Title = styled.p`
    color: #000;
    font-feature-settings: 'liga' off, 'clig' off;
    font-family: Pretendard;
    font-size: 28px;
    font-style: normal;
    font-weight: 600;
    line-height: 160%; /* 44.8px */
    margin: 0;
`;

const Example = styled.p`
    color: #A3A3A3;
    text-align: center;
    font-feature-settings: 'liga' off, 'clig' off;
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 160%; /* 22.4px */
    margin-bottom: 24px;
`;


const InputBox = styled.textarea`
    display: flex;
    padding: 20px 24px;
    align-items: center;
    gap: 10px;
    align-self: stretch;
    border-radius: 10px;
    background: #ECECEC;

  &:focus {
    border-color: #F07F23;
  }

  &::placeholder {
   
      color: #A3A3A3;
      font-feature-settings: 'liga' off, 'clig' off;
      font-family: Pretendard;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 160%; /* 22.4px */
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 16px 24px;
  border-radius: 12px;
  border: none;
  background-color: #FFF2E4;
  color: #F07F23;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #FFE5CC;
  }

  &:active {
    background-color: #FFD9B3;
  }

  &:disabled {
    background-color: #F5F5F5;
    color: #B2B2B2;
    cursor: not-allowed;
  }
`;

const SuccessDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`;

const SuccessImg = styled.img`
  width: 100px;
  height: 100px;
  object-fit: contain;
`;

const SuccessTitle = styled.p`
  color: #1D1D1D;
  font-family: Pretendard;
  font-size: 40px;
  font-style: normal;
  font-weight: 600;
  line-height: 160%;
  margin: 0;
  text-align: center;
`;

const SuccessDescription = styled.p`
  color: #B2B2B2;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 160%;
  margin: 0;
  text-align: center;
    align-self: center;
`;

export default function AnnouncementModal({ isOpen, onClose, onSubmit }) {
    const [inputValue, setInputValue] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = () => {
        if (inputValue.trim()) {
            if (onSubmit) {
                onSubmit(inputValue);
            }
            setIsSubmitted(true);

            setTimeout(() => {
                handleClose();
            }, 2000);
        }
    };

    const handleClose = () => {
        setInputValue("");
        setIsSubmitted(false);
        onClose();
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={handleClose}
            style={customModalStyles}
            shouldCloseOnOverlayClick={true}
        >
            <CloseImg src={xImg} onClick={handleClose} />

            {isSubmitted ? (
                <SuccessDiv>
                    <SuccessImg src={storeImg} alt="success" />
                    <SuccessTitle>전송완료!</SuccessTitle>
                    <SuccessDescription>무대 앞 화면을 확인하세요</SuccessDescription>
                </SuccessDiv>
            ) : (
                <Div>
                    <TTSLabel>tts로 읽어요</TTSLabel>
                    <Title>전체 공지를 날릴 문구를 적어주세요</Title>
                    <Example>예) 1302 강태은 바보</Example>
                    <InputBox
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Enter 키를 눌러 전송할 수 있어요"
                    />

                </Div>
            )}
        </Modal>
    );
}