import React from "react";
import styled from "@emotion/styled";
import Card from "../components/newCard.jsx";
import Timer from "../components/Timer.jsx";
import TypingGameCard from "../components/TypingGameCard.jsx";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header.jsx";
import { useCredit } from "../context/CreditContext.jsx";
import StoreImg from "../assets/store.svg";
import Button from "../components/button.jsx";
import TeamRanking from "../components/TeamRanking.jsx";


const Body = styled.div`
    width: 100vh;
    height: 575px;
    display: flex;
    align-items: flex-end;
    gap: 55px;
    margin: 0px 50px 95px 50px;
    background: #fff;
  `;

const LeftBox = styled.div`
   
    height: 575px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 27px;
    margin: 0px 0px 0px 0px;
  `;

const RightBox = styled.div`
    flex: 1;
    height: 575px;
    display: flex;
    align-items: flex-start;
    gap: 32px;
    margin: 0px 0px 0px 0px;
  `;

const GameSection = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 32px;
  `;

const RankingSection = styled.div`
    width: 340px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  `;


const TextBox = styled.div`
    
    margin: 0px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
   
    
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
    color: #000;
    font-feature-settings: 'liga' off, 'clig' off;
    font-family: Pretendard;
    font-size: 24px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
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
    display: flex;
    align-items: flex-start;
    align-content: flex-start;
    margin-top:0px;
    gap: 24px;
    flex-shrink: 0;
    align-self: stretch;
    flex-wrap: wrap;
  `;

const ButtonRow = styled.div`
    margin:0px 0px 0px 0px;
    display: flex;
    align-items: center;
    gap: 24px;
    align-self: stretch;
  `;

const StoreCard = styled.div`
    display: flex;
    padding: 30px 47px 31px 47px;
    justify-content: center;
    align-items: center;
    border-radius: 12px;
    border: 1px solid #8B8B8B;
`;

const Storediv = styled.div`
    display: flex;
    align-items: center;
    gap: 18px;
`;
const Storeleft = styled.div`
    display: flex;
    width: 390px;
    align-items: center;
    gap: 18px;
`;

const StoreImgDiv = styled.img`
    width: 50px;
    height: 50px;
    flex-shrink: 0;
`;


export default function Student() {
  const navigate = useNavigate();
  const { credit } = useCredit();


  return (
    <>
      <Header
        isTeamName="true"
        isCredit="true"
      />

      <Body>
        <LeftBox>
          <TimerBox>
            <TextBox>
              <TitleText>타이머</TitleText>
            </TextBox>
            <Timer />
          </TimerBox>

          <TitleText>상점</TitleText>
          <ButtonRow>
            <StoreCard>
              <Storediv>
                <Storeleft>
                  <StoreImgDiv src={StoreImg} />
                  <Text>상품 구매</Text>
                </Storeleft>
                <Button text="들어가기" onClick={()=>navigate('/store')}></Button>
              </Storediv>
            </StoreCard>
          </ButtonRow>
        </LeftBox>

        <RightBox>
          <GameSection>
            <TextBox>
              <TitleText>미니게임</TitleText>
            </TextBox>

            <MinigameBox>
              <Card title="추억의 뽑기" onClick={()=>navigate('/select')}/>
              <Card title={"타자게임"}  onClick={()=>navigate('/typing')}/>
              <Card title={"강화하기"}  onClick={()=>navigate('/enforce')}/>
              <Card title={"테트리스"}  onClick={()=>window.location.href="https://tetr.io/"}/>
              <Card title={"공룡게임"}  onClick={()=>navigate('/dino')}/>
            </MinigameBox>
          </GameSection>

          <RankingSection>
            <TitleText>팀 순위</TitleText>
            <TeamRanking />
          </RankingSection>
        </RightBox>

      </Body >
    </>
  )
}