import React, { useState, useEffect, useRef } from "react";
import styled from "@emotion/styled";
import Header from "../components/Header.jsx";
import Timer from "../components/Timer.jsx";
import { AxiosInstnce as customaxios } from "../lib/customAxios.js";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 40px;
    padding: 40px;
`;

const MusicQueueContainer = styled.div`
    width: 1100px;
    background: white;
    border-radius: 12px;
    border: 1px solid #8B8B8B;
    padding: 32px;
`;

const MusicTitle = styled.h2`
    color: #1D1D1D;
    font-family: Pretendard;
    font-size: 24px;
    font-weight: 700;
    margin: 0 0 24px 0;
`;

const QueueList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    max-height: 300px;
    overflow-y: auto;
`;

const QueueItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    background: #F9FAFB;
    border-radius: 8px;
    border: 1px solid #E5E7EB;
`;

const MusicInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
    flex: 1;
`;

const MusicTitleText = styled.span`
    font-family: Pretendard;
    font-size: 16px;
    font-weight: 600;
    color: #333;
`;

const TeamText = styled.span`
    font-family: Pretendard;
    font-size: 14px;
    color: #666;
`;

const PlayButton = styled.button`
    padding: 8px 16px;
    border-radius: 8px;
    border: none;
    background: #F07F23;
    color: white;
    font-family: Pretendard;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
        background: #E06F1F;
    }

    &:disabled {
        background: #B2B2B2;
        cursor: not-allowed;
    }
`;

const NowPlaying = styled.div`
    padding: 20px;
    background: #FFF2E4;
    border-radius: 8px;
    margin-bottom: 24px;
    border: 2px solid #F07F23;
`;

const NowPlayingTitle = styled.h3`
    color: #F07F23;
    font-family: Pretendard;
    font-size: 18px;
    font-weight: 700;
    margin: 0 0 8px 0;
`;

const AudioPlayer = styled.audio`
    width: 100%;
    margin-top: 12px;
`;

export default function TimerHome() {
    const [musicQueue, setMusicQueue] = useState([]);
    const [nowPlaying, setNowPlaying] = useState(null);
    const [loading, setLoading] = useState(false);
    const audioRef = useRef(null);

    // 음악 큐 조회
    const fetchMusicQueue = async () => {
        try {
            const response = await customaxios.get(`${import.meta.env.VITE_API_URL}haram/music/queue`);
            setMusicQueue(response.data.queue || []);
        } catch (error) {
            console.error("음악 큐 조회 실패:", error);
        }
    };

    // 첫 로드 시 큐 조회
    useEffect(() => {
        fetchMusicQueue();
        // 10초마다 큐 업데이트
        const interval = setInterval(fetchMusicQueue, 10000);
        return () => clearInterval(interval);
    }, []);

    // 음악 재생
    const handlePlay = async (musicId) => {
        try {
            setLoading(true);
            const token = localStorage.getItem('auth_token');

            const url = musicId
                ? `${import.meta.env.VITE_API_URL}tch/music/stream/${musicId}`
                : `${import.meta.env.VITE_API_URL}tch/music/stream`;

            const response = await customaxios.get(url, {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                responseType: 'blob'
            });

            // 헤더에서 메타데이터 추출
            const title = decodeURIComponent(response.headers['x-music-title'] || 'Unknown');
            const requester = decodeURIComponent(response.headers['x-music-requester'] || 'Unknown');
            const team = decodeURIComponent(response.headers['x-music-team'] || 'Unknown');

            // Blob URL 생성
            const audioBlob = new Blob([response.data], { type: 'audio/webm' });
            const audioUrl = URL.createObjectURL(audioBlob);

            setNowPlaying({
                id: musicId,
                title,
                requester,
                team,
                url: audioUrl
            });

            // 오디오 재생
            if (audioRef.current) {
                audioRef.current.src = audioUrl;
                audioRef.current.play();
            }

            // 큐 업데이트
            await fetchMusicQueue();

        } catch (error) {
            console.error("음악 재생 실패:", error);
            if (error.response?.data?.error === "NOT_FOUND") {
                alert("재생할 음악이 없습니다.");
            } else {
                alert("음악 재생에 실패했습니다.");
            }
        } finally {
            setLoading(false);
        }
    };

    // 음악 종료 시 다음 곡 자동 재생
    const handleEnded = () => {
        if (nowPlaying?.url) {
            URL.revokeObjectURL(nowPlaying.url);
        }
        setNowPlaying(null);

        // 큐에 다음 곡이 있으면 자동 재생
        if (musicQueue.length > 0) {
            handlePlay();
        }
    };

    return (
        <>
            <Header />
            <Container>
                <Timer isTeacher={true} showAnnouncement={true}/>

                {nowPlaying && (
                    <MusicQueueContainer>
                        <NowPlaying>
                            <NowPlayingTitle>재생 중</NowPlayingTitle>
                            <MusicInfo>
                                <MusicTitleText>{nowPlaying.title}</MusicTitleText>
                                <TeamText>신청: {nowPlaying.team} - {nowPlaying.requester}</TeamText>
                            </MusicInfo>
                            <AudioPlayer
                                ref={audioRef}
                                controls
                                onEnded={handleEnded}
                            />
                        </NowPlaying>
                    </MusicQueueContainer>
                )}
            </Container>
        </>
    );
}