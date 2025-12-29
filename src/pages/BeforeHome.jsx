import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import Card from "../components/newCard.jsx";
import Timer from "../components/Timer.jsx";
import Header from "../components/Header.jsx";
import TeamRanking from "../components/TeamRanking.jsx";
import StoreImg from "../assets/store.svg";
import Button from "../components/button.jsx";
import { getUserRoleCached } from "../lib/auth.js";


const Body = styled.div`
    display: flex;
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
    margin-left: 3rem;
    margin-right: 1.5rem;
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
    margin-left: 3rem;
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
const DescriptionText = styled.p`
    color: #8B8B8B;
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 160%; /* 22.4px */
    letter-spacing: -0.168px;
    margin: 0;
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

export default function BeforeHome() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserRole = async () => {
      try {
        const role = await getUserRoleCached();
        if (role === 'student' || role === 'teamleader') {
          navigate('/std', { replace: true });
        } else if (role === 'teacher') {
          navigate('/tch', { replace: true });
        }
      } catch (error) {

      }
    };

    checkUserRole();
  }, [navigate]);

  return (
    <>
      <Header
        isLogin="true"
      />

      <Body>
        <LeftBox>
          <TimerBox onClick={() => navigate("/timer")}>
            <TextBox>
              <TitleText style={{cursor: 'pointer'}}>타이머</TitleText>
              <DescriptionText style={{marginTop: '0.5rem'}}>* 타이머 클릭 시 타이머 페이지로 이동합니다. </DescriptionText>
            </TextBox>
            <Timer
              style={{ cursor: 'pointer' }} 
            />
          </TimerBox>

          <TitleText>상점</TitleText>
          <ButtonRow>
            <StoreCard>
              <Storediv>
                <Storeleft>
                  <StoreImgDiv src={StoreImg} />
                  <Text>상품 구매</Text>
                </Storeleft>
                <Button text="들어가기"></Button>
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
              <Card title="추억의 뽑기" />
              <Card title={"강화하기"} />
              <Card title="TTS 메세지" isItem={true} />
            </MinigameBox>
          </GameSection>

          <RankingSection>
            <TitleText>팀 순위</TitleText>
            <DescriptionText>* 해커톤 순위와는 별개로 1~3위까지 상품을 드립니다! </DescriptionText>
            <TeamRanking isBeforeLogin={true} />
          </RankingSection>
        </RightBox>

      </Body >
    </>
  )
}