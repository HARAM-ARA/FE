import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import Header from "../components/Header";
import ModalComponent from "../components/ModalComponent";
import { useNavigate } from "react-router-dom";
import bronze from "../assets/bronze.svg";
import sliver from "../assets/sliver.svg";
import gold from "../assets/gold.svg";
import platinum from "../assets/platinum.svg";
import diamomd from "../assets/Diamond.svg";
import ruby from "../assets/ruby.svg";
import icon1 from "../assets/icon1.svg";
import icon2 from "../assets/icon2.svg";
import icon3 from "../assets/icon3.svg";
import NextBtn from "../assets/nextBtn.svg";

const Body = styled.div`
    height: 650px;
    display: flex;
    align-items: center;
    gap: 12%;
    margin: 0px 50px 95px 50px;
    background: #fff;
  `;

const MenuTap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  margin: 0 0 5% 0;
`;

const MenuTap2 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 16px;
  margin: 0 0 5% 0;
`;

const MenuEachBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

const MenuText = styled.p`
  color: #6A6A6A;
  font-feature-settings: 'liga' off, 'clig' off;
  font-family: Pretendard;
  font-size: 28px;
  font-style: normal;
  font-weight: 500;
  line-height: 160%;
  margin: 0;
`;

const TierTap = styled.div`
  display: flex;
  width: 375px;
  flex-direction: column;
  align-items: center;
  gap: 90px;
`;

const TierImgBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 60px;
  align-self: stretch;
  margin-left: 0;
  position: relative;
`;

const TierImgBox2 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`;

const Title = styled.div`
  color: #2E4358;
  text-align: center;
  font-family: Pretendard;
  font-size: 70px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.84px;
`;

const NextTierText = styled.div`
  color: #5A5A5A;
  text-align: center;
  font-family: Pretendard;
  font-size: 70px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.84px;
  white-space: nowrap;
`;

const Percent = styled.p`
  color: #3A3A3A;
  text-align: center;
  font-family: Pretendard;
  font-size: 40px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.48px;
`;

const Text = styled.p`
  color: #6A6A6A;
  text-align: center;
  font-family: Pretendard;
  font-size: 40px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -0.48px;
  margin: 0;
`;

const BtnImg = styled.img`
  width: 200px;
  height: 200px;
  margin: 15% 15% 0 0;
  cursor: pointer;
`;

const TierImgWrapper = styled.div`
  position: relative;
  display: inline-block;
  width: 160px;
  height: 180px;
`;

const TierImg = styled.img`
  width: 160px;
  height: 180px;
  position: absolute;
  top: 0;
  left: 0;
`;

const Number = styled.p`
  color: #FFF;
  text-align: center;
  font-family: Pretendard;
  font-size: 90px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -1.103px;
  position: absolute;
  top: 36%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0;
  z-index: 1;
`;

