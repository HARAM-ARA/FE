import React, { useState } from "react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { AxiosInstnce as customaxios } from "../lib/customAxios.js";
import Header from "../components/Header.jsx";
import { mockdata } from "../data/studentData.js";

const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px;
  background: #fff;
  min-height: calc(100vh - 200px);
`;

const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const TitleSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Title = styled.h1`
    color: #1D1D1D;
    font-family: Pretendard;
    font-size: 28px;
    font-style: normal;
    font-weight: 700;
    line-height: 160%; /* 44.8px */
    margin:0;
`;

const Subtitle = styled.p`
  color: #B2B2B2;
  font-family: Pretendard;
  font-size: 20px;
  font-weight: 400;
  margin: 0;
`;

const TracksContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

const TrackCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 48px;
  border-radius: 16px;
  
  width: 500px;
`;

const TrackTitle = styled.h2`
  color: #1D1D1D;
  font-family: Pretendard;
  font-size: 28px;
  font-weight: 700;
  margin: 0;
`;

const TeamInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

const InfoText = styled.p`
  color: #B2B2B2;
  font-family: Pretendard;
  font-size: 18px;
  font-weight: 500;
  margin: 0;
  text-align: center;
`;

const GenerateButton = styled.button`
  padding: 16px 48px;
  border-radius: 12px;
  border: 1px solid #8B8B8B;
  background: #FFFFFF;
  color: #1D1D1D;
  font-family: Pretendard;
  font-size: 20px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 2rem;
  transition: all 0.2s;
    color: #B2B2B2;

  &:hover {
    background: #F5F5F5;
  }

  &:active {
    background: #E5E5E5;
  }
`;

const ResultSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-top: 40px;
  padding: 32px;
  border-radius: 16px;
  background: #F9F9F9;
`;

const ResultTitle = styled.h3`
  color: #1D1D1D;
  font-family: Pretendard;
  font-size: 24px;
  font-weight: 700;
  margin: 0;
`;

const TeamList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const TeamItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 20px;
  border-radius: 12px;
  background: #FFFFFF;
  border: 1px solid #E5E5E5;
`;

const TeamName = styled.div`
  color: #F07F23;
  font-family: Pretendard;
  font-size: 20px;
  font-weight: 700;
`;

const MemberList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const Member = styled.span`
  color: #1D1D1D;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 500;
  padding: 6px 12px;
  border-radius: 8px;
  background: #F5F5F5;
`;

const SaveButton = styled.button`
  padding: 16px 48px;
  border-radius: 12px;
  border: none;
  background: #F07F23;
  color: #FFFFFF;
  font-family: Pretendard;
  font-size: 20px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  align-self: center;
  margin-top: 20px;

  &:hover {
    background: #E06F1F;
  }

  &:active {
    background: #D05F1A;
  }

  &:disabled {
    background: #B2B2B2;
    cursor: not-allowed;
  }
`;

// 카운트다운 오버레이 스타일
const CountdownOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  backdrop-filter: blur(10px);
`;

const CountdownContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
`;

const CountdownNumber = styled.div`
  font-size: 200px;
  font-weight: 900;
  color: #F07F23;
  text-shadow: 0 0 50px rgba(240, 127, 35, 0.8);
  animation: ${props => props.animate ? 'countdownPulse' : 'none'} 0.8s ease-out;
  font-family: 'Arial Black', sans-serif;
  
  @keyframes countdownPulse {
    0% {
      transform: scale(0.5);
      opacity: 0;
      filter: blur(20px);
    }
    50% {
      transform: scale(1.2);
      opacity: 1;
      filter: blur(0px);
    }
    100% {
      transform: scale(1);
      opacity: 1;
      filter: blur(0px);
    }
  }
`;

