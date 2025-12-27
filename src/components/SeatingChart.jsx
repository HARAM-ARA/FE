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

// 좌석 배치 데이터 (가운데 정렬, 교단이 오른쪽)
const seatPositions = [
    // 1열 (맨 오른쪽, 교단 옆)
    { number: 1, x: 700, y: 280 },
    { number: 2, x: 700, y: 360 },
    { number: 3, x: 700, y: 440 },
    
    // 2열
    { number: 4, x: 600, y: 120 },
    { number: 5, x: 600, y: 200 },
    { number: 6, x: 600, y: 280 },
    { number: 7, x: 600, y: 360 },
    { number: 8, x: 600, y: 440 },
    
    // 3열
    { number: 9, x: 500, y: 120 },
    { number: 10, x: 500, y: 200 },
    { number: 11, x: 500, y: 280 },
    { number: 12, x: 500, y: 360 },
    { number: 13, x: 500, y: 440 },
    
    // 4열
    { number: 14, x: 400, y: 120 },
    { number: 15, x: 400, y: 200 },
    { number: 16, x: 400, y: 280 },
    { number: 17, x: 400, y: 360 },
    { number: 18, x: 400, y: 440 },
    
    // 5열
    { number: 19, x: 300, y: 120 },
    { number: 20, x: 300, y: 200 },
    { number: 21, x: 300, y: 280 },
    { number: 22, x: 300, y: 360 },
    { number: 23, x: 300, y: 440 },
    
    // 6열 (맨 왼쪽)
    { number: 24, x: 200, y: 120 },
    { number: 25, x: 200, y: 200 },
    { number: 26, x: 200, y: 280 },
    { number: 27, x: 200, y: 360 },
    { number: 28, x: 200, y: 440 },
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
    const [seatingArrangement, setSeatingArrangement] = useState({});
    const [allStudents, setAllStudents] = useState([]);
    const [teamColorMap, setTeamColorMap] = useState({});
    const [selectedSeat, setSelectedSeat] = useState(null);
    const [showSeatModal, setShowSeatModal] = useState(false);
    const [seatTeamMap, setSeatTeamMap] = useState({}); // 좌석 번호 -> 팀 ID 매핑

    useEffect(() => {
        // 모든 팀의 학생들을 하나의 배열로 합치기
        const students = teams.flatMap(team => 
            team.members?.map(member => ({
                ...member,
                id: member.id || member.userId, // API 응답에 맞게 통일
                teamName: team.name || team.teamName,
                teamId: team.teamId || team.id
            })) || []
        );
        setAllStudents(students);

        // 팀별 색상 매핑
        const colorMap = {};
        teams.forEach((team, index) => {
            const teamId = team.teamId || team.id;
            colorMap[teamId] = teamColors[index % teamColors.length];
        });
        setTeamColorMap(colorMap);

        // 자동으로 전체 팀 배치
        if (students.length > 0) {
            const newArrangement = {};
            const newSeatTeamMap = {};
            let seatIndex = 0;
            
            // 팀별로 순서대로 배치
            teams.forEach(team => {
                if (team.members) {
                    team.members.forEach(member => {
                        if (seatIndex < seatPositions.length) {
                            const seatNumber = seatPositions[seatIndex].number;
                            newArrangement[seatNumber] = {
                                ...member,
                                id: member.id || member.userId,
                                teamName: team.name || team.teamName,
                                teamId: team.teamId || team.id
                            };
                            // 좌석 번호와 팀 ID 매핑
                            newSeatTeamMap[seatNumber] = team.teamId || team.id;
                            seatIndex++;
                        }
                    });
                }
            });
            
            setSeatingArrangement(newArrangement);
            setSeatTeamMap(newSeatTeamMap);
            onSeatingChange?.(newArrangement);
        }
    }, [teams]);

    const handleSeatClick = async (seatNumber) => {
        const teamId = seatTeamMap[seatNumber];
        if (!teamId) {
            setSelectedSeat({
                seatNumber,
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
                `${import.meta.env.VITE_API_URL}tch/team/student/${teamId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            
            // 현재 팀 정보 찾기
            const currentTeam = teams.find(t => (t.teamId || t.id) === teamId);
            const teamName = currentTeam?.name || currentTeam?.teamName || `팀 ${teamId}`;
            
            // API 응답을 모달에 전달할 형태로 변환
            const teamStudents = response.data.student.map(student => ({
                ...student,
                id: student.userId,
                teamId: teamId,
                teamName: teamName
            }));

            setSelectedSeat({ 
                seatNumber, 
                teamId, 
                students: teamStudents,
                teamColor: teamColorMap[teamId],
                teamName: teamName
            });
            setShowSeatModal(true);
            
        } catch (error) {
            console.error("팀 학생 목록 조회 실패:", error);
            alert("팀 정보를 불러오는데 실패했습니다.");
        }
    };

    const getStudentTeamColor = (student) => {
        if (!student || !student.teamId) return null;
        return teamColorMap[student.teamId];
    };

    return (
        <ChartContainer>
            <Title>교실 좌석 배치</Title>
            <ClassroomLayout>
                <TeacherDesk>교단</TeacherDesk>
                
                {seatPositions.map(position => {
                    const student = seatingArrangement[position.number];
                    
                    return (
                        <Seat
                            key={position.number}
                            style={{ left: position.x, top: position.y }}
                            onClick={() => handleSeatClick(position.number)}
                            data-student-id={student?.id || student?.userId}
                        >
                            <SeatNumber>{position.number}</SeatNumber>
                            {student && (
                                <StudentName>
                                    {student.name}
                                    <br />
                                    {student.gradeClassNum || student.id || student.userId}
                                </StudentName>
                            )}
                        </Seat>
                    );
                })}
            </ClassroomLayout>

            <SeatDetailModal
                isOpen={showSeatModal}
                onClose={() => setShowSeatModal(false)}
                seatData={selectedSeat}
            />
        </ChartContainer>
    );
}