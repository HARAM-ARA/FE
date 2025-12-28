import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { AxiosInstnce as customaxios } from "../lib/customAxios.js";
import SeatDetailModal from "./SeatDetailModal.jsx";

const ChartContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px;
    background: #fff;
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    margin: 20px 0;
`;

const Title = styled.h2`
    color: #1D1D1D;
    font-family: Pretendard;
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 30px;
`;

const ClassroomLayout = styled.div`
    position: relative;
    width: 900px;
    height: 600px;
    border: 2px solid #E0E0E0;
    border-radius: 12px;
    background: #FAFAFA;
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

// 교단 (1,2,3번 좌석 옆)
const TeacherDesk = styled.div`
    position: absolute;
    top: 280px;
    right: 50px;
    width: 80px;
    height: 200px;
    background: #4CAF50;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 600;
    font-size: 14px;
    writing-mode: vertical-rl;
    text-orientation: mixed;
`;

// 팀별 색상 정의
const teamColors = [
    { border: '#FF6B6B', background: '#FFE5E5' }, // 빨간색
    { border: '#4ECDC4', background: '#E5F9F7' }, // 청록색
    { border: '#45B7D1', background: '#E5F4FD' }, // 파란색
    { border: '#96CEB4', background: '#F0F9F4' }, // 초록색
    { border: '#FECA57', background: '#FEF7E0' }, // 노란색
    { border: '#FF9FF3', background: '#FFE5FB' }, // 분홍색
    { border: '#A55EEA', background: '#F0E5FF' }, // 보라색
    { border: '#26DE81', background: '#E5FFF0' }, // 라임색
];

// 좌석 스타일
const Seat = styled.div`
    position: absolute;
    width: 60px;
    height: 40px;
    border: 2px solid #E0E0E0;
    border-radius: 6px;
    background: #F5F5F5;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s ease;
    font-size: 10px;
    
    &:hover {
        border-color: #B0B0B0;
        transform: scale(1.05);
    }
`;

const SeatNumber = styled.div`
    font-weight: 600;
    color: #666;
    font-size: 10px;
`;

const StudentName = styled.div`
    font-weight: 500;
    color: #333;
    font-size: 9px;
    margin-top: 2px;
    text-align: center;
    line-height: 1.1;
`;

// 팀 구역 배치 데이터 (1-27팀을 구역으로 배치)
const teamAreas = [
    // 1열 (맨 오른쪽, 교단 옆) - 3개 팀
    { teamNumber: 1, x: 700, y: 280 },
    { teamNumber: 2, x: 700, y: 360 },
    { teamNumber: 3, x: 700, y: 440 },

    // 2열 - 5개 팀
    { teamNumber: 4, x: 600, y: 120 },
    { teamNumber: 5, x: 600, y: 200 },
    { teamNumber: 6, x: 600, y: 280 },
    { teamNumber: 7, x: 600, y: 360 },
    { teamNumber: 8, x: 600, y: 440 },

    // 3열 - 5개 팀
    { teamNumber: 9, x: 500, y: 120 },
    { teamNumber: 10, x: 500, y: 200 },
    { teamNumber: 11, x: 500, y: 280 },
    { teamNumber: 12, x: 500, y: 360 },
    { teamNumber: 13, x: 500, y: 440 },

    // 4열 - 5개 팀
    { teamNumber: 14, x: 400, y: 120 },
    { teamNumber: 15, x: 400, y: 200 },
    { teamNumber: 16, x: 400, y: 280 },
    { teamNumber: 17, x: 400, y: 360 },
    { teamNumber: 18, x: 400, y: 440 },

    // 5열 - 5개 팀
    { teamNumber: 19, x: 300, y: 120 },
    { teamNumber: 20, x: 300, y: 200 },
    { teamNumber: 21, x: 300, y: 280 },
    { teamNumber: 22, x: 300, y: 360 },
    { teamNumber: 23, x: 300, y: 440 },

    // 6열 (맨 왼쪽) - 4개 팀 (27번까지)
    { teamNumber: 24, x: 200, y: 120 },
    { teamNumber: 25, x: 200, y: 200 },
    { teamNumber: 26, x: 200, y: 280 },
    { teamNumber: 27, x: 200, y: 360 },
];

