import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import Countdown from "react-countdown";
import { io } from "socket.io-client";

const TimerCard = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  height: ${(props) => (props.isTeacher ? "470px" : "270px")};
  width: ${(props) => (props.isTeacher ? "1100px" : "400px")};
  border-radius: 12px;
  border: 1px solid #8b8b8b;
  padding: 64px 87px 65px 87px;
  justify-content: center;
  align-items: center;
  align-self: stretch;
  margin: auto;
`;

const TimeText = styled.div`
  color: #5a5a5a;
  text-align: center;
  font-family: Pretendard;
  font-size: ${(props) => (props.isTeacher ? "140px" : "70px")};
  font-weight: 700;
`;

const TimeBox = styled.div`
  width: ${(props) => (props.isTeacher ? "800px" : "422px")};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${(props) => (props.isTeacher ? "24px" : "16px")};
`;

const Num = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Colon = styled.div`
  color: #5a5a5a;
  font-family: Pretendard;
  font-size: ${(props) => (props.isTeacher ? "140px" : "70px")};
  font-weight: 700;
`;

const Label = styled.div`
  color: #5a5a5a;
  text-align: center;
  font-family: Pretendard;
  font-size: ${(props) => (props.isTeacher ? "28px" : "18px")};
  font-weight: 400;
`;

const AnnouncementBanner = styled.div`
  width: 100%;
  overflow: hidden;
  margin-bottom: 24px;
  position: absolute;
`;

const AnnouncementText = styled.div`
  color: #f07f23;
  font-family: Pretendard;
  font-size: ${(props) => (props.isTeacher ? "50px" : "20px")};
  font-weight: 900;
  white-space: nowrap;
  animation: scroll-left 15s linear infinite;

  @keyframes scroll-left {
    0% {
      transform: translateX(100%);
    }
    100% {
      transform: translateX(-100%);
    }
  }
`;

const getNextWednesday1030 = () => {
    const now = new Date();
    const result = new Date(now);
    const today = now.getDay();
    const wednesday = 3;

    let diff = wednesday - today;
    if (diff < 0) diff += 7;

    result.setDate(now.getDate() + diff);
    result.setHours(10, 30, 0, 0);

    if (diff === 0 && now >= result) {
        result.setDate(result.getDate() + 7);
    }

    return result.getTime();
};

export default function Timer({ height, isTeacher = false, showAnnouncement = false }) {
    const [announcement, setAnnouncement] = useState(null);
    const [hasSpoken, setHasSpoken] = useState(false);

    useEffect(() => {
        if (!showAnnouncement) return;

        const socket = io("https://api.haram.team", {
            transports: ["websocket", "polling"],
            reconnection: true,
            reconnectionDelay: 1000,
            reconnectionAttempts: 5,
        });

        socket.on("notice:created", (data) => {
            if (data.teacher === false && data.content) {
                setAnnouncement(data.content);
                setHasSpoken(false);
            }
        });

        return () => socket.disconnect();
    }, [showAnnouncement]);

    useEffect(() => {
        if (!showAnnouncement || !announcement || hasSpoken) return;

        const utterance = new SpeechSynthesisUtterance(announcement);
        utterance.lang = "ko-KR";
        utterance.rate = 0.9;

        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(utterance);
        setHasSpoken(true);

        const timer = setTimeout(() => {
            setAnnouncement(null);
            setHasSpoken(false);
        }, 10000);

        return () => clearTimeout(timer);
    }, [showAnnouncement, announcement, hasSpoken]);

    const renderer = ({ days, hours, minutes, seconds, completed }) => {
        if (completed) {
            return <TimeText isTeacher={isTeacher}>종료</TimeText>;
        }

        const totalHours = days * 24 + hours;

        const h = String(totalHours).padStart(2, "0");
        const m = String(minutes).padStart(2, "0");
        const s = String(seconds).padStart(2, "0");

        return (
            <TimeBox isTeacher={isTeacher}>
                <Num>
                    <TimeText isTeacher={isTeacher}>{h}</TimeText>
                    <Label isTeacher={isTeacher}>HOURS</Label>
                </Num>
                <Colon isTeacher={isTeacher}>:</Colon>
                <Num>
                    <TimeText isTeacher={isTeacher}>{m}</TimeText>
                    <Label isTeacher={isTeacher}>MINUTES</Label>
                </Num>
                <Colon isTeacher={isTeacher}>:</Colon>
                <Num>
                    <TimeText isTeacher={isTeacher}>{s}</TimeText>
                    <Label isTeacher={isTeacher}>SECONDS</Label>
                </Num>
            </TimeBox>
        );
    };

    return (
        <TimerCard height={height} isTeacher={isTeacher}>
            {announcement && (
                <AnnouncementBanner>
                    <AnnouncementText isTeacher={isTeacher}>
                        {announcement}
                    </AnnouncementText>
                </AnnouncementBanner>
            )}
            <Countdown date={getNextWednesday1030()} renderer={renderer} />
        </TimerCard>
    );
}