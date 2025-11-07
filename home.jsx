import React from "react";
import styled from "@emotion/styled";
import HaramLogo from "../assets/Logo.svg";
import Button from "./FE/button";
import Card from "./FE/card";

const Header = styled.div`
    width: 1340px;
    height: 90px;
    margin:26px 50px 47px 50px;
    display:flex;
    align-items: center;
    gap: 732px;
    justify-content: flex-end;
  `;

const LogoImg = styled.img`
    width:220px;
    height:90px;
  `;

const FunctionBox = styled.div`
    width:238px;
    height:90px;
    display:flex;
    align-items: center;
    margin-left: auto;
  `;

const AmountBtn = styled.div`
    width:92px;
    height:24px;
    display:flex;
    justify-content: center;
    align-items: center;
    padding: 12px 20px;
    cursor:pointer;
    
  `;

// const AmountText = styled.p`
//   font-size: 20px;
//   font-family: 'Pretendard', sans-serif;
//   font-style: normal;
//   font-weight: 500;
//   line-height: normal;
//   color: var(--Primary-200, #F07F23);

// `;

const LoginBtn = styled.button`
    width:94px;
    height:48px;
    padding: 12px 20px;
    border-radius: var(--XS, 8px);
    background: var(--Primary-200, #F07F23);
    color: var(--white, #FFF);
    text-align: center;
    font-size: 20px;
    font-family: 'Pretendard', sans-serif;
    font-style: normal;
    font-weight: 500;
    color: var(--white, #FFF);
    text-align: center;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    &:focus {
      outline: none;
    }
    border:none;
  `;

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
    gap: 32px;
    
        
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

const TimerCard = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 24px;
    align-self: stretch;
    background-color:white;
    width:609px;
    height:281px;
    border-radius: 12px;
    border: 1px solid #8B8B8B;
  `;
const MiniBox = styled.div`
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



export default function home() {

  return (
    <>
      <Header>
        <LogoImg src={HaramLogo}></LogoImg>
        <FunctionBox>
          <AmountBtn>
            {/* AmountText>크레딧 통장</AmountText>< */}
          </AmountBtn>
          <LoginBtn>로그인</LoginBtn>
        </FunctionBox>
      </Header>

      <Body>
        <LeftBox>
          <TimerBox>
            <TextBox>
              <TitleText>타이머</TitleText>
              <Text>타이머로 남은 시간을 확인해요</Text>
            </TextBox>
            <TimerCard>
              ddddd
            </TimerCard>
          </TimerBox>
        </LeftBox>

        <RightBox>

          <TextBox style={{ width: '390px' }}>
            <TitleText >미니게임</TitleText>
            <Text>미니게임으로 크레딧을 벌어 상점에서 사용해요</Text>
          </TextBox>

          <MiniBox>
            <Card>
              <TitleText style={{
                color: '#1D1D1D',
                fontFamily: 'Pretendard',
                fontSize: '24px',
                fontStyle: 'normal',
                fontWeight: '500',
                lineHeight: 'normal'
              }}>추억의 뽑기 게임</TitleText>
              <Text style={{
                color: '#B2B2B2',
                fontFamily: 'Pretendard',
                fontSize: '16px',
                fontStyle: 'normal',
                fontWeight: '400',
                lineHeight: 'normal'
              }}>뽑기 버튼 한 번으로 운을 시험해보세요!</Text>
              <Button text="시작하기"> </Button>
            </Card>
            <Card>
              <TitleText style={{
                color: '#1D1D1D',
                fontFamily: 'Pretendard',
                fontSize: '24px',
                fontStyle: 'normal',
                fontWeight: '500',
                lineHeight: 'normal'
              }}>타자게임</TitleText>
              <Text style={{
                color: '#B2B2B2',
                fontFamily: 'Pretendard',
                fontSize: '16px',
                fontStyle: 'normal',
                fontWeight: '400',
                lineHeight: 'normal'
              }}>2시간에 한번, 타자 게임에 도전하세요!</Text>
              <Button text="나중에 시간 띄우기"> </Button>
            </Card>
            <Card>
              <TitleText style={{
                color: '#1D1D1D',
                fontFamily: 'Pretendard',
                fontSize: '24px',
                fontStyle: 'normal',
                fontWeight: '500',
                lineHeight: 'normal'
              }}>강화하기 게임</TitleText>
              <Text style={{
                color: '#B2B2B2',
                fontFamily: 'Pretendard',
                fontSize: '16px',
                fontStyle: 'normal',
                fontWeight: '400',
                lineHeight: 'normal'
              }}>백준 루비를 향한 여정을 시작하세요!</Text>
              <Button text="시작하기"> </Button>
            </Card>
            <Card>
              <TitleText style={{
                color: '#1D1D1D',
                fontFamily: 'Pretendard',
                fontSize: '24px',
                fontStyle: 'normal',
                fontWeight: '500',
                lineHeight: 'normal'
              }}>공룡 게임</TitleText>
              <Text style={{
                color: '#B2B2B2',
                fontFamily: 'Pretendard',
                fontSize: '16px',
                fontStyle: 'normal',
                fontWeight: '400',
                lineHeight: 'normal'
              }}>부소마고 선생님들 버전 공룡 게임!?</Text>
              <Button text="시작하기"> </Button>
            </Card>
          </MiniBox>
        </RightBox>
      </Body >
    </>
  )
}