const TeamLegend = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    margin-bottom: 20px;
    padding: 16px;
    background: #F8F9FA;
    border-radius: 8px;
`;

const LegendItem = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`;

const ColorBox = styled.div`
    width: 20px;
    height: 20px;
    border: 2px solid ${props => props.borderColor};
    background: ${props => props.backgroundColor};
    border-radius: 4px;
`;

const LegendText = styled.span`
    font-family: Pretendard;
    font-size: 14px;
    font-weight: 500;
    color: #333;
`;

export default function SeatingChart({ teams = [], onSeatingChange }) {
    const [teamArrangement, setTeamArrangement] = useState({}); // 팀 번호 -> 팀 정보 매핑
    const [teamColorMap, setTeamColorMap] = useState({});
    const [selectedTeam, setSelectedTeam] = useState(null);
    const [showSeatModal, setShowSeatModal] = useState(false);

    useEffect(() => {
        // 팀별 색상 매핑
        const colorMap = {};
        teams.forEach((team, index) => {
            const teamId = team.teamId || team.id;
            colorMap[teamId] = teamColors[index % teamColors.length];
        });
        setTeamColorMap(colorMap);

        // 팀을 팀 번호에 매핑 (teamId가 팀 번호)
        const newArrangement = {};
        teams.forEach(team => {
            const teamId = team.teamId || team.id;
            newArrangement[teamId] = {
                teamId: teamId,
                teamName: team.name || team.teamName,
                members: team.members || [],
                color: colorMap[teamId]
            };
        });

        setTeamArrangement(newArrangement);
        onSeatingChange?.(newArrangement);
    }, [teams]);

    const handleTeamClick = async (teamNumber) => {
        const team = teamArrangement[teamNumber];

        // 팀이 없는 경우
        if (!team) {
            setSelectedTeam({
                seatNumber: teamNumber,
                teamId: null,
                students: [],
                teamColor: null,
                teamName: null
            });
            setShowSeatModal(true);
            return;
        }

        try {
            const token = localStorage.getItem("auth_token");
            const response = await customaxios.get(
                `${import.meta.env.VITE_API_URL}tch/team/student/${team.teamId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            // API 응답을 모달에 전달할 형태로 변환
            const teamStudents = response.data.student.map(student => ({
                ...student,
                id: student.userId,
                teamId: team.teamId,
                teamName: team.teamName
            }));

            setSelectedTeam({
                seatNumber: teamNumber,
                teamId: team.teamId,
                students: teamStudents,
                teamColor: team.color,
                teamName: team.teamName
            });
            setShowSeatModal(true);

        } catch (error) {
            console.error("팀 학생 목록 조회 실패:", error);
            alert("팀 정보를 불러오는데 실패했습니다.");
        }
    };

    return (
        <ChartContainer>
            <Title>교실 좌석 배치 (팀 단위)</Title>
            <ClassroomLayout>
                <TeacherDesk>교단</TeacherDesk>

                {teamAreas.map(area => {
                    const team = teamArrangement[area.teamNumber];
                    const teamColor = team?.color || { border: '#E0E0E0', background: '#F5F5F5' };

                    return (
                        <Seat
                            key={area.teamNumber}
                            style={{
                                left: area.x,
                                top: area.y,
                                borderColor: teamColor.border,
                                backgroundColor: teamColor.background
                            }}
                            onClick={() => handleTeamClick(area.teamNumber)}
                        >
                            <SeatNumber>팀 {area.teamNumber}</SeatNumber>
                            {team && (
                                <StudentName>
                                    {team.members?.length || 0}명
                                </StudentName>
                            )}
                        </Seat>
                    );
                })}
            </ClassroomLayout>

            <SeatDetailModal
                isOpen={showSeatModal}
                onClose={() => setShowSeatModal(false)}
                seatData={selectedTeam}
            />
        </ChartContainer>
    );
}