import React from "react";
import styled from '@emotion/styled';
import Button from './button.jsx';
import Countdown from "react-countdown";

const Title = styled.p`
  color: #1D1D1D;
  font-family: Pretendard;
  font-size: 24px;
  font-weight: 500;
  margin:0px 0px 0px 0px;
  cursor: "pointer"
`;

const Description = styled.p`
  color: #B2B2B2;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 400;
  margin:0px 0px 0px 0px;
  cursor: "pointer"
`;

const Box = styled.div`
    width: ${props => props.width || "246px"};
    height: ${props => props.height || "106px"};
    display: flex;
    padding: 57px 37px;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    border-radius: 12px;
    border: 1px solid #8B8B8B;
    background-color:white;
    cursor: "pointer"
    
  `;

const InBox = styled.div`
    
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    align-self: stretch;
    background-color:white;
    cursor: "pointer"
    
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

export default function Card({ width, height, title, description, buttonText, onClick, showButton = true, isTimer = false }) {


  return (
    <>
      <Box width={width} height={height} onClick={onClick}>
        <InBox>
          <Title>{title}</Title>
          <Description>{description}</Description>
          {showButton && buttonText && <Button onClick={onClick} text={buttonText} />}
          {isTimer && 
          <Timer>
            <Countdown
            date={Date.now() + 2 * 60 * 60 * 1000}
            renderer={({ hours, minutes, seconds }) => (
              <TimerText>
                {String(hours).padStart(2, "0")} :
                {String(minutes).padStart(2, "0")} :
                {String(seconds).padStart(2, "0")}
              </TimerText>
            )}
          />
          </Timer>}
        </InBox>

      </Box>

    </>
  )
}