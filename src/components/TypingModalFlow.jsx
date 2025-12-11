import React, { useState, useEffect, useRef } from "react";
import styled from "@emotion/styled";
import ModalBase from "./ModalBase.jsx";
import Btn from './button.jsx';
import crownIcon from "../assets/crown.svg";
import { AxiosInstnce } from "../lib/customAxios.js";

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
  const [questions, setQuestions] = useState([]);
  const [gameId, setGameId] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [userAnswers, setUserAnswers] = useState([]); // 사용자 응답 저장
  const [myRank, setMyRank] = useState(null);
  const [rankings, setRankings] = useState([]);
  const [myTeamRankInfo, setMyTeamRankInfo] = useState(null);
  const [gameResultTime, setGameResultTime] = useState(0);
  const inputRef = useRef(null);

  const fetchGame = async () => {
    try {
      const timeResponse = await AxiosInstnce.get('/std/typing/time');
      const serverTime = parseInt(timeResponse.data.serverTime, 10);

      const response = await AxiosInstnce.get('/std/typing/game');
      const { gameId, words, startTime, endTime } = response.data;

      if (serverTime >= endTime) {
        alert("진행 중인 게임이 없습니다.");
        onClose();
        return;
      }

      setQuestions(words);
      setGameId(gameId);
    } catch (error) {
      console.error("Error fetching game data:", error);
      if (error.response && error.response.status === 404) {
        alert("진행 중인 게임이 없습니다.");
        onClose();
      }
    }
  };

  const submitAnswers = async (answers) => {
    try {
      const response = await AxiosInstnce.post('/std/typing/input', {
        input: answers,
        gameId: gameId,
      });
      setGameResultTime(response.data.time);
      setCurrentStep("end");
    } catch (error) {
      console.error("Error submitting answers:", error);
      if (error.response) {
        alert(error.response.data.message || "결과 제출에 실패했습니다.");
      } else {
        alert("결과 제출에 실패했습니다.");
      }
      onClose();
    }
  };

  const fetchRanking = async () => {
    try {
      const response = await AxiosInstnce.get('/std/typing/rank');
      const { rank, winners, message } = response.data;
      setMyRank(rank);
      setRankings(winners);
      setMyTeamRankInfo({ rank, message });
      setCurrentStep("ranking");
    } catch (error) {
      console.error("Error fetching ranking:", error);
      alert("순위를 불러오는데 실패했습니다.");
    }
  };

  useEffect(() => {
    if (isOpen) {
      resetGame();
      fetchGame();
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && currentStep === "game" && questions.length > 0) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen, currentStep, currentQuestion, questions]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      const newAnswers = [...userAnswers, userInput];
      setUserAnswers(newAnswers);

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setUserInput("");
      } else {
        submitAnswers(newAnswers);
        setUserInput("");
      }
    }
  };

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleEndGame = () => {
    onClose();
  };

  const handleShowRanking = () => {
    fetchRanking();
  };

  const handleReceiveCredit = () => {
    setCurrentStep("credit");
  };

  const resetGame = () => {
    setCurrentStep("game");
    setQuestions([]);
    setGameId(null);
    setCurrentQuestion(0);
    setUserInput("");
    setUserAnswers([]);
    setMyRank(null);
    setRankings([]);
    setMyTeamRankInfo(null);
    setGameResultTime(0);
  };

  const getCreditAmount = () => {
    const creditMap = { 1: 20000, 2: 15000, 3: 10000, 4: 5000, 5: 3000 };
    return creditMap[myRank] || 0;
  };

  const myTeamDataInWinners = rankings.find(item => item.rank === myRank);
  const shouldShowMyRankSeparately = myRank && !myTeamDataInWinners;

  const isRankingStep = currentStep === "ranking";

  return (
    <ModalBase
      isOpen={isOpen}
      onClose={onClose}
      showCloseButton={currentStep !== "game"}
      width={isRankingStep ? "671px" : undefined}
      height={isRankingStep ? "570px" : undefined}
    >
      {currentStep === "game" && questions.length > 0 && (
        <ModalContent>
            <ProgressText>
                <span style={{color:'#F07F23'}}>{currentQuestion + 1}</span> | {questions.length}
            </ProgressText>
          <QuestionBox>
            <QuestionText>{questions[currentQuestion]}</QuestionText>
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

      {currentStep === "end" && (
        <ModalContent>
          <Title>끝! 2시간 뒤에 또 만나요</Title>
          <ButtonContainer>
              <Btn primary onClick={handleShowRanking} text='게임 순위보기'/>
              <Btn onClick={handleEndGame} text='게임 끝내기'/>
          </ButtonContainer>
        </ModalContent>
      )}

      {currentStep === "ranking" && (
        <RankingContent>
            <LankDiv>
                <LankTitle>타자 게임 순위 보기</LankTitle>
                <RankingList>
                    {rankings.map((item) => (
                      <RankingItem key={item.teamId} isMyTeam={item.rank === myRank}>
                        <RankGroup>
                          <RankBadge isMyTeam={item.rank === myRank}>{item.rank}위</RankBadge>
                          <TeamInfo>{item.teamName}</TeamInfo>
                        </RankGroup>
                      </RankingItem>
                    ))}
                </RankingList>
                {shouldShowMyRankSeparately && myTeamRankInfo && (
                  <MyRankWrapper>
                    <MyRankingItem>
                      <RankGroup>
                        <RankBadge isMyTeam>{myTeamRankInfo.rank}위</RankBadge>
                        <TeamInfo>{myTeamName}</TeamInfo>
                      </RankGroup>
                      {/* 시간 정보가 따로 없으면 표시하지 않음 */}
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
