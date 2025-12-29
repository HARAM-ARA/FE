import { useState, useEffect } from "react";
import Countdown from "react-countdown";
import styled from '@emotion/styled';
import Button from './button.jsx';
import { useCredit } from "../context/CreditContext.jsx";



export default function Card({ width, height, title, description, buttonText, onClick, showButton = true, isTimer = false, isCredit = false, credit, isOrange = false, isTeacher = false, isTypingGame = false, onTypingGameStart, testMode = false }) {

  const { credit: contextCredit } = useCredit();

  const [key, setKey] = useState(0);
  const [isTimerComplete, setIsTimerComplete] = useState(false);
  const [nextEventTime, setNextEventTime] = useState(null);

  const displayCredit = contextCredit > 0 ? contextCredit.toLocaleString() : credit;

  // 타자 게임용: 서버 시간 기반으로 다음 이벤트 시간 계산
  useEffect(() => {
    if (isTypingGame) {
      calculateNextEventTime();
    }
  }, [isTypingGame]);

  const calculateNextEventTime = () => {
    // TODO: 실제 백엔드 API로 교체 필요
    // const response = await fetch('/api/typing-game/time');
    // const data = await response.json();
    // setNextEventTime(new Date(data.nextEventTime));

    const now = new Date();

    if (testMode) {

      const next = new Date(now.getTime() + 10 * 1000);
      setNextEventTime(next);
      setIsTimerComplete(false);
    } else {

      const currentHour = now.getHours();
      const nextEventHour = Math.ceil(currentHour / 2) * 2;

      const next = new Date(now);
      next.setHours(nextEventHour, 0, 0, 0);

      if (next <= now) {
        next.setHours(next.getHours() + 2);
      }

      setNextEventTime(next);
      setIsTimerComplete(false);
    }
  };

  const handleKey = () => {
    setKey(prev => prev + 1);
  }

  const handleTypingGameComplete = () => {
    setIsTimerComplete(true);
  };

  const handleTypingGameClick = () => {
    if (onTypingGameStart) {
      onTypingGameStart();
    }
    // 게임 시작 후 다시 타이머 시작
    calculateNextEventTime();
  };

  return (
    <>

      <Box width={width} height={height} onClick={onClick} isOrange={isOrange} isTeacher={isTeacher} >
        {/* 크레딧 띄우는 카드를 isCredit으로 판단해서 보여줌 */}
        {isCredit && displayCredit && <Gray> 우리 팀 크레딧 </Gray>}
        {isCredit && displayCredit && <Credit> {displayCredit} 크레딧 </Credit>}

        <InBox isTeacher={isTeacher}>
          {/* 기본작인 타이틀과 설명 */}
          <Title isTeacher={isTeacher}>{title}</Title>
          <Description isTeacher={isTeacher}>{description}</Description>

          {/* 타자게임용: 타이머 완료 전에는 타이머, 완료 후에는 버튼 */}
          {isTypingGame ? (
            isTimerComplete ? (
              <Button onClick={handleTypingGameClick} text="타자 게임 시작하기" />
            ) : (
              nextEventTime && (
                <Timer>
                  <Countdown
                    key={key}
                    date={nextEventTime.getTime()}
                    renderer={({ hours, minutes, seconds, completed }) => {
                      if (completed) {
                        return <TimerText>00 : 00 : 00</TimerText>;
                      }
                      return (
                        <TimerText>
                          {String(hours).padStart(2, "0")} :
                          {String(minutes).padStart(2, "0")} :
                          {String(seconds).padStart(2, "0")}
                        </TimerText>
                      );
                    }}
                    onComplete={handleTypingGameComplete}
                  />
                </Timer>
              )
            )
          ) : (
            <>
              {/* 일반 버튼 */}
              {showButton && buttonText && <Button onClick={onClick} text={buttonText} />}

              {/* 기존 타자게임용 2시간 타이머 (하위 호환성) */}
              {isTimer &&
                <Timer>
                  <Countdown
                    key={key}
                    date={Date.now() + 2 * 60 * 60 * 1000}
                    renderer={({ hours, minutes, seconds }) => (
                      <TimerText>
                        {String(hours).padStart(2, "0")} :
                        {String(minutes).padStart(2, "0")} :
                        {String(seconds).padStart(2, "0")}
                      </TimerText>
                    )}
                    onComplete={handleKey}
                  />
                </Timer>}
            </>
          )}


        </InBox>
      </Box>

    </>
  )
}
const Title = styled.p`
  color: #1D1D1D;
  font-family: Pretendard;
  font-size: 24px;
  font-weight: 500;
  margin:0px 0px 0px 0px;
  cursor: pointer;
  text-align: ${props => props.isTeacher ? "center" : "left"};
`;

const Description = styled.p`
  color: #B2B2B2;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 400;
  margin:0px 0px 7px 0px;
  cursor: pointer;
  text-align: ${props => props.isTeacher ? "center" : "left"};
`;

const Box = styled.div`
  width: ${props => props.width || "246px"};
  height: ${props => props.height || "106px"};
  display: flex;
  padding: ${props =>
    props.isTeacher ? "32px 40px" : props.padding || "57px 37px"};
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  border-radius: 12px;
  border: 1px solid #8B8B8B;
  background-color: white;
  cursor: pointer;

  &:hover:not(:has(button:hover)) {
    background-color: ${(props) =>
    props.isOrange ? "#FFF2E4" : "white"};
  }
`;

const InBox = styled.div`
    
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    align-self: stretch;
    cursor: pointer;
    
  `;

const Timer = styled.div`
    display: flex;
    width: 130px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 10px;
    background: rgba(178, 178, 178, 0.28);
    height:39px;
  `;

const TimerText = styled.p`
    color: #7B7B7B;
    font-feature-settings: 'liga' off, 'clig' off;
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
`;

const Gray = styled.p`
    color: #000;
    font-feature-settings: 'liga' off, 'clig' off;
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    margin:0;
`;

const Credit = styled.p`
    color: var(--Primary-200, #F07F23);
    font-feature-settings: 'liga' off, 'clig' off;
    font-family: Pretendard;
    font-size: 30px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    margin:0;
  `;