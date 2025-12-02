import React from "react";
import styled from "@emotion/styled";
import Card from "../components/card.jsx";
import Timer from "../components/Timer.jsx";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header.jsx";

const Body = styled.div`
    display: flex;
    width: 1440px;
    padding: 26px 51px 162px 50px;
    flex-direction: column;
    align-items: flex-start;
    gap: 50px;
    background: #fff;
  `;

const LeftBox = styled.div`
  width: 837px;
  height: 572px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 27px;
  margin: 0px 0px 0px 0px;
`;

const RightBox = styled.div`
  width: 469px;
  height: 572px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 32px;
  margin: 0px 0px 0px 0px;
`;

const TextBox = styled.div`
  width: 300px;
  height: 80px;
  margin: 0px 0px 0px 0px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
`;

const TitleText = styled.p`
  color: #1D1D1D;
  margin: 0px 0px 0px 0px;
  font-family: Pretendard;
  font-size: 28px;
  font-style: normal;
  font-weight: 700;
  line-height: 160%;
`;

const Text = styled.p`
  color: #B2B2B2;
  margin: 0px 0px 0px 0px;
  align-self: stretch;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%;
`;

const TimerBox = styled.div`
  display: flex;
  height: 550px;
  flex-direction: column;
  align-items: flex-start;
  gap: 32px;
  flex-shrink: 0;
  align-self: stretch;
`;

const FunctionBox = styled.div`
  width: 469px;
  height: 572px;
  display: flex;
  align-items: flex-start;
  align-content: flex-start;
  gap: 24px;
  flex-shrink: 0;
  align-self: stretch;
  flex-wrap: wrap;
`;

export default function TeacherHome() {
  const navigate = useNavigate();
  
  return (
    <>
      <Header 
        teamName="최병준 선생님"
      />

      <Body>
        <LeftBox>
          <TimerBox>
            <TextBox>
              <TitleText>타이머</TitleText>
              <Text>타이머로 남은 해커톤 시간을 확인해요</Text>
            </TextBox>
            <Timer height="79px" isTeacher= "true"/>
          </TimerBox>
        </LeftBox>

        <RightBox>
          <TextBox style={{ width: '450px' }}>
            <TitleText>선생님 기능</TitleText>
            <Text>선생님만 다룰 수 있는 기능이에요</Text>
          </TextBox>

          <FunctionBox>
            <Card 
              width="450px"
              height="65px"
              isTeacher={true}
              title="팀스페이스 조회"
              description="모든 팀과 학생들을 조회해요"
              onClick={() => navigate("/teacher/teams")}
            />
            <Card 
              width="450px"
              height="65px"
              isTeacher={true}
              title="전체 팀 크레딧 조회"
              description="모든 팀 크레딧을 조회하고 추가해요"
              onClick={() => navigate("/teacher/credits")}
            />
            <Card 
              width="450px"
              height="65px"
              isTeacher={true}
              title="상점"
              description="상점에 상품을 등록하고 수정해요"
              onClick={() => navigate("/teacher/store")}
            />
          </FunctionBox>
        </RightBox>
      </Body>
    </>
  );
}