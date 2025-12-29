import React from "react";
import styled from "@emotion/styled";
import Countdown from "react-countdown";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";


const TimerCard = styled.div`
    display: flex;
    flex-direction: column;
    background-color:white;
    height: ${(props)=> (props.isTeacher ? "470px" : "270px" )};
    width: ${(props)=> (props.isTeacher ? "1100px" : "400px" )};
    border-radius: 12px;
    border: 1px solid #8B8B8B;
    padding: ${(props)=> (props.isTeacher ? "64px 87px 65px 87px" : " 64px 87px 65px 87px" )};
    justify-content: center;
    align-items: center;
    align-self: stretch;
    margin: auto;
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
    font-size: ${(props)=> (props.isTeacher ? "140px" : "70px" )};
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    margin: 0;

  `;

const TimeBox = styled.div`
  width: ${(props)=> (props.isTeacher ? "800px" : "422px" )};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${(props)=> (props.isTeacher ? "24px" : "16px" )};
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
  font-size: ${(props)=> (props.isTeacher ? "140px" : "70px" )};
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
  font-size: ${(props)=> (props.isTeacher ? "28px" : "18px" )};
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const ColonNum = styled.div`
  display:flex;
  gap:5px
`;

const AnnouncementBanner = styled.div`
  width: 100%;
  overflow: hidden;
  margin-bottom: 24px;
    position: absolute;
`;

const AnnouncementText = styled.div`
  color: #F07F23;
  font-family: Pretendard;
  font-size: ${(props)=> (props.isTeacher ? "50px" : "20px" )};
  font-weight: 900;
  white-space: nowrap;
  animation: scroll-left 15s linear infinite;
   position: ${(props)=> (props.isTeacher ? "relative" : "none" )};
  @keyframes scroll-left {
    0% {
      transform: translateX(100%);
    }
    100% {
      transform: translateX(-100%);
    }
  }
`;

export default function Timer({height, isTeacher = false, showAnnouncement = false}) {
    const [announcement, setAnnouncement] = useState(null);
    const [hasSpoken, setHasSpoken] = useState(false);


    useEffect(() => {
        if (!showAnnouncement) return; // showAnnouncement가 false면 공지 기능 비활성화

        // Socket.IO 연결
        const socket = io('https://api.haram.team', {
            transports: ['websocket', 'polling'],
            reconnection: true,
            reconnectionDelay: 1000,
            reconnectionAttempts: 5
        });

        socket.on('connect', () => {
            console.log("Socket.IO 연결 성공 (공지)");
        });

        socket.on('notice:created', (data) => {
            try {
                console.log("공지 수신:", data);

                // teacher가 false일 경우에만 공지 표시
                if (data.teacher === false && data.content) {
                    setAnnouncement(data.content);
                    setHasSpoken(false);
                }
            } catch (error) {
                console.error("공지 메시지 처리 실패:", error);
            }
        });

        socket.on('connect_error', (error) => {
            console.error("Socket.IO 연결 에러:", error);
        });

        socket.on('disconnect', () => {
            console.log("Socket.IO 연결 종료");
        });

        return () => {
            socket.disconnect();
        };
    }, [showAnnouncement]);


    useEffect(() => {
        if (!showAnnouncement || !announcement || hasSpoken) return; // showAnnouncement가 false면 TTS 비활성화

        const speak = () => {
            try {
                const utterance = new SpeechSynthesisUtterance(announcement);
                utterance.lang = 'ko-KR';
                utterance.rate = 0.9;
                utterance.pitch = 1.0;
                utterance.volume = 1.0;

                window.speechSynthesis.cancel();

                window.speechSynthesis.speak(utterance);
                setHasSpoken(true);

                console.log("TTS 재생:", announcement);
            } catch (error) {
                console.error("TTS 재생 실패:", error);
            }
        };

        // 바로 실행
        speak();

        // 10초 후에 공지 사라지게
        const timer = setTimeout(() => {
            setAnnouncement(null);
            setHasSpoken(false);
            localStorage.removeItem('announcement');
        }, 10000);

        return () => clearTimeout(timer);
    }, [showAnnouncement, announcement, hasSpoken]);

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
                {announcement && (
                    <AnnouncementBanner>
                        <AnnouncementText isTeacher={isTeacher}>
                            {announcement}
                        </AnnouncementText>
                    </AnnouncementBanner>
                )}
                <Countdown
                    date={new Date("2025-12-30T00:00:00").getTime()}
                    renderer={renderer}
                />
            </TimerCard>
        </>
    )
}