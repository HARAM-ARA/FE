import React, { useState } from "react";
import styled from "@emotion/styled";
import AddCreditModal from "./AddCreditModal.jsx";

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 40px 32px;
  border-radius: 12px;
  border: 1px solid #8B8B8B;
  background-color: white;
  min-height: 100px;
`;

const TeamName = styled.h3`
  color: #1D1D1D;
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin: 0;
`;

const CreditAmount = styled.p`
  color: #F07F23;
  font-family: Pretendard;
  font-size: 28px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin: 0;
`;

const FilledButton = styled.button`
  display: inline-flex;
  padding: 12px 24px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 80px;
  border: none;
  background-color: #FFF2E4;
  color: #F07F23;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #F07F23;
    color: white;
  }

  &:focus {
    outline: none;
  }
`;

const OutlinedButton = styled.button`
  display: inline-flex;
  padding: 12px 24px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 80px;
  border: 1px solid #B2B2B2;
  background-color: white;
  color: #646464;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #FFF2E4;
    border: none;
    color: #F07F23;
  }

  &:focus {
    outline: none;
  }
`;

export default function CreditCard({ id, name, credit, onAddCredit }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddCredit = (amount) => {
    // 부모 컴포넌트(Credits.jsx)의 handleAddCredit 함수 호출
    // Credits.jsx에서 백엔드 API 호출 및 상태 업데이트 처리
    if (onAddCredit) {
      onAddCredit(id, amount);
    }
  };

  return (
    <>
      <CardContainer>
        <TeamName>{name}</TeamName>
        {credit !== null ? (
          <CreditAmount>{credit.toLocaleString()} 크레딧</CreditAmount>
        ) : (
          <OutlinedButton onClick={handleOpenModal}>크레딧 추가하기</OutlinedButton>
        )}
      </CardContainer>

      <AddCreditModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        teamName={name}
        onAdd={handleAddCredit}
      />
    </>
  );
}