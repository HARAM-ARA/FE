import React, { useState, useEffect, useRef } from "react";
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
        height: "407px",
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

const MusicLabel = styled.p`
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
    padding: 1rem;
    justify-content: center;
    align-items: center;
    color: #000;
    font-size: 1rem;
    align-items: center;
    align-self: stretch;
    border-radius: 10px;
    background: #fbfbfb;
    border: 1px solid #b0b0b0;
    resize: none;

  &:focus {
    border-color: #F07F23;
    outline: none;
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

export default function MusicModal({ isOpen, onClose, onSubmit }) {
    const [inputValue, setInputValue] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const timeoutRef = useRef(null);

    // 컴포넌트 언마운트 시 타이머 정리
    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    const handleSubmit = async () => {
        if (inputValue.trim()) {
            try {
                if (onSubmit) {
                    await onSubmit(inputValue);
                }
                setIsSubmitted(true);

                timeoutRef.current = setTimeout(() => {
                    handleClose();
                }, 2000);
            } catch (error) {
                // 오류 발생 시 모달 닫지 않음
                console.error("제출 실패:", error);
            }
        }
    };

    const handleClose = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setInputValue("");
        setIsSubmitted(false);
        onClose();
    };

    const handleKeyDown = (e) => {
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
                    <SuccessTitle>신청 완료!</SuccessTitle>
                    <SuccessDescription>앞에 밀린 노래들이 먼저 나와요</SuccessDescription>
                </SuccessDiv>
            ) : (
                <Div>
                    <MusicLabel>음악을 신청해요</MusicLabel>
                    <Title>해커톤 BGM 노래를 신청할 수 있어요</Title>
                    <Example>예) What is love? - TWICE</Example>
                    <InputBox
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Enter키를 눌러 전송해요"
                    />
                </Div>
            )}
        </Modal>
    );
}