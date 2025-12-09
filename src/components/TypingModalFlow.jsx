import React, { useState, useEffect, useRef } from "react";
import styled from "@emotion/styled";
import ModalBase from "./ModalBase.jsx";
import Btn from './button.jsx';
import crownIcon from "../assets/crown.svg";


// 더미 데이터
const DUMMY_QUESTIONS = [
  "벚꽃잎꽃말은즐거움",
  "마나게먹으면이긴다",
  "프로그래밍은재미있다",
  "타자게임최고점수",
  "해커톤파이팅합시다"
];

const DUMMY_RANKINGS = [
  { rank: 1, teamName: "TEAM 아라", time: "30.09초" },
  { rank: 2, teamName: "TEAM 하람", time: "37.31초" },
  { rank: 3, teamName: "TEAM 먀아", time: "38.99초" },
  { rank: 4, teamName: "TEAM 아띠", time: "48.19초" },
  { rank: 5, teamName: "TEAM 베르데", time: "46.35초" },
  { rank: 13, teamName: "TEAM 앙", time: "76.05초" }
];

// 공통 스타일
const ModalContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 50px;
  position: relative;
`;

const RankingContent = styled(ModalContent)`
  justify-content: flex-start;
  align-items: center;
  padding-top: 50px;
`;

const Title = styled.div`
    color: #1D1D1D;
    font-feature-settings: 'liga' off, 'clig' off;
    font-family: Pretendard;
    font-size: 40px;
    font-style: normal;
    font-weight: 700;
    line-height: 160%; /* 64px */
