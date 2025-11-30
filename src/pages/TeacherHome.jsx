import React from "react";
import styled from "@emotion/styled";
import Card from "../components/Card.jsx";
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
  `;

const LeftBox = styled.div`
    display: flex;
    width: 837px;
    height: 572px;
    flex-direction: column;
    align-items: flex-start;
    gap: 32px;
  `;

const RightBox = styled.div`
    width: 677px;
    height: 575px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 32px;
        
    margin: 0px 0px 0px 0px;
  `;


const TextBox = styled.div`
    width: 240px;
    height: 80px;
    margin: 0px 0px 0px 0px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 2px;
    
  `;

const TitleText = styled.p`
    color: #1D1D1D;
    margin:0px 0px 0px 0px;
    font-family: Pretendard;
    font-size: 28px;
    font-style: normal;
    font-weight: 700;
    line-height: 160%; /* 44.8px */
  `;

const Text = styled.p`
    color: #B2B2B2;
    margin:0px 0px 0px 0px;
    align-self: stretch;
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 160%; /* 32px */
  `;

const TimerBox = styled.div`
    display: flex;
    height: 572px;
    flex-direction: column;
    align-items: flex-start;
    gap: 32px;
    flex-shrink: 0;
    align-self: stretch;
  `;


const TeacherBox = styled.div`
    display: flex;
    width: 469px;
    flex-direction: column;
    align-items: flex-start;
    gap: 32px;
  `;



export default function Teacher() {


  const navigate = useNavigate();
  return (
    <>
      <Header
        teamName="하람"
        isTeamName="true"
        isCredit="true"
        Credit="20,000"
      />

      <Body>
        <LeftBox>
          <TimerBox>
            <TextBox>
              <TitleText>타이머</TitleText>
              <Text>타이머로 남은 시간을 확인해요</Text>
            </TextBox>
            <Timer />
          </TimerBox>
        </LeftBox>

        <RightBox>

          <TextBox style={{ width: '469px' }}>
            <TitleText >선생님 기능</TitleText>
            <Text>선생님만 다룰 수 있는 기능이에요</Text>
          </TextBox>

          <TeacherBox>
            <Card
              width="469px"
              height="143px"
              title="팀스페이스 조회"
              description="모든 팀과 학생들을 조회해요"
              onClick={() => navigate("/selet")}
            />
            <Card
              title="타자게임"
              description="2시간에 한번, 타자 게임에 도전하세요!"
              isTimer="true"
            />
            <Card
              title="강화하기 게임"
              description="백준 루비를 향한 여정을 시작하세요!"
            />
          </TeacherBox>
        </RightBox>

      </Body >
    </>
  )
}