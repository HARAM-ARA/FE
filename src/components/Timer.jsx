import React from "react";
import styled from "@emotion/styled";
import Countdown from "react-countdown";
import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { io } from "socket.io-client";
import { AxiosInstnce } from "../lib/customAxios";


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

const MusicIndicator = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 8px 12px;
  border-radius: 20px;
  font-family: Pretendard;
  font-size: 12px;
  font-weight: 500;
  z-index: 10;
`;

const MusicIcon = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${props => props.isPlaying ? '#4CAF50' : '#f44336'};
  animation: ${props => props.isPlaying ? 'pulse 1.5s infinite' : 'none'};
  
  @keyframes pulse {
    0% { opacity: 1; }
    50% { opacity: 0.5; }
    100% { opacity: 1; }
  }
`;

const MusicInfo = styled.div`
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;



export default function Timer({height, isTeacher = false, showAnnouncement = false}) {
    const location = useLocation();
    const isTimerPage = location.pathname === '/timer';
    
    const [announcement, setAnnouncement] = useState(null);
    const [hasSpoken, setHasSpoken] = useState(false);
    const [currentMusic, setCurrentMusic] = useState(null);
    const [currentSongTitle, setCurrentSongTitle] = useState('');
    const [playerState, setPlayerState] = useState('준비중');
    const [isPlaying, setIsPlaying] = useState(false);
    const playerRef = useRef(null);
    const [isPlayerReady, setIsPlayerReady] = useState(false);

    // YouTube 플레이어 초기화 (/timer 페이지에서만)
    useEffect(() => {
        if (!isTimerPage) return;
        
        // YouTube iframe API 로드
        if (!window.YT) {
            const tag = document.createElement('script');
            tag.src = 'https://www.youtube.com/iframe_api';
            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        }

        // YouTube API 준비 완료 콜백
        window.onYouTubeIframeAPIReady = () => {
            if (!isTimerPage) return; // 다시 한번 확인
            
            playerRef.current = new window.YT.Player('youtube-player', {
                height: '1',
                width: '1',
                playerVars: {
                    autoplay: 1,
                    controls: 0,
                    disablekb: 1,
                    fs: 0,
                    iv_load_policy: 3,
                    modestbranding: 1,
                    rel: 0,
                    showinfo: 0
                },
                events: {
                    onReady: () => {
                        setIsPlayerReady(true);
                        setPlayerState('준비완료');
                        console.log('YouTube 플레이어 준비 완료');
                    },
                    onStateChange: (event) => {
                        const states = {
                            [-1]: '시작되지않음',
                            [0]: '종료됨',
                            [1]: '재생중',
                            [2]: '일시정지',
                            [3]: '버퍼링',
                            [5]: '큐됨'
                        };
                        
                        const stateName = states[event.data] || '알수없음';
                        setPlayerState(stateName);
                        setIsPlaying(event.data === 1);
                        
                        if (event.data === window.YT.PlayerState.ENDED) {
                            // 곡이 끝나면 다음 곡 재생 로직 추가 가능
                            fetchMusicQueue();
                        }
                    }
                }
            });
        };

        // 이미 API가 로드되어 있다면 바로 실행
        if (window.YT && window.YT.Player) {
            window.onYouTubeIframeAPIReady();
        }
    }, [isTimerPage]);

    // 곡 제목 정리 함수
    const cleanSongTitle = (title) => {
        if (!title) return '';
        
        // 불필요한 부분들 제거
        let cleanTitle = title
            .replace(/\[.*?\]/g, '') // [UPSET], [Lyrics/가사] 등 대괄호 내용 제거
            .replace(/\(.*?\)/g, '') // (Official Video) 등 소괄호 내용 제거
            .replace(/ㅣ.*$/g, '') // ㅣ 이후 모든 내용 제거
            .replace(/\|.*$/g, '') // | 이후 모든 내용 제거
            .replace(/\s+/g, ' ') // 연속된 공백을 하나로
            .trim(); // 앞뒤 공백 제거
            
        return cleanTitle || '음악 재생 중';
    };

    // YouTube URL에서 비디오 ID 추출
    const extractVideoId = (url) => {
        const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
        const match = url.match(regex);
        return match ? match[1] : null;
    };

    // 음악 큐 가져오기 (/timer 페이지에서만)
    const fetchMusicQueue = async () => {
        if (!isTimerPage) return;
        
        try {
            const response = await AxiosInstnce.get("/haram/music/queue");
            console.log('음악 큐 응답:', response.data);
            
            if (response.data.queue && response.data.queue.length > 0) {
                const firstSong = response.data.queue[0];
                const videoId = extractVideoId(firstSong.url);
                
                setCurrentSongTitle(cleanSongTitle(firstSong.title));
                
                if (videoId && videoId !== currentMusic) {
                    setCurrentMusic(videoId);
                    
                    // 플레이어가 준비되면 음악 재생
                    if (isPlayerReady && playerRef.current) {
                        playerRef.current.loadVideoById(videoId);
                        console.log('음악 재생 시작:', cleanSongTitle(firstSong.title));
                    }
                }
            } else {
                setCurrentSongTitle('재생할 곡이 없습니다');
            }
        } catch (error) {
            console.error('음악 큐 가져오기 실패:', error);
        }
    };

    // 현재 음악이 변경되면 재생
    useEffect(() => {
        if (currentMusic && isPlayerReady && playerRef.current) {
            playerRef.current.loadVideoById(currentMusic);
        }
    }, [currentMusic, isPlayerReady]);


    useEffect(() => {
        // /timer 페이지에서만 음악 기능 활성화
        if (isTimerPage) {
            // 컴포넌트 마운트 시 음악 큐 가져오기
            fetchMusicQueue();

            // 주기적으로 음악 큐 확인 (30초마다)
            const musicInterval = setInterval(fetchMusicQueue, 30000);
            
            return () => clearInterval(musicInterval);
        }

        if (!showAnnouncement) return;

        const socket = io('http://blleaf.kro.kr:8031', {
            transports: ['websocket', 'polling'],
            reconnection: true,
            reconnectionDelay: 1000,
            reconnectionAttempts: 5
        });
        
        socket.on('connect', () => {

        });

        socket.on('notice:created', (data) => {
            try {
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

        });

        return () => {
            socket.disconnect();
        };
    }, [showAnnouncement, isPlayerReady, isTimerPage]);


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
            {isTimerPage && (
                <>
                    <div style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }}>
                        <div id="youtube-player"></div>
                    </div>
                    
                    <MusicIndicator>
                        <MusicIcon isPlaying={isPlaying} />
                        <MusicInfo>
                            {currentSongTitle || '음악 로딩 중...'}
                        </MusicInfo>
                        <div>({playerState})</div>
                    </MusicIndicator>
                </>
            )}
            
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