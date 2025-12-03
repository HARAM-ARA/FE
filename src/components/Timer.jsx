import React from "react";
import styled from "@emotion/styled";
import Countdown from "react-countdown";
import { useState } from "react";


const TimerCard = styled.div`
    display: flex;
    flex-direction: column;
    background-color:white;
    height: ${(props)=> (props.isTeacher ? "700px" : "270px" )};
    border-radius: 12px;
    border: 1px solid #8B8B8B;
    padding:${(props)=> (props.isTeacher ? "150px 126px 150px 126px;" : " 64px 87px 65px 87px" )};
    justify-content: center;
    align-items: center;
    align-self: stretch;
  `;

const Text = styled.p`
    align-self: stretch;
    color: #5A5A5A;
    text-align: center;
    font-feature-settings: 'liga' off, 'clig' off;
    font-family: Pretendard;
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    margin: 0;
  `;

const DdayBox = styled.div`
    width: 433px;
    height: 29px;
  `;

const TimeText = styled.div`
    align-self: stretch;
    color: #5A5A5A;
    text-align: center;
    font-feature-settings: 'liga' off, 'clig' off;
    font-family: Pretendard;
    font-size: ${(props)=> (props.isTeacher ? "106px" : "70px" )};
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    margin: 0;

  `;

const TimeBox = styled.div`
  width: ${(props)=> (props.isTeacher ? "585px" : "422px" )};
  display: flex;
  align-items: center;  
  justify-content: center;
  gap: 16px;   
`;

const Num = styled.div`
  display: flex;
  flex-direction: column; 
  align-items: top;   
  magin:0; 
`;

const NumberRow = styled.div`
  align-items: center;
  gap: 5px; 
`;

const Colon = styled.div`
  color: #5A5A5A;
  font-family: Pretendard;
  font-size: ${(props)=> (props.isTeacher ? "106px" : "70px" )};
  font-weight: 700;
  line-height: normal;
  align-items: center;
  margin-left:5px;
`;

const Label = styled.div`
  color: #5A5A5A;
  height: 0px;
  text-align: center;
  font-feature-settings: 'liga' off, 'clig' off;
  font-family: Pretendard;
  font-size: ${(props)=> (props.isTeacher ? "24px" : "18px" )};
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const ColonNum = styled.div`
  display:flex;
  gap:5px
`;

export default function Timer({height, isTeacher = false}) {

  const renderer = ({ seconds, minutes, hours, completed }) => {
    if (completed) {
      return <TimeText isTeacher={isTeacher}>종료</TimeText>;
    } else {

      const h = String(hours).padStart(2, "0");
      const m = String(minutes).padStart(2, "0");
      const s = String(seconds).padStart(2, "0");

      return (

        <TimeBox isTeacher={isTeacher}>
          <Num>
            <NumberRow>
              <TimeText isTeacher={isTeacher}>{h}</TimeText>
            </NumberRow>
            <Label isTeacher={isTeacher}>HOURS</Label>
          </Num>
          <Colon isTeacher={isTeacher}>:</Colon>

          <Num>
            <NumberRow>
              <TimeText isTeacher={isTeacher}>{m}</TimeText>
            </NumberRow>
            <Label isTeacher={isTeacher}>MINUTES</Label>
          </Num>
          <Colon isTeacher={isTeacher}>:</Colon>

          <Num>
            <NumberRow>
              <TimeText isTeacher={isTeacher}>{s}</TimeText>
            </NumberRow>
            <Label isTeacher={isTeacher}>SECONDS</Label>
          </Num>
        </TimeBox>

      );
    }
  };

 
  return (
    <>
      <TimerCard height={height} isTeacher={isTeacher} >
        <Countdown 
          date={new Date("2025-12-30T00:00:00").getTime()} 
          renderer={renderer} 
        />
      </TimerCard>
    </>
  )
}