const FunctionImg = styled.img`
  cursor: pointer;
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
  const [isGuideOpen, setIsGuideOpen] = useState(true);
  const [currentTierIndex, setCurrentTierIndex] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(5);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);
  const [resultMessage, setResultMessage] = useState('');
  const [resultDescription, setResultDescription] = useState('');
  const [solvedProblems, setSolvedProblems] = useState(0);
  const [remainingProblems, setRemainingProblems] = useState(10000);

  const navigate = useNavigate();

  useEffect(() => {
    const savedData = localStorage.getItem('enforceGameData');
    if (savedData) {
      const { tierIndex, level, solved, remaining } = JSON.parse(savedData);
      setCurrentTierIndex(tierIndex);
      setCurrentLevel(level);
      setSolvedProblems(solved);
      setRemainingProblems(remaining);
    }
  }, []);

  useEffect(() => {
    const gameData = {
      tierIndex: currentTierIndex,
      level: currentLevel,
      solved: solvedProblems,
      remaining: remainingProblems
    };
    localStorage.setItem('enforceGameData', JSON.stringify(gameData));
  }, [currentTierIndex, currentLevel, solvedProblems, remainingProblems]);

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

  // 다음 티어 정보 가져오기
  const getNextTier = () => {
    if (currentLevel > 1) {
      return {
        name: getCurrentTier().name,
        level: currentLevel - 1
      };
    } else if (currentTierIndex < TIERS.length - 1) {
      return {
        name: TIERS[currentTierIndex + 1].name,
        level: 5
      };
    } else {
      return {
        name: '루비',
        level: 1
      };
    }
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

  // 다음 티어의 숫자 계산
  const getNextTierNumber = () => {
    const next = getNextTier();
    let nextTierIndex = currentTierIndex;

    if (next.level < currentLevel) {
      // 같은 티어 내에서 레벨업
      nextTierIndex = currentTierIndex;
    } else {
      // 다음 티어로 이동
      nextTierIndex = currentTierIndex + 1;
    }

    return nextTierIndex * 5 + (6 - next.level);
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
      setResultDescription('루비 1 등급을 달성하셨습니다!');
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

        // 문제 수 업데이트
        setSolvedProblems(prev => prev + problems);
        setRemainingProblems(prev => Math.max(0, prev - problems));
      } else {
        // 실패 - 모달 표시
        setResultMessage('강화 실패!');
        setResultDescription('아쉽게도 강화에 실패하여 브론즈 5로 초기화되었습니다.');

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

        // 문제 수 업데이트
        setSolvedProblems(prev => prev + levelInfo.problems);
        setRemainingProblems(prev => Math.max(0, prev - levelInfo.problems));
      } else {
        // 실패 - 모달 표시
        setResultMessage('강화 실패!');
        setResultDescription('아쉽게도 강화에 실패하여 브론즈 5로 초기화되었습니다.');

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

  const currentTier = getCurrentTier();
  const successRate = getSuccessRate();

  return (
    <>
      <Header
        teamName="하람"
        isTeamName={true}
        isCredit={true}
        Credit="20,000" />

      <Body>
        <MenuTap>
          <MenuEachBox>
            <FunctionImg src={icon1} />
            <MenuText> 코드를 유출해요 </MenuText>
          </MenuEachBox>
          <MenuEachBox>
            <FunctionImg src={icon2} />
            <MenuText> 티어를 살 수 있어요 </MenuText>
          </MenuEachBox>
          <MenuEachBox>
            <FunctionImg src={icon3} />
            <MenuText> 크레딧으로 교환해요 </MenuText>
          </MenuEachBox>
        </MenuTap>

        <TierTap>
          <TierImgBox>
            <Title> 티어 강화하기 </Title>
            <TierImgWrapper>
              <TierImg src={currentTier.image} />
              <Number>{currentLevel}</Number>
            </TierImgWrapper>
          </TierImgBox>
          <TierImgBox2>
            {currentTierIndex === TIERS.length - 1 && currentLevel === 1 ? (
              <Title>최고 등급 달성!</Title>
            ) : (
              <NextTierText>+{getCurrentTierNumber()} {currentTier.name} {currentLevel}</NextTierText>
            )}
            <Percent>{successRate}%</Percent>
          </TierImgBox2>
        </TierTap>

        <MenuTap2>
          <Text>푼 문제 수 : {solvedProblems}</Text>
          <Text>남은 문제 수 : {remainingProblems}</Text>
          <BtnImg
            src={NextBtn}
            onClick={handleEnhance}
          />
        </MenuTap2>
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
        description={resultDescription}
        catchphrase={
          resultMessage === '강화 성공!'
            ? '계속해서 더 높은 등급에 도전해보세요!'
            : resultMessage === '강화 실패!'
            ? '포기하지 마세요! 다시 도전하면 성공할 수 있습니다!'
            : '루비 1 등급을 달성하셨습니다!'
        }
        isGuide={true}
        btnText="확인"
        onButtonClick={closeResultModal}
      />
    </>
  )
}