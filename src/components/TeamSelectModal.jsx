import { useState } from "react";
import Modal from "react-modal";
import styled from "@emotion/styled";
import xImg from "../assets/Frame.svg";
import Btn from "./Button.jsx";

Modal.setAppElement("#root");

const Div = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    alignItems: center;
    margin-left: 20px;
    
`;

const modalStyles = {
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
    minHeight: "445px",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "24px",
    backgroundColor: "#fff",
    padding: "60px 40px",
  },
};

const Title = styled.p`
  color: #1D1D1D;
  font-feature-settings: 'liga' off, 'clig' off;
  font-family: Pretendard;
  font-size: 32px;
  font-style: normal;
  font-weight: 600;
  line-height: 160%;
  align-self: stretch;
  margin: 0 0 20px 0;
`;

const SelectTap = styled.div` 
  display: flex;
  width: 590px;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
`;

const TeamList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 12px;      
  overflow-y: auto;
`;

const TeamItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom:20px;
  border: none;  

  
`;

const TeamInfo = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  border: none;     
  padding: 0;
`;

const TeamName = styled.div`
  color: #1D1D1D;
  text-align: center;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
  margin-left: 0;
`;

const TeamCredit = styled.div`
  color: #B2B2B2;
  text-align: center;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const CloseButton = styled.img`
  position: absolute;
  top: 30px;
  right: 30px;
  width: 35px;
  height: 35px;
  cursor: pointer;
`;

export default function TeamSelectModal({
  isOpen,
  onClose,
  teams = [],
  selectTeam,
  effect,
  
}) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={modalStyles}
      shouldCloseOnOverlayClick={false}
    >
      <CloseButton src={xImg} onClick={onClose} />
      <Div>
        

        <SelectTap>
          <Title>전체 팀 목록</Title>
          <TeamList>
            {teams.map((item) => (
              <TeamItem key={item.id}>
                <TeamInfo>
                  <TeamName>TEAM  {item.name}</TeamName>
                  <TeamCredit>{item.credit?.toLocaleString()} 크레딧</TeamCredit>
                </TeamInfo>
                <Btn
                  onClick={() => selectTeam(item.id)}
                  text={effect === "anger" ? "초기화하기" : effect === "swap" ? "교환하기" : "뺏기"}
                  isSelect={true}
                />
              </TeamItem>
            ))}
          </TeamList>
        </SelectTap>
      </Div>
    </Modal>
  );
}
