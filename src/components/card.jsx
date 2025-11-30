import { useState } from "react";
import Countdown from "react-countdown";
import styled from '@emotion/styled';
import Button from './Button.jsx';



export default function Card({ width, height, title, description, buttonText, onClick, showButton = true, isTimer = false, isCredit = false, credit, isOrange = false, isTeacher = false }) {

  const [key, setKey] = useState(0);

  const handleKey = () => {
    setKey(prev => prev + 1);
  }

  return (
    <>

      <Box width={width} height={height} onClick={onClick} isOrange={isOrange} isTeacher={isTeacher} >
        {/* 크레딧 띄우는 카드를 isCredit으로 판단해서 보여줌 */}
        {isCredit && credit && <Gray> 우리 팀 크레딧 </Gray>}
        {isCredit && credit && <Credit> {credit} 크레딧 </Credit>}

        <InBox isTeacher={isTeacher}>
          {/* 기본작인 타이틀과 설명 */}
          <Title isTeacher={isTeacher}>{title}</Title>
          <Description isTeacher={isTeacher}>{description}</Description>

          {/* showButton이 false가 아니면 (기본 true) 버튼을 띄운다. */}
          {showButton && buttonText && <Button onClick={onClick} text={buttonText} />}

          {/* 타자게임용 2시간 타이머 */}
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
  cursor: "pointer";
  text-align: ${props => props.isTeacher ? "center" : "left"};
`;

const Description = styled.p`
  color: #B2B2B2;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 400;
  margin:0px 0px 0px 0px;
  cursor: "pointer";
  text-align: ${props => props.isTeacher ? "center" : "left"};
`;

const Box = styled.div`
    width: ${props => props.width || "246px"};
    height: ${props => props.height || "106px"};
    display: flex;
    padding: ${props => props.isTeacher ? "32px 40px" : props.padding || "57px 37px"};
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 10px;
    border-radius: 12px;
    border: 1px solid #8B8B8B;
    background-color: white;
    cursor: pointer;
    &:hover{
      background-color:  ${(props) => (props.isOrange ? "#FFF2E4" : "white")};
    }
`;

const InBox = styled.div`
    
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
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