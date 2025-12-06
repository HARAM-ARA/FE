
import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import Header from "../components/Header";
import FunctionMenu from "../components/EnforceComponent/FunctionMenu.jsx";
import TierDisplay from "../components/EnforceComponent/TierDisplay.jsx";
import ProblemStats from "../components/EnforceComponent/ProblemStats.jsx";
import { useNavigate } from "react-router-dom";
import bronze from "../assets/bronze.svg";
import sliver from "../assets/sliver.svg";
import gold from "../assets/gold.svg";
import platinum from "../assets/platinum.svg";
import diamomd from "../assets/Diamond.svg";
import ruby from "../assets/ruby.svg";
import ModalComponent from "../components/ModalComponent";
import Failure from "../assets/failure.svg";
import icon1hover from "../assets/icon1hover.svg";
import icon2hover from "../assets/icon2hover.svg";
import icon3hover from "../assets/icon3hover.svg";
import crown from "../assets/crown.svg";

const Body = styled.div`
  height: 650px;
  display: flex;
  align-items: center;
  gap: 12%;
  margin: 0px 50px 95px 50px;
  background: #fff;
`;

// 티어 정보 배열 (5에서 1로 감소)
const TIERS = [
  {
    name: '브론즈',
    image: bronze,
    levels: {
      5: { successRate: 1.0, problems: 10, credit: 100 },
      4: { successRate: 1.0, problems: 10, credit: 100 },
      3: { successRate: 0.95, problems: 10, credit: 100 },
      2: { successRate: 0.95, problems: 10, credit: 100 },
      1: { successRate: 0.95, problems: 10, credit: 100 }
    }
  },
  {
    name: '실버',
    image: sliver,
    levels: {
      5: { successRate: 0.8, problems: 20, credit: 200 },
      4: { successRate: 0.8, problems: 20, credit: 200 },
      3: { successRate: 0.8, problems: 20, credit: 200 },
      2: { successRate: 0.8, problems: 20, credit: 200 },
      1: { successRate: 0.8, problems: 20, credit: 200 }
    }
  },
  {
    name: '골드',
    image: gold,
    levels: {
      5: { successRate: 0.6, problems: 30, credit: 300 },
      4: { successRate: 0.6, problems: 30, credit: 300 },
      3: { successRate: 0.6, problems: 30, credit: 300 },
      2: { successRate: 0.6, problems: 30, credit: 300 },
      1: { successRate: 0.6, problems: 30, credit: 300 }
    }
  },
  {
    name: '플래티넘',
    image: platinum,
    levels: {
      5: { successRate: 0.4, problems: 40, credit: 400 },
      4: { successRate: 0.4, problems: 40, credit: 400 },
      3: { successRate: 0.4, problems: 40, credit: 400 },
      2: { successRate: 0.4, problems: 40, credit: 400 },
      1: { successRate: 0.4, problems: 40, credit: 400 }
    }
  },
  {
    name: '다이아몬드',
    image: diamomd,
    levels: {
      5: { successRate: 0.2, problems: 50, credit: 500 },
      4: { successRate: 0.2, problems: 50, credit: 500 },
      3: { successRate: 0.2, problems: 50, credit: 500 },
      2: { successRate: 0.2, problems: 50, credit: 500 },
      1: { successRate: 0.2, problems: 50, credit: 500 }
    }
  },
  {
    name: '루비',
    image: ruby,
    levels: {
      5: { successRate: 0.1, problems: 60, credit: 600 },
      4: { successRate: 0.1, problems: 60, credit: 600 },
      3: { successRate: 0.1, problems: 60, credit: 600 },
      2: { successRate: 0.1, problems: 60, credit: 600 },
      1: { successRate: 0.1, problems: 60, credit: 600 }
    }
  }
];