const CountdownText = styled.div`
  font-size: 32px;
  font-weight: 700;
  color: white;
  text-align: center;
  font-family: Pretendard;
  animation: ${props => props.animate ? 'textGlow' : 'none'} 0.8s ease-out;
  
  @keyframes textGlow {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const Fireworks = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
  
  &::before, &::after {
    content: '';
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    animation: firework 2s ease-out infinite;
  }
  
  &::before {
    background: #FF6B6B;
    top: 20%;
    left: 20%;
    animation-delay: 0s;
  }
  
  &::after {
    background: #4ECDC4;
    top: 30%;
    right: 20%;
    animation-delay: 0.5s;
  }
  
  @keyframes firework {
    0% {
      transform: scale(1);
      box-shadow: 0 0 0 0 currentColor,
                  0 0 0 0 currentColor,
                  0 0 0 0 currentColor,
                  0 0 0 0 currentColor;
    }
    25% {
      transform: scale(1.2);
      box-shadow: 30px 0 0 -4px currentColor,
                  -30px 0 0 -4px currentColor,
                  0 30px 0 -4px currentColor,
                  0 -30px 0 -4px currentColor;
    }
    50% {
      transform: scale(1);
      box-shadow: 60px 0 0 -8px transparent,
                  -60px 0 0 -8px transparent,
                  0 60px 0 -8px transparent,
                  0 -60px 0 -8px transparent;
    }
    100% {
      transform: scale(1);
      box-shadow: 60px 0 0 -8px transparent,
                  -60px 0 0 -8px transparent,
                  0 60px 0 -8px transparent,
                  0 -60px 0 -8px transparent;
    }
  }
`;

const Confetti = styled.div`
  position: absolute;
  width: 10px;
  height: 10px;
  background: ${props => props.color || '#F07F23'};
  animation: confetti 3s ease-out infinite;
  animation-delay: ${props => props.delay || '0s'};
  
  @keyframes confetti {
    0% {
      transform: translateY(-100vh) rotate(0deg);
      opacity: 1;
    }
    100% {
      transform: translateY(100vh) rotate(720deg);
      opacity: 0;
    }
  }
`;

// 추가 이펙트들
const ShockWave = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100px;
  height: 100px;
  border: 3px solid #F07F23;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  animation: ${props => props.animate ? 'shockwave' : 'none'} 1s ease-out;
  
  @keyframes shockwave {
    0% {
      width: 100px;
      height: 100px;
      opacity: 1;
    }
    100% {
      width: 800px;
      height: 800px;
      opacity: 0;
    }
  }
`;

const ParticleSystem = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 4px;
  height: 4px;
  background: ${props => props.color};
  border-radius: 50%;
  animation: particle ${props => props.duration}s linear infinite;
  animation-delay: ${props => props.delay}s;
  
  @keyframes particle {
    0% {
      transform: translate(-50%, -50%) rotate(0deg) translateX(0px) rotate(0deg);
      opacity: 1;
    }
    100% {
      transform: translate(-50%, -50%) rotate(360deg) translateX(${props => props.distance}px) rotate(-360deg);
      opacity: 0;
    }
  }
`;

const LightBeam = styled.div`
  position: absolute;
  top: 0;
  left: ${props => props.left}%;
  width: 2px;
  height: 100%;
  background: linear-gradient(to bottom, transparent, #F07F23, transparent);
  animation: lightbeam 2s ease-in-out infinite;
  animation-delay: ${props => props.delay}s;
  
  @keyframes lightbeam {
    0%, 100% {
      opacity: 0;
      transform: scaleY(0);
    }
    50% {
      opacity: 1;
      transform: scaleY(1);
    }
  }
`;

