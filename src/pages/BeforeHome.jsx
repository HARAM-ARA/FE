import React from "react";
import styled from "@emotion/styled";
import Card from "../components/card.jsx";
import Timer from "../components/Timer.jsx";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header.jsx";


  const Body = styled.div`
    width: 1339px;
    height: 575px;
    display: flex;
    align-items: flex-end;
    gap: 55px;
    margin: 0px 50px 95px 50px;
  `;

  const LeftBox = styled.div`
    width: 609px;
    height: 575px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 27px;
    margin: 0px 0px 0px 0px;
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
    height: 392px;
    flex-direction: column;
    align-items: flex-start;
    gap: 32px;
    flex-shrink: 0;
    align-self: stretch;
  `;


  const MinigameBox = styled.div`
    width: 680px;
    height:464px;
    display: flex;
    align-items: flex-start;
    align-content: flex-start;
    gap: 24px;
    flex-shrink: 0;
    align-self: stretch;
    flex-wrap: wrap;
  `;

  const ButtonRow = styled.div`
    margin:0px 0px 0px 0px;
    width:610px;
    height:151px;
    display: flex;
    align-items: center;
    gap: 24px;
    align-self: stretch;
  `;



export default function BeforeHome() {

  const navigate = useNavigate();
  return (
    <>
      <Header 
      isLogin="true"
      />

      <Body>
        <LeftBox>
          <TimerBox>
            <TextBox>
              <TitleText>타이머</TitleText>
              <Text>타이머로 남은 시간을 확인해요</Text>
            </TextBox>
            <Timer/>
          </TimerBox>

          <ButtonRow>
            <Card
            width="217px"
            height="56px"
            title="크레딧 조회"
            description="클릭하여 우리 팀 잔액을 확인해요"
            />
            <Card
            width="217px"
            height="56px"
            title="상점"
            description="상정에서 원하는 상품을 구매해요"
            />
          </ButtonRow>

        </LeftBox>

        <RightBox>

          <TextBox style={{ width: '390px' }}>
            <TitleText >미니게임</TitleText>
            <Text>미니게임으로 크레딧을 벌어 상점에서 사용해요</Text>
          </TextBox>

          <MinigameBox>
            <Card 
            width="246px"
            height="106px"
            title="추억의 뽑기 게임"
            description="뽑기 버튼 한 번으로 운을 시험해보세요!"
            buttonText="시작하기"
            
            />
            <Card 
            title="타자게임"
            description="2시간에 한번, 타자 게임에 도전하세요!"
            isTimer ="true"
            />
            <Card 
            title="강화하기 게임"
            description="백준 루비를 향한 여정을 시작하세요!"
            buttonText="시작하기"
            />
            <Card 
            title="공룡 게임"
            description="부소마고 선생님들 버전 공룡 게임!?"
            buttonText="시작하기"
            />
          </MinigameBox>
        </RightBox>

      </Body >
    </>
  )
}