export default function Enforce() {
  const TEAM_NAME = '하람';
  const [isGuideOpen, setIsGuideOpen] = useState(true);
  const [currentTierIndex, setCurrentTierIndex] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(5);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);
  const [resultMessage, setResultMessage] = useState('');
  const [isLeakResultModalOpen, setIsLeakResultModalOpen] = useState(false);
  const [leakResultMessage, setLeakResultMessage] = useState('');
  const [isExchangeResultModalOpen, setIsExchangeResultModalOpen] = useState(false);
  const [exchangeResultMessage, setExchangeResultMessage] = useState('');
  const [isBuyTierResultModalOpen, setIsBuyTierResultModalOpen] = useState(false);
  const [buyTierResultMessage, setBuyTierResultMessage] = useState('');
  const [solvedProblems, setSolvedProblems] = useState(0);
  const [remainingProblems, setRemainingProblems] = useState(1000);
  const [credit, setCredit] = useState(20000);


  // 기능 모달 상태
  const [isLeakCodeModalOpen, setIsLeakCodeModalOpen] = useState(false);
  const [isBuyTierModalOpen, setIsBuyTierModalOpen] = useState(false);
  const [isExchangeCreditModalOpen, setIsExchangeCreditModalOpen] = useState(false);


  const navigate = useNavigate();

  useEffect(() => {
    const savedData = localStorage.getItem('enforceGameData');
    if (savedData) {
      const { tierIndex, level, solved, remaining, credit: savedCredit } = JSON.parse(savedData);
      setCurrentTierIndex(tierIndex);
      setCurrentLevel(level);
      setSolvedProblems(solved);
      setRemainingProblems(remaining);
      if (savedCredit !== undefined) {
        setCredit(savedCredit);
      }
    }
  }, []);

  useEffect(() => {
    const gameData = {
      tierIndex: currentTierIndex,
      level: currentLevel,
      solved: solvedProblems,
      remaining: remainingProblems,
      credit: credit
    };
    localStorage.setItem('enforceGameData', JSON.stringify(gameData));
  }, [currentTierIndex, currentLevel, solvedProblems, remainingProblems, credit]);


  const handleStartGame = () => {
    setIsGuideOpen(false);
  };

  const goHome = () => {
    navigate("/std")
  }


  const getCurrentTier = () => TIERS[currentTierIndex];


  const getCurrentLevelInfo = () => {
    const tier = getCurrentTier();
    return tier.levels[currentLevel];
  };

  // 강화 성공률 가져오기
  const getSuccessRate = () => {
    const levelInfo = getCurrentLevelInfo();
    return Math.round(levelInfo.successRate * 100);
  };

  // 현재 티어의 숫자 계산 (Bronze 5 = 1, Bronze 1 = 5, Silver 5 = 6, ..., Ruby 1 = 30)
  const getCurrentTierNumber = () => {
    return currentTierIndex * 5 + (6 - currentLevel);
  };

  const getTierLabel = (tierKey) => {
    switch (tierKey) {
      case 'gold2':
        return '골드 2';
      case 'platinum4':
        return '플레티넘 4';
      default:
        return '티어';
    }
  };

  // API 호출 함수
  const callEnforceAPI = async () => {
    // 실제 API 호출 (현재 주석 처리됨)
    /*
    try {
      const token = localStorage.getItem('accessToken');

      const response = await fetch('http://your-api-url/std/enforce', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API 호출 실패:', error);
      return null;
    }
    */

    // 임시 목업 데이터 (테스트용)
    // API 연동 시 위의 주석을 해제하고 이 부분을 삭제하세요
    return new Promise((resolve) => {
      setTimeout(() => {
        const successRate = getSuccessRate();
        const random = Math.random() * 100;
        const success = random < successRate;

        const levelInfo = getCurrentLevelInfo();

        resolve({
          success: success,
          message: success ? "티어가 올랐습니다" : "코드를 유출하다가 걸렸습니다",
          tier: success ? currentTierIndex : 0,
          problems: success ? levelInfo.problems : 0
        });
      }, 50);
    });
  };


  const handleEnhance = async () => {
    if (isEnhancing) return;

    if (currentTierIndex === TIERS.length - 1 && currentLevel === 1) {
      setResultMessage('이미 최고 등급입니다!');
      setIsResultModalOpen(true);
      return;
    }

    setIsEnhancing(true);

    // API 호출 시도
    const apiResult = await callEnforceAPI();

    if (apiResult) {
      // API 응답 처리
      const { success, problems } = apiResult;

      if (success) {
        // 성공 - 모달 표시 안 함
        // 다음 레벨/티어로 업데이트
        if (currentLevel > 1) {
          setCurrentLevel(prev => prev - 1);
        } else if (currentTierIndex < TIERS.length - 1) {
          setCurrentTierIndex(prev => prev + 1);
          setCurrentLevel(5);
        }

        // 남은 문제 수만 업데이트 (푼 문제 수는 코드 유출 시에만 증가)
        setRemainingProblems(prev => Math.max(0, prev - problems));
      } else {
        // 실패 - 모달 표시
        setResultMessage('계정 새로 만드세요!');

        // Bronze 5로 초기화
        setCurrentTierIndex(0);
        setCurrentLevel(5);
        setSolvedProblems(0);
        setRemainingProblems(10000);

        setIsResultModalOpen(true);
      }
    } else {
      // API 호출 실패 시 로컬 로직으로 처리
      const successRate = getSuccessRate();
      const random = Math.random() * 100;
      const success = random < successRate;

      if (success) {
        // 성공 - 모달 표시 안 함
        const levelInfo = getCurrentLevelInfo();

        if (currentLevel > 1) {
          setCurrentLevel(prev => prev - 1);
        } else if (currentTierIndex < TIERS.length - 1) {
          setCurrentTierIndex(prev => prev + 1);
          setCurrentLevel(5);
        }

        // 남은 문제 수만 업데이트 (푼 문제 수는 코드 유출 시에만 증가)
        setRemainingProblems(prev => Math.max(0, prev - levelInfo.problems));
      } else {
        // 실패 - 모달 표시
        setResultMessage('계정을 다시 만드세요!');

        // Bronze 5로 초기화
        setCurrentTierIndex(0);
        setCurrentLevel(5);
        setSolvedProblems(0);
        setRemainingProblems(10000);

        setIsResultModalOpen(true);
      }
    }

    setIsEnhancing(false);
  };

  const closeResultModal = () => {
    setIsResultModalOpen(false);
  };

  // 기능 모달 핸들러
  const handleLeakCodeClick = () => {
    setIsLeakCodeModalOpen(true);
  };

  const handleBuyTierClick = () => {
    setIsBuyTierModalOpen(true);
  };

  const handleExchangeCreditClick = () => {
    setIsExchangeCreditModalOpen(true);
  };

  const closeLeakCodeModal = () => {
    setIsLeakCodeModalOpen(false);
  };

  const closeLeakResultModal = () => {
    setIsLeakResultModalOpen(false);
  };

  const closeExchangeResultModal = () => {
    setIsExchangeResultModalOpen(false);
  };

  const closeBuyTierModal = () => {
    setIsBuyTierModalOpen(false);
  };

  const closeExchangeCreditModal = () => {
    setIsExchangeCreditModalOpen(false);
  };

  const closeBuyTierResultModal = () => {
    setIsBuyTierResultModalOpen(false);
  };



  const handleLeakCodeAction = () => {
    // 코드 유출 기능: 확정 성공
    const levelInfo = getCurrentLevelInfo();
    const earnedCredit = levelInfo.problems;
    const earnedProblems = levelInfo.problems;

    setCredit(prev => prev + earnedCredit);
    setSolvedProblems(prev => prev + earnedProblems);

    // 브론즈 5로 초기화
    setCurrentTierIndex(0);
    setCurrentLevel(5);

    setLeakResultMessage(`${TEAM_NAME} 팀 ${earnedProblems}문제 지급!`);
    setIsLeakResultModalOpen(true);
    setIsLeakCodeModalOpen(false);
  };



  const handleBuyTierAction = (tierKey) => {
    // 티어 구매 기능: 현재 티어에 해당하는 크레딧 필요
    const levelInfo = getCurrentLevelInfo();
    const requiredCredit = levelInfo.credit;

    if (credit < requiredCredit) {
      setResultMessage('크레딧 부족!');
      setIsResultModalOpen(true);
      setIsBuyTierModalOpen(false);
      return;
    }

    // 최고 등급 체크
    if (currentTierIndex === TIERS.length - 1 && currentLevel === 1) {
      setResultMessage('이미 최고 등급입니다!');
      setIsResultModalOpen(true);
      setIsBuyTierModalOpen(false);
      return;
    }

    // 크레딧 차감 및 티어 업그레이드
    setCredit(prev => prev - requiredCredit);

    if (currentLevel > 1) {
      setCurrentLevel(prev => prev - 1);
    } else if (currentTierIndex < TIERS.length - 1) {
      setCurrentTierIndex(prev => prev + 1);
      setCurrentLevel(5);
    }

    const tierLabel = getTierLabel(tierKey);
    setBuyTierResultMessage(`${tierLabel} 계정 구매 완료!`);
    setIsBuyTierResultModalOpen(true);
    setIsBuyTierModalOpen(false);
  };

  const handleExchangeCreditAction = () => {
    // 크레딧 교환 기능: 문제 수 * 100 = 받는 크레딧
    if (solvedProblems < 10) {
      setResultMessage('문제 수 부족!');
      setIsResultModalOpen(true);
      setIsExchangeCreditModalOpen(false);
      return;
    }

    const earnedCredit = solvedProblems * 100;

    setCredit(prev => prev + earnedCredit);
    setSolvedProblems(0); // 교환 후 0으로 초기화

    setExchangeResultMessage(`${TEAM_NAME} 팀 ${earnedCredit}크레딧 지급`);
    setIsExchangeResultModalOpen(true);
    setIsExchangeCreditModalOpen(false);
  };

  const currentTier = getCurrentTier();
  const successRate = getSuccessRate();


  return (
    <>
      <Header
        teamName={TEAM_NAME}
        isTeamName={true}
        isCredit={true}
        Credit={credit.toLocaleString()} />

      <Body>
        <FunctionMenu
          handleLeakCodeClick={handleLeakCodeClick}
          handleBuyTierClick={handleBuyTierClick}
          handleExchangeCreditClick={handleExchangeCreditClick}
        />

        <TierDisplay
          currentTier={currentTier}
          currentLevel={currentLevel}
          currentTierIndex={currentTierIndex}
          getCurrentTierNumber={getCurrentTierNumber}
          successRate={successRate}
          tiersLength={TIERS.length}
        />

        <ProblemStats
          solvedProblems={solvedProblems}
          remainingProblems={remainingProblems}
          handleEnhance={handleEnhance}
        />
      </Body>

      {/* 게임 가이드 모달 */}
      <ModalComponent
        isOpen={isGuideOpen}
        onClose={goHome}
        title="강화하기 게임"
        description="검 강화하기 게임을 아시나요?
             버튼을 누르면 일정 확률로 검 강화에 성공하여 더 좋은 검을 만드는 게임이에요
             정해진 확률에 따라 강화를 하거나, 검을 판매하여 돈을 모을 수 있어요
             하지만 저희는 검 대신 백준 티어를 강화하고 문제 수로 코드를 살 수도 있고
             코드를 유출하며 크레딧을 모으는 게임이에요! 두뇌력을 기를 수록 좋아요"
        catchphrase="지금 바로 시작하기 버튼을 눌러 백준 루비를 향해 달려가세요!!"
        isGuide={true}
        btnText="게임 시작하기"

        onButtonClick={handleStartGame}
      />

      {/* 강화 결과 모달 */}
      <ModalComponent
        isOpen={isResultModalOpen}
        onClose={closeResultModal}
        title={resultMessage}
        img={Failure}
        onButtonClick={closeResultModal}
        isButton={true}
        btnText="티어가 0으로 강등 됐어요 처음부터 시작하세요"
      />




      {/* 코드 유출 모달 */}
      <ModalComponent
        isOpen={isLeakCodeModalOpen}
        onClose={closeLeakCodeModal}
        title="당신은 코드를 파는 유저입니다......"
        isButton={true}
        img = {icon1hover}
        btnText="코드를 팔아서 문제를 얻어요"
        onButtonClick={handleLeakCodeAction}
      />

      {/* 코드 유출 결과 모달 */}
      <ModalComponent
        isOpen={isLeakResultModalOpen}
        onClose={closeLeakResultModal}
        title={leakResultMessage}
        img={crown}
        isButton={false}
      />


      {/* 티어 구매 모달 */}
      <ModalComponent
        isOpen={isBuyTierModalOpen}
        onClose={closeBuyTierModal}
        img={icon2hover}
        title="티어 상점"
        isTierShop={true}
        onButtonClick={handleBuyTierAction}
      />

      {/* 크레딧 교환 모달 */}
      <ModalComponent
        isOpen={isExchangeCreditModalOpen}
        onClose={closeExchangeCreditModal}
        img={icon3hover}
        btnText="10000 크레딧으로 교환해요"
        title="크레딧 교환하기"
        onButtonClick={handleExchangeCreditAction}
        isButton={true}
        isCreditChange={true}
      />

      {/* 크레딧 교환 결과 모달 */}
      <ModalComponent
        isOpen={isExchangeResultModalOpen}
        onClose={closeExchangeResultModal}
        title={exchangeResultMessage}
        img={crown}
        isButton={false}
      />

      {/* 티어 구매 결과 모달 */}
      <ModalComponent
        isOpen={isBuyTierResultModalOpen}
        onClose={closeBuyTierResultModal}
        title={buyTierResultMessage}
        img={crown}
        isButton={false}
      />
    </>
  )
}
