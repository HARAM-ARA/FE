import React from "react";
import styled from "@emotion/styled";
import Header from "../components/Header.jsx";
import CreditCard from "../components/CreditCard.jsx";
import { dummyCredits } from "../data/dummyCredits.js";

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: white;
`;

const Body = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 50px;
`;

const TitleSection = styled.div`
  margin-bottom: 20px;
  margin-top: -50px;
`;

const Title = styled.h1`
  color: #1D1D1D;
  font-family: Pretendard;
  font-size: 28px;
  font-style: normal;
  font-weight: 700;
  line-height: 160%;
  margin: 0 0 8px 0;
`;

const Description = styled.p`
  color: #B2B2B2;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%;
  margin: 0;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  width: 100%;
`;

export default function Credits() {
  return (
    <Container>
      <Header teamName="최병준 선생님" />
      <Body>
        <TitleSection>
          <Title>전체 팀 크레딧 조회</Title>
          <Description>모든 팀의 크레딧을 한 눈에 확인하고</Description>
          <Description>팀별로 크레딧을 추가할 수 있어요</Description>
        </TitleSection>
        <GridContainer>
          {dummyCredits.map((team) => (
            <CreditCard
              key={team.id}
              id={team.id}
              name={team.name}
              credit={team.credit}
            />
          ))}
        </GridContainer>
      </Body>
    </Container>
  );
}