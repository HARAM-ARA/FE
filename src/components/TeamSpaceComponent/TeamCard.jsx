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

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export default function TeamCard({ team, selected, onSelect, onClick }) {
  const handleCardClick = (e) => {
    if (e.target.type !== 'checkbox') {
      onClick?.();
    }
  };

  const handleCheckboxChange = (e) => {
    e.stopPropagation();
    onSelect?.();
  };

  return (
    <Card selected={selected} onClick={handleCardClick}>
      <CheckboxWrapper onClick={e => e.stopPropagation()}>
        <Checkbox
          checked={selected}
          onChange={handleCheckboxChange}
        />
      </CheckboxWrapper>
      <TeamName>TEAM {team.name}</TeamName>
    </Card>
  );
}