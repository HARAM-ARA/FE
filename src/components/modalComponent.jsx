import React from "react";
import Modal from "react-modal";
import styled from "@emotion/styled";
import xImg from "../assets/Frame.svg";
import Btn from "./Button.jsx";

Modal.setAppElement("#root");

const customModalStyles = { // 기본 디폴트 스타일
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

const guideModalStyles = { // 가이드 모달 전용 스타일
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
    width: "877px",
    height: "543px",
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
  margin-right:  ${props => props.isGuide ? '70px' : '0px'};
  flex-direction: column;
  align-items: ${props => props.isGuide ? 'flex-start' : 'center'};
  gap: 4px;
`;

const Title = styled.div`
  color: #1D1D1D;
  font-feature-settings: 'liga' off, 'clig' off;
  font-family: Pretendard;
  font-size: 40px;
  font-style: normal;
  font-weight: 600;
  line-height: 160%; /* 64px */
`;

const Title2 = styled.div`
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

const Description = styled.p`
  color: #B2B2B2;
  font-feature-settings: 'liga' off, 'clig' off;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 160%; /* 32px */
  margin: 24px 8px 0px 0px;
  text-align: ${props => props.isGuide ? 'left' : 'center'};
  white-space: pre-line;
`;

const Description2 =styled.p`
  color: #B2B2B2;
  font-feature-settings: 'liga' off, 'clig' off;
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: 160%; /* 38.4px */
  margin:0;
`;

const Catchphrase = styled.p`
  color: #1D1D1D;
  font-feature-settings: 'liga' off, 'clig' off;
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: 160%; /* 38.4px */
  margin-top: 0;
  margin-bottom: 40px;
  text-align: ${props => props.isGuide ? 'left' : 'center'};
`;

const CardImg = styled.img`
  width: ${props => {
    switch (props.effect) {
      case "add2": return "250px";
      case "add3": return "300px";
      case "add4": return "300px";
      case "add5": return "300px";
      default: return "100px";
    }
  }};
  object-fit: contain; 
  margin-bottom: ${props => props.isSelectTeam ? "10px" : "0px"};

`;

export default function ModalComponent({
  isOpen,
  onClose,
  title,
  img,
  isGuide = false, // 게임 설명 모달
  description,
  catchphrase,
  btnText,
  onButtonClick,
  isResult = false,
  isSelectTeam = false, // 팀 선택하는 버튼 있어야하는지....
  effect
}) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={isGuide ? guideModalStyles : customModalStyles}
      shouldCloseOnOverlayClick={true}
    >
      <Img src={xImg} onClick={onClose} />  {/* x 시 모달 닫기 */}

      {isGuide ? (
        <Div isGuide={isGuide}>  {/* 게임 가이드일 때 쓰는 버튼 + 긴 설명 구조 */}
          <Title>{title}</Title>
          <Description isGuide={isGuide}>{description}</Description>
          <Catchphrase isGuide={isGuide}>{catchphrase}</Catchphrase>
          <div style={{ width: "100%", display: "flex", justifyContent: "flex-end", marginLeft: "70px" }}>
            <Btn onClick={onButtonClick} text={btnText} isModal={true} />
          </div>
        </Div>
      )
        :
        (isResult ? (
          <Div>
            <Title2>{title}</Title2>
            {(effect == "anger" || effect == "reset") && (
              <Description2>
                {effect === "reset"
                  ? "전체 팀을 기본 1000크레딧으로 초기화합니다."
                  : "선택한 팀의 크레딧을 기본 1000 크레딧으로 초기화합니다."}
              </Description2>
            )}
            <CardImg src={img} alt="card" effect={effect} isSelectTeam={true} />
            {isSelectTeam ? <Btn text="선택하기" onClick={onButtonClick}  /> : <></>}
          </Div>

        )
          :
          (
            <Div> {/* 기본 사진 + 타이틀 구조 */}
              <Img src={img} alt="card" />
              <Title>{title}</Title>
            </Div>
          )
        )}
    </Modal>
  );
}