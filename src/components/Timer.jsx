import React from "react";
import styled from "@emotion/styled";
import Countdown from "react-countdown";
import { useState } from "react";


const TimerCard = styled.div`
    display: flex;
    flex-direction: column;
    background-color:white;
    height:270px;
    border-radius: 12px;
    border: 1px solid #8B8B8B;
    padding: 64px 87px 65px 87px;
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
    font-size: 70px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    margin: 0;

  `;

const TimeBox = styled.div`
  width: 433px;
  display: flex;
  align-items: center;  
  justify-content: center;
  gap: 16px;   
`;

const Num = styled.div`
  display: flex;
  flex-direction: column; 
  align-items: center;   
  magin:0; 
`;

const NumberRow = styled.div`
  align-items: center;
  gap: 5px; 
`;

const Colon = styled.div`
  color: #5A5A5A;
  font-family: Pretendard;
  font-size: 70px;
  font-weight: 700;
  line-height: normal;
  margin-left:5px;
`;



const Label = styled.div`
  color: #5A5A5A;
  text-align: center;
  font-feature-settings: 'liga' off, 'clig' off;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const ColonNum = styled.div`
  display:flex;
  gap:5px
`;




const renderer = ({ seconds, minutes, hours, completed }) => {
  if (completed) {
    return <TimeText>종료</TimeText>;
  } else {

    const h = String(hours).padStart(2, "0");
    const m = String(minutes).padStart(2, "0");
    const s = String(seconds).padStart(2, "0");

    return (

      <TimeBox>
        <Num>
          <ColonNum>
            <NumberRow>
              <TimeText>{h}</TimeText>
              <Label>HOURS</Label>
            </NumberRow>
            <Colon>:</Colon>
          </ColonNum>
        </Num>

        <Num>
          <ColonNum>
            <NumberRow>
              <TimeText>{m}</TimeText>
              <Label>MINUTES</Label>
            </NumberRow>
            <Colon>:</Colon>
          </ColonNum>
        </Num>

        <Num>
          <NumberRow>
            <TimeText>{s}</TimeText>

          </NumberRow>
          <Label>SECONDS</Label>
        </Num>
      </TimeBox>

    );
  }
};




export default function Timer() {


 
  return (
    <>
      <TimerCard>
        <DdayBox>
          <Text>D-DAY</Text>
        </DdayBox>
        <Countdown 

        date={new Date("2025-12-30T00:00:00").getTime()} renderer={renderer} 
/>
      </TimerCard>
    </>
  )
}