const RainbowRing = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 200px;
  height: 200px;
  border: 8px solid transparent;
  border-radius: 50%;
  background: conic-gradient(from 0deg, #ff0000, #ff8000, #ffff00, #80ff00, #00ff00, #00ff80, #00ffff, #0080ff, #0000ff, #8000ff, #ff0080, #ff0000);
  background-clip: padding-box;
  transform: translate(-50%, -50%);
  animation: ${props => props.animate ? 'rainbowSpin' : 'none'} 2s linear infinite;
  
  &::before {
    content: '';
    position: absolute;
    top: -8px;
    left: -8px;
    right: -8px;
    bottom: -8px;
    background: conic-gradient(from 0deg, #ff0000, #ff8000, #ffff00, #80ff00, #00ff00, #00ff80, #00ffff, #0080ff, #0000ff, #8000ff, #ff0080, #ff0000);
    border-radius: 50%;
    z-index: -1;
  }
  
  @keyframes rainbowSpin {
    0% {
      transform: translate(-50%, -50%) rotate(0deg) scale(0.5);
      opacity: 0;
    }
    50% {
      opacity: 1;
      transform: translate(-50%, -50%) rotate(180deg) scale(1.2);
    }
    100% {
      transform: translate(-50%, -50%) rotate(360deg) scale(0.8);
      opacity: 0.7;
    }
  }
`;

const StarBurst = styled.div`
  position: absolute;
  top: ${props => props.top}%;
  left: ${props => props.left}%;
  width: 20px;
  height: 20px;
  
  &::before, &::after {
    content: '✨';
    position: absolute;
    font-size: 24px;
    animation: starburst 1.5s ease-out infinite;
    animation-delay: ${props => props.delay}s;
  }
  
  &::before {
    animation-delay: ${props => props.delay}s;
  }
  
  &::after {
    animation-delay: ${props => props.delay + 0.3}s;
  }
  
  @keyframes starburst {
    0% {
      transform: scale(0) rotate(0deg);
      opacity: 0;
    }
    50% {
      transform: scale(1.5) rotate(180deg);
      opacity: 1;
    }
    100% {
      transform: scale(0) rotate(360deg);
      opacity: 0;
    }
  }
`;

const ElectricBolt = styled.div`
  position: absolute;
  top: 20%;
  left: 10%;
  width: 80%;
  height: 60%;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath d='M20 10 L40 30 L30 30 L50 60 L70 40 L60 40 L80 10 L60 20 L70 20 L50 50 L30 30 L40 30 Z' fill='%23FFD700' stroke='%23FFA500' stroke-width='2'/%3E%3C/svg%3E") no-repeat center;
  background-size: contain;
  animation: ${props => props.animate ? 'electricBolt' : 'none'} 0.5s ease-out;
  opacity: 0;
  
  @keyframes electricBolt {
    0%, 100% {
      opacity: 0;
      transform: scale(0.5);
    }
    20%, 80% {
      opacity: 1;
      transform: scale(1.2);
    }
    50% {
      opacity: 0.8;
      transform: scale(1);
    }
  }
`;

const MatrixRain = styled.div`
  position: absolute;
  top: 0;
  left: ${props => props.left}%;
  width: 2px;
  height: 100%;
  background: linear-gradient(to bottom, transparent, #00ff00, transparent);
  animation: matrixRain 1s linear infinite;
  animation-delay: ${props => props.delay}s;
  opacity: 0.7;
  
  @keyframes matrixRain {
    0% {
      transform: translateY(-100%);
    }
    100% {
      transform: translateY(100vh);
    }
  }
`;

const PulseWave = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 50px;
  height: 50px;
  border: 2px solid #FF6B6B;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  animation: ${props => props.animate ? 'pulseWave' : 'none'} 1.5s ease-out infinite;
  
  @keyframes pulseWave {
    0% {
      width: 50px;
      height: 50px;
      opacity: 1;
    }
    100% {
      width: 600px;
      height: 600px;
      opacity: 0;
    }
  }
`;

export default function RandomTeamGenerator() {
  const navigate = useNavigate();
  const [softwareTeams, setSoftwareTeams] = useState(null);
  const [embeddedTeams, setEmbeddedTeams] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [showCountdown, setShowCountdown] = useState(false);
  const [countdownNumber, setCountdownNumber] = useState(3);
  const [countdownText, setCountdownText] = useState("");
  const [animateNumber, setAnimateNumber] = useState(false);
  const [animateText, setAnimateText] = useState(false);
  const [currentGenerationType, setCurrentGenerationType] = useState(null);
  const [showShockWave, setShowShockWave] = useState(false);
  const [showRainbowRing, setShowRainbowRing] = useState(false);
  const [showElectricBolt, setShowElectricBolt] = useState(false);
  const [showPulseWave, setShowPulseWave] = useState(false);


  // 카운트다운 실행 함수
  const startCountdown = (type) => {
    setCurrentGenerationType(type);
    setShowCountdown(true);
    setCountdownNumber(10);
    setCountdownText("팀 생성 준비 중...");
    setAnimateNumber(true);
    setAnimateText(true);
    setShowShockWave(true);
    setShowElectricBolt(true);

    // 10초 카운트다운
    const countdownSteps = [
      { number: 9, text: "학생 데이터 로딩 중...", delay: 1000 },
      { number: 8, text: "알고리즘 초기화 중...", delay: 2000 },
      { number: 7, text: "학생들을 섞는 중...", delay: 3000 },
      { number: 6, text: "팀 구성 계산 중...", delay: 4000 },
      { number: 5, text: "밸런스 조정 중...", delay: 5000 },
      { number: 4, text: "최적화 진행 중...", delay: 6000 },
      { number: 3, text: "마지막 검증 중...", delay: 7000 },
      { number: 2, text: "최종 조정 중...", delay: 8000 },
      { number: 1, text: "거의 완료...", delay: 9000 },
      { number: "🎉", text: "팀 생성 완료!", delay: 10000 }
    ];

    countdownSteps.forEach((step, index) => {
      setTimeout(() => {
        setAnimateNumber(false);
        setShowShockWave(false);
        setShowElectricBolt(false);
        setShowRainbowRing(false);
        setShowPulseWave(false);
        
        setTimeout(() => {
          setCountdownNumber(step.number);
          setAnimateNumber(true);
          setCountdownText(step.text);
          setAnimateText(true);
          
          // 다양한 효과를 번갈아가며 표시
          if (index % 4 === 0) {
            setShowShockWave(true);
            setShowElectricBolt(true);
          } else if (index % 4 === 1) {
            setShowRainbowRing(true);
          } else if (index % 4 === 2) {
            setShowPulseWave(true);
            setShowElectricBolt(true);
          } else {
            setShowRainbowRing(true);
            setShowPulseWave(true);
          }
        }, 50);
      }, step.delay - 800);
    });

    // 최종 팀 생성 및 오버레이 종료
    setTimeout(() => {
      if (type === 'software') {
        const teams = generateSoftwareTeams();
        setSoftwareTeams(teams);
      } else if (type === 'embedded') {
        const teams = generateEmbeddedTeams();
        setEmbeddedTeams(teams);
      }
      setShowCountdown(false);
      setShowRainbowRing(false);
      setShowPulseWave(false);
    }, 11000);
  };

  const getSoftwareStudents = () => {
    // Combine team1 and team2, then filter by year
    const allSoftware = [...mockdata.team1, ...mockdata.team2];
    const secondYear = allSoftware.filter(s => s.id.startsWith('2'));
    const firstYear = allSoftware.filter(s => s.id.startsWith('1'));
    return { secondYear, firstYear };
  };

  const shuffle = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // 소프트웨어 팀 생성 - 유연한 팀 구성
  const generateSoftwareTeams = () => {
    const { secondYear, firstYear } = getSoftwareStudents();
    
    console.log(`소프트웨어 학생 수 - 2학년: ${secondYear.length}명, 1학년: ${firstYear.length}명`);
    
    // 랜덤 셔플
    const availableSecond = shuffle([...secondYear]);
    const availableFirst = shuffle([...firstYear]);
    const totalStudents = availableSecond.length + availableFirst.length;

    // Generate team numbers for SW (1-28 excluding 3, 8, 13, 18, 23, 28)
    const embeddedNumbers = [3, 8, 13, 18, 23, 28];
    const swNumbers = Array.from({ length: 28 }, (_, i) => i + 1).filter(n => !embeddedNumbers.includes(n));

    const teams = [];
    let secondIdx = 0;
    let firstIdx = 0;
    let numberIdx = 0;

    // 목표 팀 구성: 4명 팀을 우선으로 하되, 학생 수에 맞춰 조정
    const targetTeamCount = Math.min(22, Math.ceil(totalStudents / 4)); // 최대 22팀, 최소 4명씩
    const studentsPerTeam = Math.floor(totalStudents / targetTeamCount);
    const extraStudents = totalStudents % targetTeamCount;

    console.log(`목표 팀 수: ${targetTeamCount}개, 기본 인원: ${studentsPerTeam}명, 추가 배정: ${extraStudents}명`);

    // 팀 생성
    for (let i = 0; i < targetTeamCount && numberIdx < swNumbers.length; i++) {
      const teamSize = studentsPerTeam + (i < extraStudents ? 1 : 0);
      const members = [];
      
      // 각 팀에 2학년과 1학년을 적절히 배분
      const secondInTeam = Math.min(Math.ceil(teamSize * 0.5), availableSecond.length - secondIdx);
      const firstInTeam = teamSize - secondInTeam;

      // 2학년 학생 추가
      for (let j = 0; j < secondInTeam && secondIdx < availableSecond.length; j++) {
        members.push(availableSecond[secondIdx++]);
      }

      // 1학년 학생 추가
      for (let j = 0; j < firstInTeam && firstIdx < availableFirst.length; j++) {
        members.push(availableFirst[firstIdx++]);
      }

      // 팀 크기가 부족하면 남은 학생들로 채우기
      while (members.length < teamSize) {
        if (secondIdx < availableSecond.length) {
          members.push(availableSecond[secondIdx++]);
        } else if (firstIdx < availableFirst.length) {
          members.push(availableFirst[firstIdx++]);
        } else {
          break;
        }
      }

      if (members.length > 0) {
        teams.push({
          name: `소프트웨어 ${swNumbers[numberIdx++]}팀`,
          members
        });
      }
    }

    // 남은 학생들을 기존 팀에 배분
    const remainingStudents = [
      ...availableSecond.slice(secondIdx),
      ...availableFirst.slice(firstIdx)
    ];

    remainingStudents.forEach((student, index) => {
      if (teams.length > 0) {
        teams[index % teams.length].members.push(student);
      }
    });

    console.log(`생성된 팀 수: ${teams.length}개`);
    console.log(`총 배정된 학생: ${teams.reduce((sum, team) => sum + team.members.length, 0)}명`);
    console.log('팀별 구성:', teams.map(team => {
      const second = team.members.filter(m => m.id.startsWith('2')).length;
      const first = team.members.filter(m => m.id.startsWith('1')).length;
      return `${team.name}: ${team.members.length}명 (2학년: ${second}명, 1학년: ${first}명)`;
    }));
    
    return teams;
  };


  const generateEmbeddedTeams = () => {
    // 고정된 임베디드 2학년 팀들
    const fixedTeams = [
      { name: "임베디드 3팀", members: [...mockdata.team4] }, // 정태양, 공재욱
      { name: "임베디드 8팀", members: [...mockdata.team5] }, // 김민석, 제성주
      { name: "임베디드 13팀", members: [...mockdata.team6] }, // 이승환, 이주영
      { name: "임베디드 18팀", members: [...mockdata.team7] }, // 안재민, 방민준
      { name: "임베디드 23팀", members: [...mockdata.team8] }, // 김우성
      { name: "임베디드 28팀", members: [...mockdata.team9] }, // 김현호
    ];

    // team3에서 1학년 학생들을 랜덤으로 섞기
    const availableFirstYear = shuffle([...mockdata.team3]);
    
    console.log(`임베디드 1학년 학생 수: ${availableFirstYear.length}명`);
    console.log(`임베디드 팀 수: ${fixedTeams.length}개`);
    
    let firstYearIndex = 0;
    
    // 각 팀에 1학년 학생들을 균등하게 배분
    const studentsPerTeam = Math.floor(availableFirstYear.length / fixedTeams.length);
    const extraStudents = availableFirstYear.length % fixedTeams.length;
    
    fixedTeams.forEach((team, teamIndex) => {
      // 기본적으로 각 팀에 균등하게 배분
      const studentsToAdd = studentsPerTeam + (teamIndex < extraStudents ? 1 : 0);
      
      for (let i = 0; i < studentsToAdd && firstYearIndex < availableFirstYear.length; i++) {
        team.members.push(availableFirstYear[firstYearIndex++]);
      }
    });

    // 남은 학생이 있다면 첫 번째 팀부터 순서대로 추가
    while (firstYearIndex < availableFirstYear.length) {
      for (let i = 0; i < fixedTeams.length && firstYearIndex < availableFirstYear.length; i++) {
        fixedTeams[i].members.push(availableFirstYear[firstYearIndex++]);
      }
    }

    console.log('임베디드 팀 구성 완료:', fixedTeams.map(team => `${team.name}: ${team.members.length}명`));
    
    return fixedTeams;
  };

  const handleGenerateSoftware = () => {
    startCountdown('software');
  };

  const handleGenerateEmbedded = () => {
    startCountdown('embedded');
  };

  // 팀 데이터를 백엔드로 전송
  const handleSaveTeams = async () => {
    const allTeams = [...(softwareTeams || []), ...(embeddedTeams || [])];

    if (allTeams.length === 0) {
      alert("생성된 팀이 없습니다. 먼저 팀을 생성해주세요.");
      return;
    }

    try {
      setIsSaving(true);
      const token = localStorage.getItem("auth_token");


      // 팀 이름에서 번호를 추출하여 사용 (예: "소프트웨어 5팀" → 5, "임베디드 3팀" → 3)
      const teamsObject = allTeams.reduce((acc, team) => {
        const teamNumber = parseInt(team.name.match(/\d+/)[0]);
        acc[teamNumber] = team.members.map(member => parseInt(member.id));
        return acc;
      }, {});

      const requestBody = {
        teams: teamsObject
      };



      const response = await customaxios.post(
        `${import.meta.env.VITE_API_URL}tch/append`,
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );


      alert("팀이 성공적으로 생성되었습니다!");
      navigate('/teams');
    } catch (error) {

      alert("팀 저장에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <Header isTeacher={true} />
      <Body>
        <Container>
          <TitleSection>
            <Title>팀 랜덤 생성</Title>
            <Subtitle>소프트웨어개발 트랙과 임베디드소프트웨어 트랙을 나눠 팀을 랜덤 생성해요</Subtitle>
          </TitleSection>

          <TracksContainer>

            <TrackCard>
              <TrackTitle>소프트웨어개발 트랙</TrackTitle>
              <TeamInfo>
                <InfoText>4명 팀 16개: 2학년 2명 + 1학년 2명</InfoText>
                <InfoText>5명 팀 4개: 2학년 3명 + 1학년 2명</InfoText>
                <InfoText>5명 팀 2개: 2학년 2명 + 1학년 3명</InfoText>
              </TeamInfo>
              <GenerateButton onClick={handleGenerateSoftware}>
                랜덤으로 팀 생성하기
              </GenerateButton>
            </TrackCard>


            <TrackCard>
              <TrackTitle>임베디드소프트웨어 트랙</TrackTitle>
              <TeamInfo>
                <InfoText>총 27명 (2학년 9명 + 1학년 18명)</InfoText>
                <InfoText>고정된 2학년 팀 + 1학년 균등 배분</InfoText>
                <InfoText>6개 팀 (3-5명 구성)</InfoText>
              </TeamInfo>
              <GenerateButton onClick={handleGenerateEmbedded}>
                랜덤으로 팀 생성하기
              </GenerateButton>
            </TrackCard>
          </TracksContainer>

          {softwareTeams && (
            <ResultSection>
              <ResultTitle>소프트웨어개발 트랙 팀 목록</ResultTitle>
              <TeamList>
                {softwareTeams
                  .sort((a, b) => {
                    const aMatch = a.name.match(/\d+/);
                    const bMatch = b.name.match(/\d+/);
                    if (!aMatch || !bMatch) return 0;
                    const aNum = parseInt(aMatch[0]);
                    const bNum = parseInt(bMatch[0]);
                    return aNum - bNum;
                  })
                  .map((team, idx) => (
                    <TeamItem key={idx}>
                      <TeamName>{team.name}</TeamName>
                      <MemberList>
                        {team.members
                          .sort((a, b) => a.id.localeCompare(b.id))
                          .map((member, mIdx) => (
                            member && <Member key={mIdx}>{member.name} ({member.id})</Member>
                          ))}
                      </MemberList>
                    </TeamItem>
                  ))}
              </TeamList>
            </ResultSection>
          )}


          {embeddedTeams && (
            <ResultSection>
              <ResultTitle>임베디드소프트웨어 트랙 팀 목록</ResultTitle>
              <TeamList>
                {embeddedTeams
                  .sort((a, b) => {
                    const aMatch = a.name.match(/\d+/);
                    const bMatch = b.name.match(/\d+/);
                    if (!aMatch || !bMatch) return 0;
                    const aNum = parseInt(aMatch[0]);
                    const bNum = parseInt(bMatch[0]);
                    return aNum - bNum;
                  })
                  .map((team, idx) => (
                    <TeamItem key={idx}>
                      <TeamName>{team.name}</TeamName>
                      <MemberList>
                        {team.members
                          .sort((a, b) => a.id.localeCompare(b.id))
                          .map((member, mIdx) => (
                            member && <Member key={mIdx}>{member.name} ({member.id})</Member>
                          ))}
                      </MemberList>
                    </TeamItem>
                  ))}
              </TeamList>
            </ResultSection>
          )}

          {(softwareTeams || embeddedTeams) && (
            <SaveButton onClick={handleSaveTeams} disabled={isSaving}>
              {isSaving ? "저장 중..." : "팀 저장하기"}
            </SaveButton>
          )}
        </Container>
      </Body>

      {/* 카운트다운 오버레이 */}
      {showCountdown && (
        <CountdownOverlay>
          <Fireworks />
          
          {/* 충격파 효과 */}
          {showShockWave && <ShockWave animate={showShockWave} />}
          
          {/* 무지개 링 */}
          {showRainbowRing && <RainbowRing animate={showRainbowRing} />}
          
          {/* 전기 볼트 */}
          {showElectricBolt && <ElectricBolt animate={showElectricBolt} />}
          
          {/* 펄스 웨이브 */}
          {showPulseWave && <PulseWave animate={showPulseWave} />}
          
          {/* 라이트 빔들 */}
          {Array.from({ length: 8 }, (_, i) => (
            <LightBeam
              key={`beam-${i}`}
              left={i * 12.5}
              delay={i * 0.2}
            />
          ))}
          
          {/* 매트릭스 레인 */}
          {Array.from({ length: 20 }, (_, i) => (
            <MatrixRain
              key={`matrix-${i}`}
              left={i * 5}
              delay={Math.random() * 2}
            />
          ))}
          
          {/* 파티클 시스템 */}
          {Array.from({ length: 30 }, (_, i) => (
            <ParticleSystem
              key={`particle-${i}`}
              color={['#F07F23', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#FFD700'][i % 7]}
              duration={2 + Math.random() * 2}
              delay={Math.random() * 2}
              distance={100 + Math.random() * 200}
            />
          ))}
          
          {/* 스타버스트 */}
          {Array.from({ length: 15 }, (_, i) => (
            <StarBurst
              key={`star-${i}`}
              top={Math.random() * 100}
              left={Math.random() * 100}
              delay={Math.random() * 3}
            />
          ))}
          
          {/* 컨페티 효과 */}
          {Array.from({ length: 80 }, (_, i) => (
            <Confetti
              key={i}
              color={['#F07F23', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#FFD700', '#FF69B4'][i % 8]}
              delay={`${Math.random() * 3}s`}
              style={{
                left: `${Math.random() * 100}%`,
                animationDuration: `${2 + Math.random() * 3}s`,
                width: `${8 + Math.random() * 8}px`,
                height: `${8 + Math.random() * 8}px`,
              }}
            />
          ))}
          
          <CountdownContainer>
            <CountdownNumber animate={animateNumber}>
              {countdownNumber}
            </CountdownNumber>
            <CountdownText animate={animateText}>
              {countdownText}
            </CountdownText>
          </CountdownContainer>
        </CountdownOverlay>
      )}
    </>
  );
}