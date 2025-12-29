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
    const isTeacherTimerPage = location.pathname === '/tch/timer';
    const shouldPlayMusic = isTimerPage || isTeacherTimerPage;
    
    const [announcement, setAnnouncement] = useState(null);
    const [hasSpoken, setHasSpoken] = useState(false);
    const [currentMusic, setCurrentMusic] = useState(null);
    const [currentSongTitle, setCurrentSongTitle] = useState('');
    const [playerState, setPlayerState] = useState('준비중');
    const [isPlaying, setIsPlaying] = useState(false);
    const playerRef = useRef(null);
    const [isPlayerReady, setIsPlayerReady] = useState(false);
    const [userRole, setUserRole] = useState(null);
    const [currentSongData, setCurrentSongData] = useState(null);
    const [apiCalledForCurrentSong, setApiCalledForCurrentSong] = useState(false); // API 호출 중복 방지

    // 음악 스트리밍 API 호출 함수 (곡 종료 시)
    const callMusicStreamAPI = async (musicId) => {
        try {
            const token = localStorage.getItem("auth_token");
            const response = await AxiosInstnce.get(`/tch/music/stream/${musicId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('🎵 음악 스트리밍 API 호출 성공:', musicId, response.data);
        } catch (error) {
            console.error('🎵 음악 스트리밍 API 호출 실패:', musicId, error);
        }
    };

    // 기존 프로필 정보 가져오기 (중복 API 호출 방지)
    const getUserRoleFromStorage = async () => {
        try {
            // 먼저 localStorage에서 확인
            const cachedProfile = localStorage.getItem('userProfile');
            if (cachedProfile) {
                const profile = JSON.parse(cachedProfile);
                console.log('👤 캐시된 프로필 사용:', profile);
                return profile.role;
            }
            
            // 캐시가 없으면 API 호출
            const token = localStorage.getItem("auth_token");
            if (!token) return null;
            
            const response = await AxiosInstnce.get("/haram/auth/profile", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            
            console.log('👤 프로필 API 응답:', response.data);
            
            if (response.data.success && response.data.data.user) {
                const user = response.data.data.user;
                // localStorage에 캐시
                localStorage.setItem('userProfile', JSON.stringify(user));
                setUserRole(user.role);
                console.log('👤 사용자 role 설정:', user.role);
                return user.role;
            }
            
            return null;
        } catch (error) {
            console.error('👤 프로필 가져오기 실패:', error);
            return null;
        }
    };

    // YouTube 플레이어 초기화
    useEffect(() => {
        if (!shouldPlayMusic) return;
        
        // YouTube iframe API 로드
        if (!window.YT) {
            const tag = document.createElement('script');
            tag.src = 'https://www.youtube.com/iframe_api';
            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        }

        // YouTube API 준비 완료 콜백
        window.onYouTubeIframeAPIReady = () => {
            if (!shouldPlayMusic) return;
            
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
                        
                        // 플레이어 준비 완료 후 음악 큐 확인
                        setTimeout(() => {
                            fetchMusicQueue();
                        }, 1000);
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
                        
                        console.log('🎵 YouTube 플레이어 상태 변경:', stateName, event.data);
                        
                        // 재생이 시작되면 스트리밍 API 호출 (중복 방지)
                        if (event.data === 1 && currentSongData && currentSongData.id && !apiCalledForCurrentSong) {
                            console.log('🎵 재생 시작됨. 스트리밍 API 호출:', currentSongData.id);
                            setApiCalledForCurrentSong(true);
                            callMusicStreamAPI(currentSongData.id);
                        } else if (event.data === 1 && apiCalledForCurrentSong) {
                            console.log('🎵 재생 시작됨. 하지만 이미 API 호출됨:', currentSongData?.id);
                        }
                        
                        // 자동재생이 차단된 경우 사용자 상호작용 대기
                        if (event.data === -1 && currentMusic) {
                            console.log('🎵 자동재생이 차단됨. 클릭하여 재생하세요.');
                            setPlayerState('클릭하여 재생');
                            
                            // 사용자 상호작용 이벤트 리스너 추가
                            const handleUserInteraction = () => {
                                if (playerRef.current && currentMusic) {
                                    console.log('🎵 사용자 상호작용 후 재생 시도');
                                    playerRef.current.playVideo();
                                    document.removeEventListener('click', handleUserInteraction);
                                    document.removeEventListener('keydown', handleUserInteraction);
                                }
                            };
                            
                            document.addEventListener('click', handleUserInteraction, { once: true });
                            document.addEventListener('keydown', handleUserInteraction, { once: true });
                        }
                        
                        if (event.data === window.YT.PlayerState.ENDED) {
                            // 현재 곡 초기화 후 다음 곡 재생
                            setCurrentMusic(null);
                            setApiCalledForCurrentSong(false); // API 호출 플래그 초기화
                            
                            // 바로 다음 곡 재생 (지연 시간 최소화)
                            setTimeout(() => {
                                console.log('🎵 곡이 끝났습니다. 바로 다음 곡을 재생합니다.');
                                fetchMusicQueue();
                            }, 500);
                        }
                    }
                }
            });
        };

        // 이미 API가 로드되어 있다면 바로 실행
        if (window.YT && window.YT.Player) {
            window.onYouTubeIframeAPIReady();
        }
        
        // 컴포넌트 언마운트 시 정리
        return () => {
            if (playerRef.current && playerRef.current.destroy) {
                playerRef.current.destroy();
            }
        };
    }, [shouldPlayMusic]);

    // 현재 사용자 role을 즉시 확인하는 함수
    const getCurrentUserRole = () => {
        try {
            const cachedProfile = localStorage.getItem('userProfile');
            if (cachedProfile) {
                const profile = JSON.parse(cachedProfile);
                console.log('👤 실시간 role 확인:', profile.role);
                return profile.role;
            }
            return null;
        } catch (error) {
            console.error('👤 role 확인 실패:', error);
            return null;
        }
    };

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

    // 음악 큐 가져오기 (음악 재생 페이지에서만)
    const fetchMusicQueue = async () => {
        if (!shouldPlayMusic) return;
        
        // 현재 재생 중이면 큐 체크하지 않음
        if (isPlaying && currentMusic) {
            console.log('🎵 현재 재생 중이므로 큐 체크 건너뜀:', currentMusic);
            return;
        }
        
        try {
            const response = await AxiosInstnce.get("/haram/music/queue");
            console.log('음악 큐 응답:', response.data);
            
            if (response.data.queue && response.data.queue.length > 0) {
                const firstSong = response.data.queue[0];
                console.log('🎵 첫 번째 곡 정보:', firstSong);
                
                const videoId = extractVideoId(firstSong.url);
                console.log('🎵 추출된 비디오 ID:', videoId, '원본 URL:', firstSong.url);
                
                setCurrentSongTitle(cleanSongTitle(firstSong.title));
                setCurrentSongData(firstSong);
                
                // 새로운 곡이고 현재 재생 중이 아닐 때만 재생
                if (videoId && videoId !== currentMusic && !isPlaying) {
                    console.log('🎵 새로운 곡 감지 - 현재:', currentMusic, '새로운:', videoId, '재생상태:', isPlaying);
                    setCurrentMusic(videoId);
                    setApiCalledForCurrentSong(false); // 새로운 곡이므로 API 호출 플래그 초기화
                    
                    // 플레이어가 준비되면 음악 재생
                    if (isPlayerReady && playerRef.current) {
                        console.log('🎵 YouTube 플레이어로 비디오 로드 시작:', videoId);
                        playerRef.current.loadVideoById(videoId);
                        console.log('🎵 음악 재생 시작:', cleanSongTitle(firstSong.title));
                    } else {
                        console.log('🎵 플레이어가 준비되지 않음 - isPlayerReady:', isPlayerReady, 'playerRef:', !!playerRef.current);
                    }
                } else {
                    console.log('🎵 곡 로드 건너뜀 - videoId:', videoId, 'currentMusic:', currentMusic, 'isPlaying:', isPlaying);
                }
            } else {
                console.log('🎵 큐가 비어있습니다. 재생을 중단합니다.');
                setCurrentSongTitle('재생할 곡이 없습니다');
                setPlayerState('대기중');
                setIsPlaying(false);
                setCurrentMusic(null);
            }
        } catch (error) {
            console.error('음악 큐 가져오기 실패:', error);
            setPlayerState('오류');
        }
    };

    // 현재 음악이 변경되면 재생
    useEffect(() => {
        console.log('🎵 useEffect 트리거 - currentMusic:', currentMusic, 'isPlayerReady:', isPlayerReady, 'playerRef:', !!playerRef.current);
        
        if (currentMusic && isPlayerReady && playerRef.current) {
            console.log('🎵 useEffect에서 비디오 로드:', currentMusic);
            try {
                playerRef.current.loadVideoById(currentMusic);
                console.log('🎵 loadVideoById 호출 완료');
            } catch (error) {
                console.error('🎵 loadVideoById 에러:', error);
            }
        }
    }, [currentMusic, isPlayerReady]);

    useEffect(() => {
        // 컴포넌트 마운트 시 사용자 프로필 가져오기
        if (isTimerPage) {
            getUserRoleFromStorage().then(role => {
                if (role) {
                    setUserRole(role);
                    console.log('👤 초기 role 설정 완료:', role);
                }
            });
        }
        
        // 음악 재생 페이지에서만 음악 기능 활성화
        if (shouldPlayMusic) {
            // 주기적 체크 완전 비활성화 - 곡이 끝날 때만 다음 곡 로드
            console.log('🎵 주기적 큐 체크 비활성화됨');
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
    }, [showAnnouncement, isPlayerReady, shouldPlayMusic]);


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
            {shouldPlayMusic && (
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
                        {isTimerPage && getCurrentUserRole() === 'teacher' && <div style={{marginLeft: '8px', fontSize: '10px'}}>🎵</div>}
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