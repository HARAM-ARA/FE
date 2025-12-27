import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import Header from "../components/Header.jsx";
import FunctionMenu from "../components/EnforceComponent/FunctionMenu.jsx";
import TierDisplay from "../components/EnforceComponent/TierDisplay.jsx";
import ProblemStats from "../components/EnforceComponent/ProblemStats.jsx";
import { useNavigate } from "react-router-dom";
import { AxiosInstnce as customAxios } from "../lib/customAxios.js";
import bronze from "../assets/bronze.svg";
import sliver from "../assets/sliver.svg";
import gold from "../assets/gold.svg";
import platinum from "../assets/Platinum.svg";
import diamomd from "../assets/Diamond.svg";
import ruby from "../assets/ruby.svg";
import ModalComponent from "../components/modalComponent.jsx"
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

const TIERS = [
  { name: '브론즈', image: bronze, levels: { 5: { successRate: 1.0, problems: 10, credit: 100 }, 4: { successRate: 1.0, problems: 10, credit: 100 }, 3: { successRate: 0.95, problems: 10, credit: 100 }, 2: { successRate: 0.95, problems: 10, credit: 100 }, 1: { successRate: 0.95, problems: 10, credit: 100 } } },
  { name: '실버', image: sliver, levels: { 5: { successRate: 0.8, problems: 20, credit: 200 }, 4: { successRate: 0.8, problems: 20, credit: 200 }, 3: { successRate: 0.8, problems: 20, credit: 200 }, 2: { successRate: 0.8, problems: 20, credit: 200 }, 1: { successRate: 0.8, problems: 20, credit: 200 } } },
  { name: '골드', image: gold, levels: { 5: { successRate: 0.6, problems: 30, credit: 300 }, 4: { successRate: 0.6, problems: 30, credit: 300 }, 3: { successRate: 0.6, problems: 30, credit: 300 }, 2: { successRate: 0.6, problems: 30, credit: 300 }, 1: { successRate: 0.6, problems: 30, credit: 300 } } },
  { name: '플래티넘', image: platinum, levels: { 5: { successRate: 0.4, problems: 40, credit: 400 }, 4: { successRate: 0.4, problems: 40, credit: 400 }, 3: { successRate: 0.4, problems: 40, credit: 400 }, 2: { successRate: 0.4, problems: 40, credit: 400 }, 1: { successRate: 0.4, problems: 40, credit: 400 } } },
  { name: '다이아몬드', image: diamomd, levels: { 5: { successRate: 0.2, problems: 50, credit: 500 }, 4: { successRate: 0.2, problems: 50, credit: 500 }, 3: { successRate: 0.2, problems: 50, credit: 500 }, 2: { successRate: 0.2, problems: 50, credit: 500 }, 1: { successRate: 0.2, problems: 50, credit: 500 } } },
  { name: '루비', image: ruby, levels: { 5: { successRate: 0.1, problems: 60, credit: 600 }, 4: { successRate: 0.1, problems: 60, credit: 600 }, 3: { successRate: 0.1, problems: 60, credit: 600 }, 2: { successRate: 0.1, problems: 60, credit: 600 }, 1: { successRate: 0.1, problems: 60, credit: 600 } } }
];

