import React, { useState } from "react";
import styled from "@emotion/styled";
import Header from "../components/Header.jsx";
import { useNavigate } from "react-router-dom";

const Body = styled.div`
  width: 100%;
  min-height: calc(100vh - 100px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  background: #fff;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  max-width: 600px;
  width: 100%;
`;

const Title = styled.h1`
  color: #1D1D1D;
  font-family: Pretendard, sans-serif;
  font-size: 36px;
  font-weight: 700;
  margin: 0;
`;

const RouletteWrapper = styled.div`
  position: relative;
  width: 400px;
  height: 400px;
`;

const RouletteCircle = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  position: relative;
  transition: transform 3s cubic-bezier(0.25, 0.1, 0.25, 1);
  transform: rotate(${props => props.rotation}deg);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
`;

const RouletteSlice = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  clip-path: polygon(50% 50%, 50% 0%, ${props => props.end}% ${props => props.endY}%, 50% 50%);
  transform: rotate(${props => props.rotation}deg);
  background-color: ${props => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SliceText = styled.div`
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(${props => props.rotation}deg);
  color: white;
  font-family: Pretendard, sans-serif;
  font-size: 18px;
  font-weight: 600;
  text-align: center;
  pointer-events: none;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
`;

const Arrow = styled.div`
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
  border-top: 40px solid #F07F23;
  z-index: 10;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
`;

const CenterCircle = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60px;
  height: 60px;
  background: white;
  border-radius: 50%;
  border: 4px solid #F07F23;
  z-index: 5;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
`;

const SpinButton = styled.button`
  padding: 16px 48px;
  background-color: ${props => props.disabled ? '#B2B2B2' : '#F07F23'};
  color: white;
  border: none;
  border-radius: 12px;
  font-family: Pretendard, sans-serif;
  font-size: 20px;
  font-weight: 600;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.2s;

  &:hover {
    background-color: ${props => props.disabled ? '#B2B2B2' : '#E06F13'};
    transform: ${props => props.disabled ? 'none' : 'translateY(-2px)'};
  }

  &:active {
    transform: ${props => props.disabled ? 'none' : 'translateY(0)'};
  }
`;

const ResultText = styled.div`
  font-family: Pretendard, sans-serif;
  font-size: 24px;
  font-weight: 600;
  color: #F07F23;
  min-height: 32px;
  text-align: center;
`;

const BackButton = styled.button`
  position: fixed;
  top: 100px;
  left: 40px;
  padding: 12px 24px;
  background-color: #F5F5F5;
  color: #646464;
  border: none;
  border-radius: 8px;
  font-family: Pretendard, sans-serif;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #E0E0E0;
  }
`;

// 룰렛 아이템 설정
const ITEMS = [
  { text: "크레딧 +100", color: "#FF6B6B" },
  { text: "크레딧 +50", color: "#4ECDC4" },
  { text: "크레딧 +200", color: "#FFE66D" },
  { text: "크레딧 +30", color: "#95E1D3" },
  { text: "크레딧 +150", color: "#F38181" },
  { text: "크레딧 +80", color: "#AA96DA" },
  { text: "꽝!", color: "#8B8B8B" },
  { text: "크레딧 +120", color: "#FCBAD3" },
];

export default function Roulette() {
  const navigate = useNavigate();
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState("");

  const spinRoulette = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setResult("");

    // 랜덤하게 결과 선택
    const randomIndex = Math.floor(Math.random() * ITEMS.length);
    const sliceAngle = 360 / ITEMS.length;

    // 최소 5바퀴 회전 + 랜덤 각도
    const minRotation = 360 * 5;
    const targetRotation = minRotation + (360 - (randomIndex * sliceAngle + sliceAngle / 2));

    setRotation(rotation + targetRotation);

    // 3초 후 결과 표시
    setTimeout(() => {
      setResult(ITEMS[randomIndex].text);
      setIsSpinning(false);
    }, 3000);
  };

  const sliceAngle = 360 / ITEMS.length;

  return (
    <>
      <Header isTeamName="true" isCredit="true" />
      <BackButton onClick={() => navigate('/std')}>← 돌아가기</BackButton>

      <Body>
        <Container>
          <Title>행운의 룰렛</Title>

          <RouletteWrapper>
            <Arrow />
            <RouletteCircle rotation={rotation}>
              {ITEMS.map((item, index) => {
                const startAngle = index * sliceAngle;
                const endAngle = (index + 1) * sliceAngle;

                // 끝점 계산 (원의 둘레 상의 점)
                const endX = 50 + 50 * Math.sin((endAngle * Math.PI) / 180);
                const endY = 50 - 50 * Math.cos((endAngle * Math.PI) / 180);

                return (
                  <React.Fragment key={index}>
                    <RouletteSlice
                      rotation={startAngle}
                      end={endX}
                      endY={endY}
                      color={item.color}
                    />
                    <SliceText rotation={startAngle + sliceAngle / 2}>
                      {item.text}
                    </SliceText>
                  </React.Fragment>
                );
              })}
            </RouletteCircle>
            <CenterCircle />
          </RouletteWrapper>

          <SpinButton onClick={spinRoulette} disabled={isSpinning}>
            {isSpinning ? "회전 중..." : "룰렛 돌리기"}
          </SpinButton>

          <ResultText>
            {result && `결과: ${result}`}
          </ResultText>
        </Container>
      </Body>
    </>
  );
}