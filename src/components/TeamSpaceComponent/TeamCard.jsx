import React from "react";
import styled from "@emotion/styled";
import Checkbox from "../Checkbox.jsx";


const Card = styled.div`
  display: flex;
  align-items: center;
    width:400px;
    height: 88px;
    padding: 10px 20px;
  gap: 16px;
  border-radius: 12px;
  border: 1px solid #8B8B8B;
  background: ${props => props.selected ? '#FFF2E4' : '#FFF'};
  cursor: pointer;
  transition: all 0.2s ease;
  min-height: 80px;

  &:hover {
    background: #FFF2E4;
    border-color: #F5D6BD;
  }
`;

const TeamName = styled.p`
    color: #000;
    font-feature-settings: 'liga' off, 'clig' off;
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
`;

const Btn = styled.button`
    display: flex;
    width: 172px;
    padding: 12px 20px;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    border-radius: 12px;
    border: 1px solid #B2B2B2;
    background: none;
    margin-left: auto;
    &:hover {
        outline: none;
        border: none;
        
    }
    &:hover p {
        color: #F07F23;
        content: "on hover";
    }
`;

const BtnText = styled.p`
    color: #646464;
    text-align: center;
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    margin: 0;
    &:hover {
        color: #F07F23;
    }
`;

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export default function TeamCard({ team, selected, onSelect, onClick, onCreditClick }) {

  const handleCardClick = (e) => {
    if (e.target.type !== 'checkbox') {
      onClick?.();
    }
  };

  const handleCheckboxChange = (e) => {
    e.stopPropagation();
    onSelect?.();
  };

  const handleCreditButtonClick = (e) => {
    e.stopPropagation();
    onCreditClick?.(team);
  };

  return (
    <Card selected={selected} onClick={handleCardClick}>
      <CheckboxWrapper onClick={e => e.stopPropagation()}>
        <Checkbox
          checked={selected}
          onChange={handleCheckboxChange}
        />
      </CheckboxWrapper>
      <TeamName>{team.teamName}</TeamName>
        <Btn onClick={handleCreditButtonClick}>
          <BtnText>{team.teamCredit + " 크레딧"} </BtnText>
        </Btn>
    </Card>
  );
}