export default function Enforce() {

  const [isGuideOpen, setIsGuideOpen] = useState(() => localStorage.getItem('modal:dismiss:guide-modal') !== 'true');
  const [currentTierIndex, setCurrentTierIndex] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(5);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);
  const [isResultButton, setIsResultButton] = useState(true);
  const [resultMessage, setResultMessage] = useState('');
  const [isLeakResultModalOpen, setIsLeakResultModalOpen] = useState(false);
  const [leakResultMessage, setLeakResultMessage] = useState('');
  const [isExchangeResultModalOpen, setIsExchangeResultModalOpen] = useState(false);
  const [exchangeResultMessage, setExchangeResultMessage] = useState('');
  const [isBuyTierResultModalOpen, setIsBuyTierResultModalOpen] = useState(false);
  const [buyTierResultMessage, setBuyTierResultMessage] = useState('');
  const [solvedProblems, setSolvedProblems] = useState(0);
  const [remainingProblems, setRemainingProblems] = useState(10000); // This might need to come from an API

  const [isLeakCodeModalOpen, setIsLeakCodeModalOpen] = useState(false);
  const [isBuyTierModalOpen, setIsBuyTierModalOpen] = useState(false);
  const [isExchangeCreditModalOpen, setIsExchangeCreditModalOpen] = useState(false);

  const navigate = useNavigate();

  const tierToLevelAndIndex = (tier) => {
    if (tier === 0) return { tierIndex: 0, level: 5 };
    const tierIndex = Math.floor((tier) / 5);
    const level = 5 - (tier % 5);
    return { tierIndex, level };
  };

  const fetchData = async () => {
    try {
      const response = await customAxios.get('/std/enforce/data');
      const { tier, solvedProblem } = response.data;
      const { tierIndex, level } = tierToLevelAndIndex(tier);
      setCurrentTierIndex(tierIndex);
      setCurrentLevel(level);
      setSolvedProblems(solvedProblem);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleStartGame = () => setIsGuideOpen(false);
  const goHome = () => navigate("/std");

  const getCurrentTier = () => TIERS[currentTierIndex];
  const getCurrentLevelInfo = () => TIERS[currentTierIndex].levels[currentLevel];
  const getSuccessRate = () => Math.round(getCurrentLevelInfo().successRate * 100);
  const getCurrentTierNumber = () => currentTierIndex * 5 + (6 - currentLevel);

  const handleEnhance = async () => {
    if (isEnhancing) return;
    if (currentTierIndex === TIERS.length - 1 && currentLevel === 1) {
      setResultMessage('이미 최고 등급입니다!');
      setIsResultModalOpen(true);
      return;
    }
    setIsEnhancing(true);
    try {
      const response = await customAxios.post('std/enforce');
      const { success, message, tier, problems } = response.data;
      setResultMessage(message);
      if (success) {
        const { tierIndex, level } = tierToLevelAndIndex(tier);
        setCurrentTierIndex(tierIndex);
        setCurrentLevel(level);
        setRemainingProblems(prev => Math.max(0, prev - problems));
      } else {
        await fetchData();
        setIsResultModalOpen(true);
      }
    } catch (error) {
      console.error('Error enhancing tier:', error);
      setResultMessage('강화에 실패했습니다. 다시 시도해주세요.');
      setIsResultModalOpen(true);
    } finally {
      setIsEnhancing(false);
    }
  };

  const handleLeakCodeAction = async () => {
    try {
      const response = await customAxios.delete('/std/enforce');
      const { message, totalProblem } = response.data;
      setSolvedProblems(totalProblem);
      setLeakResultMessage('코드 유출 완료!');
      setIsLeakResultModalOpen(true);
      // Reset tier after leaking
      setCurrentTierIndex(0);
      setCurrentLevel(5);
    } catch (error) {
      console.error('Error leaking code:', error);
      setLeakResultMessage('코드 유출에 실패했습니다.');
      setIsLeakResultModalOpen(true);
    }
    setIsLeakCodeModalOpen(false);
  };

  const handleBuyTierAction = async (tierKey) => {
    const tierMap = { 'silver1': 9, 'gold2': 13, 'platinum4': 16 };
    const tierToBuy = tierMap[tierKey];

    if (!tierToBuy) {
      setResultMessage('구매할 티어를 선택하세요!');
      setIsResultModalOpen(true);
      return;
    }

    try {
      const response = await customAxios.post('/std/enforce/buy', { tier: tierToBuy });
      const { message, tier, totalProblem } = response.data;
      const { tierIndex, level } = tierToLevelAndIndex(tier);
      setCurrentTierIndex(tierIndex);
      setCurrentLevel(level);
      setSolvedProblems(totalProblem);
      setBuyTierResultMessage(message);
      setIsBuyTierResultModalOpen(true);
    } catch (error) {
      console.error('Error buying tier:', error);
      const { message } = error.response.data;
      setResultMessage(message || '티어 구매에 실패했습니다.');
      setIsResultModalOpen(true);
    }
    setIsBuyTierModalOpen(false);
  };

  const handleExchangeCreditAction = async () => {
    if (solvedProblems === 0) {
      setResultMessage('교환할 푼 문제가 없습니다.');
      setIsResultModalOpen(true);
      return;
    }
    try {
      const response = await customAxios.post('std/enforce/credit');
      const { message, totalProblem } = response.data;
      setSolvedProblems(totalProblem);
      setExchangeResultMessage(message);
      setIsExchangeResultModalOpen(true);
    } catch (error) {
      console.error('Error exchanging for credit:', error);
      const { message } = error.response.data;
      setResultMessage(message || '크레딧 교환에 실패했습니다.');
      setIsResultModalOpen(true);
    }
    setIsExchangeCreditModalOpen(false);
  };

  const closeResultModal = () => setIsResultModalOpen(false);
  const handleLeakCodeClick = () => setIsLeakCodeModalOpen(true);
  const handleBuyTierClick = () => setIsBuyTierModalOpen(true);
  const handleExchangeCreditClick = () => setIsExchangeCreditModalOpen(true);
  const closeLeakCodeModal = () => setIsLeakCodeModalOpen(false);
  const closeLeakResultModal = () => setIsLeakResultModalOpen(false);
  const closeExchangeResultModal = () => setIsExchangeResultModalOpen(false);
  const closeBuyTierModal = () => setIsBuyTierModalOpen(false);
  const closeExchangeCreditModal = () => setIsExchangeCreditModalOpen(false);
  const closeBuyTierResultModal = () => setIsBuyTierResultModalOpen(false);

  const currentTier = getCurrentTier();
  const successRate = getSuccessRate();

  return (
    <>
      <Header isTeamName={true} isCredit={true} />
      <Body>
        <FunctionMenu handleLeakCodeClick={handleLeakCodeClick} handleBuyTierClick={handleBuyTierClick} handleExchangeCreditClick={handleExchangeCreditClick} />
        <TierDisplay currentTier={currentTier} currentLevel={currentLevel} currentTierIndex={currentTierIndex} getCurrentTierNumber={getCurrentTierNumber} successRate={successRate} tiersLength={TIERS.length} />
        <ProblemStats solvedProblems={solvedProblems} remainingProblems={remainingProblems} handleEnhance={handleEnhance} />
      </Body>

      <ModalComponent isOpen={isGuideOpen} onClose={goHome} title="강화하기 게임" dismissKey="guide-modal" description="검 강화하기 게임을 아시나요? 버튼을 누르면 일정 확률로 검 강화에 성공하여 더 좋은 검을 만드는 게임이에요. 정해진 확률에 따라 강화를 하거나, 검을 판매하여 돈을 모을 수 있어요. 하지만 저희는 검 대신 백준 티어를 강화하고 문제 수로 코드를 살 수도 있고 코드를 유출하며 크레딧을 모으는 게임이에요! 두뇌력을 기를 수록 좋아요" catchphrase="지금 바로 시작하기 버튼을 눌러 백준 루비를 향해 달려가세요!!" isGuide={true} btnText="게임 시작하기" onButtonClick={handleStartGame} />
      <ModalComponent isOpen={isResultModalOpen} onClose={closeResultModal} title={resultMessage} img={Failure} onButtonClick={closeResultModal} isButton={isResultButton} btnText="티어가 0으로 강등 됐어요 처음부터 시작하세요" />
      <ModalComponent isOpen={isLeakCodeModalOpen} onClose={closeLeakCodeModal} title="당신은 코드를 파는 유저입니다......" isButton={true} img={icon1hover} btnText="코드를 팔아서 문제를 얻어요" onButtonClick={handleLeakCodeAction} />
      <ModalComponent isOpen={isLeakResultModalOpen} onClose={closeLeakResultModal} title={leakResultMessage} img={crown} isButton={false} />
      <ModalComponent isOpen={isBuyTierModalOpen} onClose={closeBuyTierModal} img={icon2hover} title="티어 상점" isTierShop={true} onButtonClick={handleBuyTierAction} />
      <ModalComponent isOpen={isExchangeCreditModalOpen} onClose={closeExchangeCreditModal} img={icon3hover} btnText={`${solvedProblems * 10} 크레딧으로 교환해요`} title="크레딧 교환하기" onButtonClick={handleExchangeCreditAction} isButton={true} isCreditChange={true} />
      <ModalComponent isOpen={isExchangeResultModalOpen} onClose={closeExchangeResultModal} title={exchangeResultMessage} img={crown} isButton={false} />
      <ModalComponent isOpen={isBuyTierResultModalOpen} onClose={closeBuyTierResultModal} title={buyTierResultMessage} img={crown} isButton={false} />
    </>
  )
}