`;

const QuestionBox = styled.div`
    display: flex;
    height: 106px;
    width: 500px;
    margin-left: 70px;
    margin-bottom: 32px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    align-self: stretch;
    border-radius: 24px;
    border: 5px solid var(--Primary-150, #FDB882);
`;

const QuestionText = styled.div`
    color: #000;
    font-feature-settings: 'liga' off, 'clig' off;
    font-family: Pretendard;
    font-size: 40px;
    font-style: normal;
    font-weight: 600;
    line-height: 160%; /* 64px */
`;

const InputBox = styled.input`
    height: 31px;
    width: 440px;
    margin-left: 80px;
    display: flex;
    padding: 11px 24px;
    align-items: center;
    gap: 10px;
    align-self: stretch;
    border-radius: 10px;
    background: #ECECEC;
    appearance: none;
    border: none;
    &:hover {
        border: none;
        appearance: none;
        outline: none;
        box-shadow: none;
    }
    &:focus {
        border: none;
        appearance: none;
        outline: none;
        box-shadow: none;
    }

  &::placeholder {
    color: #B2B2B2;
    letter-spacing: 0;
  }
`;

const ProgressText = styled.div`
    color: #B2B2B2;
    font-feature-settings: 'liga' off, 'clig' off;
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 160%; /* 32px */
    margin-bottom: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 32px;
`;

const Button = styled.button`
  padding: 14px 32px;
  border-radius: 12px;
  font-family: Pretendard;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition: all 0.2s ease;

  background: ${props => props.primary ? '#FFF2E4' : '#F0F0F0'};
  color: ${props => props.primary ? '#F07F23' : '#646464'};

  &:hover {
    background: ${props => props.primary ? '#FFE8CC' : '#E0E0E0'};
  }

  &:focus {
    outline: none;
  }
`;

const EndMessage = styled.div`
  color: #1D1D1D;
  font-family: Pretendard;
  font-size: 28px;
  font-weight: 600;
  line-height: 160%;
  margin-bottom: 40px;
  text-align: center;
`;

const RankingList = styled.div`
  width: 100%;
  max-width: 560px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 16px;
`;

const RankingItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 10px 7px;
    margin: 0px;
    border-radius: 18px;
    background: ${props => props.isMyTeam ? '#FFF2E4' : 'transparent'};
`;

const RankBadge = styled.div`
    width: 76px;
    height: 48px;
    border-radius: 14px;
    background: ${props => props.isMyTeam ? '#F07F23' : 'rgba(240, 127, 35, 0.10)'};
    border: 1px solid #F07F23;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    color: ${props => props.isMyTeam ? '#FFF' : '#F07F23'};
`;

const TeamInfo = styled.div`
  flex: 1;
  color: #1D1D1D;
  font-family: Pretendard;
  font-size: 20px;
  font-weight: 700;
`;

const TeamTime = styled.div`
  color: #B2B2B2;
  font-family: Pretendard;
  font-size: 20px;
  font-weight: 700;
`;

const CreditIcon = styled.img`
  width: 80px;
  height: 80px;
  margin-bottom: 24px;
`;

const CreditMessage = styled.div`
  color: #1D1D1D;
  font-family: Pretendard;
  font-size: 32px;
  font-weight: 700;
  line-height: 160%;
  text-align: center;
`;

const LankDiv = styled.div`
    margin-top: 24px;
    display: flex;
    width: 100%;
    max-width: 560px;
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
`;


const LankTitle = styled.p`
    color: #1D1D1D;
    font-feature-settings: 'liga' off, 'clig' off;
    font-family: Pretendard;
    font-size: 40px;
    font-style: normal;
    font-weight: 700;
    line-height: 150%; /* 60px */
    left:0px;
    margin-bottom: 0;
`;

const RankGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const MyRankWrapper = styled.div`
  width: 100%;
  max-width: 560px;
  margin-top: 18px;
`;

const MyRankingItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 18px 22px;
  border-radius: 18px;
  background: #FFF2E4;
`;

const RankingButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  max-width: 560px;
  margin-top: 20px;
`;


export default function TypingModalFlow({ isOpen, onClose, myTeamName = "하람", teamId }) {
  const [currentStep, setCurrentStep] = useState("game"); // game, end, ranking, credit
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [userAnswers, setUserAnswers] = useState([]); // 사용자 응답 저장
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [myRank, setMyRank] = useState(null);
  const [myResult, setMyResult] = useState(null);
  const inputRef = useRef(null);

  // 모달이 열릴 때마다 게임 상태 초기화
  useEffect(() => {
    if (isOpen) {
      setCurrentStep("game");
      setCurrentQuestion(0);
      setUserInput("");
      setUserAnswers([]);
      setStartTime(null);
      setEndTime(null);
      setMyRank(null);
      setMyResult(null);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && currentStep === "game") {
      setStartTime(Date.now());
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen, currentStep, currentQuestion]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      // 현재 입력값을 저장
      const newAnswers = [...userAnswers, userInput];
      setUserAnswers(newAnswers);

      if (currentQuestion < DUMMY_QUESTIONS.length - 1) {
        // 다음 문제로
        setCurrentQuestion(currentQuestion + 1);
        setUserInput("");
        setTimeout(() => {
          inputRef.current?.focus();
        }, 50);
      } else {
        // 게임 종료 - 5개 응답 모두 저장됨
        setEndTime(Date.now());
        setCurrentStep("end");
        setUserInput("");

        // TODO: API - 게임 결과 제출
        console.log('제출할 데이터:', {
          teamId: teamId,
          answers: newAnswers,
          playTime: Date.now() - startTime
        });
        // const result = await submitGameAnswers({ teamId, answers: newAnswers });
      }
    }
  };

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleEndGame = () => {
    onClose();
    resetGame();
  };

  const findMyTeamResult = () => {
    // 동일 팀명이 여러 개일 때 최신 결과 우선
    const reversed = [...DUMMY_RANKINGS].reverse();
    return reversed.find((item) => item.teamName.includes(myTeamName)) || null;
  };

  const handleShowRanking = () => {
    // TODO: API - 게임 결과 제출 및 순위 조회
    // const result = await submitGameResult({ teamName: myTeamName, time: endTime - startTime });
    // setMyRank(result.rank);

    const myTeamResult = findMyTeamResult();
    setMyResult(myTeamResult);
    setMyRank(myTeamResult?.rank || null);
    setCurrentStep("ranking");
  };

  const handleReceiveCredit = () => {
    // TODO: API - 크레딧 수령
    // await receiveCredit({ teamName: myTeamName, rank: myRank });

    setCurrentStep("credit");
  };

  const handleCloseRanking = () => {
    onClose();
    resetGame();
  };

  const handleCloseCreditModal = () => {
    onClose();
    resetGame();
  };

  const resetGame = () => {
    setCurrentStep("game");
    setCurrentQuestion(0);
    setUserInput("");
    setUserAnswers([]);
    setStartTime(null);
    setEndTime(null);
    setMyRank(null);
    setMyResult(null);
  };

  const getElapsedTime = () => {
    if (!startTime || !endTime) return "0.00초";
    const elapsed = ((endTime - startTime) / 1000).toFixed(2);
    return `${elapsed}초`;
  };

  const getCreditAmount = () => {
    // 순위별 크레딧 계산
    const creditMap = {
      1: 20000,
      2: 15000,
      3: 10000,
      4: 5000,
      5: 3000
    };
    return creditMap[myRank] || 0;
  };

  const topRankings = DUMMY_RANKINGS.slice(0, 5);
  const isMyRankInTop = myResult && topRankings.some((item) => item.rank === myResult.rank);
  const shouldShowMyRank = myResult && !isMyRankInTop;

  const isRankingStep = currentStep === "ranking";

  return (
    <ModalBase
      isOpen={isOpen}
      onClose={onClose}
      showCloseButton={currentStep !== "game"}
      width={isRankingStep ? "671px" : undefined}
      height={isRankingStep ? "570px" : undefined}
    >
      {/* 1. 타자 게임 입력 모달 */}
      {currentStep === "game" && (
        <ModalContent>
            <ProgressText>
                <span style={{color:'#F07F23'}}>{currentQuestion + 1}</span> | {DUMMY_QUESTIONS.length}
            </ProgressText>
          <QuestionBox>
            <QuestionText>{DUMMY_QUESTIONS[currentQuestion]}</QuestionText>
          </QuestionBox>
          <InputBox
            ref={inputRef}
            type="text"
            value={userInput}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Enter키를 눌러 제출할 수 있어요."
            autoFocus
          />

        </ModalContent>
      )}

      {/* 2. 게임 종료 모달 */}
      {currentStep === "end" && (
        <ModalContent>
          <Title>끝! 2시간 뒤에 또 만나요</Title>

          <ButtonContainer>
              <Btn
                  primary onClick={handleShowRanking}
                  text='게임 순위보기'/>
            <Btn
                onClick={handleEndGame}
                text='게임 끝내기'/>

          </ButtonContainer>
        </ModalContent>
      )}

      {/* 3. 타자 게임 순위 모달 */}
      {currentStep === "ranking" && (
        <RankingContent>
            <LankDiv>
                <LankTitle>타자 게임 순위 보기</LankTitle>
                <RankingList>
                    {topRankings.map((item) => {
                      const isMyTeam = item.teamName.includes(myTeamName);
                      return (
                        <RankingItem key={item.rank} isMyTeam={isMyTeam}>
                          <RankGroup>
                            <RankBadge rank={item.rank} isMyTeam={isMyTeam}>{item.rank}위</RankBadge>
                            <TeamInfo>{item.teamName}</TeamInfo>
                          </RankGroup>
                          <TeamTime>{item.time}</TeamTime>
                        </RankingItem>
                      );
                    })}
                </RankingList>
                {shouldShowMyRank && (
                  <MyRankWrapper>
                    <MyRankingItem>
                      <RankGroup>
                        <RankBadge isMyTeam>{myResult.rank}위</RankBadge>
                        <TeamInfo>{myResult.teamName}</TeamInfo>
                      </RankGroup>
                      <TeamTime>{myResult.time}</TeamTime>
                    </MyRankingItem>
                  </MyRankWrapper>
                )}
            </LankDiv>
                {myRank && myRank <= 5 && (
                  <RankingButtonContainer>
                      <Btn primary onClick={handleReceiveCredit} text="크레딧 받기" />
                  </RankingButtonContainer>
                )}


        </RankingContent>
      )}

      {/* 4. 크레딧 지급 모달 */}
      {currentStep === "credit" && (
        <ModalContent>
          <CreditIcon src={crownIcon} alt="crown" />
          <CreditMessage>
            {myTeamName} 팀 {getCreditAmount().toLocaleString()} 크레딧 지급!
          </CreditMessage>
        </ModalContent>
      )}
    </ModalBase>
  );
}
