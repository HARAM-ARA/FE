import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { AxiosInstnce as customaxios } from "../lib/customAxios.js";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header.jsx";
import TeamCard from "../components/TeamSpaceComponent/TeamCard.jsx";
import TeamDetailModal from "../components/TeamSpaceComponent/TeamDetailModal.jsx";
import DeleteConfirmModal from "../components/TeamSpaceComponent/DeleteConfirmModal.jsx";
import SeatingChart from "../components/SeatingChart.jsx";
import VectorIcon from "../assets/vector.svg";

const Body = styled.div`
    min-height: 575px;
    margin: 0px 50px 95px 50px;
    background: #fff;
`;

const TopDiv = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 32px;
`;

const TitleSection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 2px;
`;

const Title = styled.p`
    color: #1D1D1D;
    font-family: Pretendard;
    font-size: 28px;
    font-style: normal;
    font-weight: 700;
    line-height: 160%;
    margin-bottom: 0;
`;

const Description = styled.p`
    color: #B2B2B2;
    font-feature-settings: 'liga' off, 'clig' off;
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 160%;
    margin: 0;
    white-space: pre-line;
`;

const RightSection = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
`;

const SearchWrapper = styled.div`
    position: relative;
    display: flex;
    align-items: center;
`;

const SearchBox = styled.input`
    width: 400px;
    padding: 18px 54px 18px 24px;
    border-radius: 12px;
    border: 1px solid #B2B2B2;
    background: #FFF;

    &::placeholder {
        color: #8B8B8B;
        font-family: Pretendard;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 160%;
    }

    &:focus {
        outline: none;
        border-color: #F07F23;
    }
`;

const SearchIcon = styled.img`
    position: absolute;
    right: 20px;
    width: 24px;
    height: 24px;
    pointer-events: none;
`;

const TeamGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
    margin-top: 24px;
`;

const AddTeamCard = styled.div`
    display: flex;
    height: 88px;
    padding: 10px 20px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    align-self: stretch;
    border-radius: 12px;
    border: 1px solid #8B8B8B;

    &:hover {
        border-color: #F5D6BD;
        background: #FFF2E4;
    }
`;

const AddTeamText = styled.p`
    color: #8B8B8B;
    font-feature-settings: 'liga' off, 'clig' off;
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    margin: 0;
`;

const DeleteBtn = styled.button`
    display: flex;
    width: 184px;
    height: 55px;
    padding: 16px 24px;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    border-radius: 12px;
    border: 2px solid #B2B2B2;
    background-color: #fff;
    &:hover{
          border: 2px solid #B2B2B2;
      }
`;
const BtnText = styled.p`
    color: #646464;
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
`;

const TabContainer = styled.div`
    display: flex;
    gap: 8px;
    margin-bottom: 24px;
    border-bottom: 2px solid #F0F0F0;
`;

const Tab = styled.button`
    padding: 12px 24px;
    border: none;
    background: ${props => props.active ? '#F07F23' : 'transparent'};
    color: ${props => props.active ? '#fff' : '#8B8B8B'};
    font-family: Pretendard;
    font-size: 16px;
    font-weight: 600;
    border-radius: 8px 8px 0 0;
    cursor: pointer;
    transition: all 0.2s ease;
    
    &:hover {
        background: ${props => props.active ? '#E65100' : '#F5F5F5'};
    }
`;

export default function TeamSpace() {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedTeams, setSelectedTeams] = useState([]);
    const [selectedTeamForDetail, setSelectedTeamForDetail] = useState(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [teams, setTeams] = useState([]);
    const [activeTab, setActiveTab] = useState("teams"); // "teams" 또는 "seating"
    const [seatingArrangement, setSeatingArrangement] = useState({});

    // API에서 팀 목록 가져오기
    useEffect(() => {
        fetchTeams();
    }, []);

    const fetchTeams = async () => {
        try {
            const token = localStorage.getItem("auth_token");
            const response = await customaxios.get(`${import.meta.env.VITE_API_URL}haram/team`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log("팀 목록 응답:", response.data);
            const teamsList = response.data.teams || [];
            
            // 각 팀의 멤버 정보를 가져오기
            const teamsWithMembers = await Promise.all(
                teamsList.map(async (team) => {
                    try {
                        const memberResponse = await customaxios.get(
                            `${import.meta.env.VITE_API_URL}tch/team/student/${team.teamId}`,
                            {
                                headers: {
                                    Authorization: `Bearer ${token}`
                                }
                            }
                        );
                        
                        return {
                            ...team,
                            members: memberResponse.data.student.map(student => ({
                                id: student.userId,
                                userId: student.userId,
                                name: student.name,
                                gradeClassNum: student.userId
                            }))
                        };
                    } catch (error) {
                        return {
                            ...team,
                            members: []
                        };
                    }
                })
            );
            
            setTeams(teamsWithMembers);

            // 팀이 없으면 랜덤 생성 페이지로 이동
            if (teamsWithMembers.length === 0) {
                navigate('/teams/random');
            }
        } catch (error) {
            console.error("팀 목록 조회 실패:", error);
            alert("팀 목록을 불러오는데 실패했습니다.");
        }
    };

    const filteredTeams = teams.filter(team =>
        team.teamName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        team.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleTeamSelect = (teamId) => {
        setSelectedTeams(prev =>
            prev.includes(teamId)
                ? prev.filter(id => id !== teamId)
                : [...prev, teamId]
        );
    };

    const handleTeamClick = async (team) => {
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
            console.log("팀 상세 조회 응답:", response.data);

            // 백엔드 응답을 모달이 기대하는 형식으로 변환
            const teamDetail = {
                teamId: team.teamId,
                name: team.teamName,
                members: response.data.student.map(student => ({
                    id: student.userId,
                    name: student.name,
                    gradeClassNum: student.userId // 학번을 gradeClassNum으로 사용
                }))
            };

            setSelectedTeamForDetail(teamDetail);
        } catch (error) {
            console.error("팀 상세 조회 실패:", error);
            alert("팀 상세 정보를 불러오는데 실패했습니다.");
        }
    };

    const handleDeleteTeams = () => {
        if (selectedTeams.length > 0) {
            setShowDeleteConfirm(true);
        }
    };

    const confirmDeleteTeams = async () => {
        try {
            const token = localStorage.getItem("auth_token");
            await customaxios.delete(`${import.meta.env.VITE_API_URL}haram/team`, {
                data: { teamIds: selectedTeams },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setTeams(prev => prev.filter(team => !selectedTeams.includes(team.teamId)));
            setSelectedTeams([]);
            setShowDeleteConfirm(false);
            alert("팀이 삭제되었습니다.");
        } catch (error) {
            console.error("팀 삭제 실패:", error);
            alert("팀 삭제에 실패했습니다.");
        }
    };

    const handleDeleteStudents = async (studentIds) => {
        if (!selectedTeamForDetail) return;

        try {
            const token = localStorage.getItem("auth_token");
            await customaxios.delete(`${import.meta.env.VITE_API_URL}tch/team/student`, {
                data: { 
                    teamId: selectedTeamForDetail.teamId,
                    userIds: studentIds 
                },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            // 팀 상세 정보 다시 불러오기
            const team = teams.find(t => t.teamId === selectedTeamForDetail.teamId);
            if (team) {
                await handleTeamClick(team);
            }

            alert("팀원이 삭제되었습니다.");
        } catch (error) {
            console.error("팀원 삭제 실패:", error);
            alert("팀원 삭제에 실패했습니다.");
        }
    };

    const handleAddStudent = async (teamId, studentId) => {
        try {
            const token = localStorage.getItem("auth_token");
            const response = await customaxios.post(
                `${import.meta.env.VITE_API_URL}tch/team/student`,
                {
                    teamId: teamId,
                    userId: studentId
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            // 성공 시 팀 상세 정보 다시 불러오기
            const team = teams.find(t => t.teamId === teamId);
            if (team) {
                await handleTeamClick(team);
            }

            alert("학생이 팀에 추가되었습니다.");
        } catch (error) {
            console.error("학생 추가 실패:", error);

            if (error.response?.data?.error === "NON_EXIST_USER") {
                alert("존재하지 않는 학생 ID입니다.");
            } else if (error.response?.data?.error === "ALREADY_IN_TEAM") {
                alert("이미 다른 팀에 소속된 학생입니다.");
            } else {
                alert("학생 추가에 실패했습니다.");
            }
        }
    };

    const handleSeatingChange = (arrangement) => {
        setSeatingArrangement(arrangement);
    };

    const renderTeamsView = () => (
        <>
            <TopDiv>
                <TitleSection>
                    <Title>팀스페이스 조회</Title>
                    <Description>
                        글자 박스를 누르면 팀원을 조회할 수 있고{`\n`}
                        체크 박스를 누르고 삭제 버튼을 눌러 팀을 삭제할 수 있어요
                    </Description>
                </TitleSection>
                <RightSection>
                    {selectedTeams.length > 0 ? (
                        <DeleteBtn onClick={handleDeleteTeams}>
                            <BtnText>
                                팀 삭제하기
                            </BtnText>
                        </DeleteBtn>
                    ) : (
                        <SearchWrapper>
                            <SearchBox
                                placeholder="팀을 검색해요"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <SearchIcon src={VectorIcon} alt="검색" />
                        </SearchWrapper>
                    )}
                </RightSection>
            </TopDiv>

            <TeamGrid>
                {filteredTeams.map(team => (
                    <TeamCard
                        key={team.teamId}
                        team={team}
                        selected={selectedTeams.includes(team.teamId)}
                        onSelect={() => handleTeamSelect(team.teamId)}
                        onClick={() => handleTeamClick(team)}
                    />
                ))}
            </TeamGrid>
        </>
    );

    const renderSeatingView = () => (
        <SeatingChart 
            teams={teams} 
            onSeatingChange={handleSeatingChange}
        />
    );

    return (
        <>
            <Header teamName="최병준" isTeacher={true} />
            <Body>
                <TabContainer>
                    <Tab 
                        active={activeTab === "teams"} 
                        onClick={() => setActiveTab("teams")}
                    >
                        팀 관리
                    </Tab>
                    <Tab 
                        active={activeTab === "seating"} 
                        onClick={() => setActiveTab("seating")}
                    >
                        좌석 배치
                    </Tab>
                </TabContainer>

                {activeTab === "teams" ? renderTeamsView() : renderSeatingView()}
            </Body>

            <TeamDetailModal
                isOpen={!!selectedTeamForDetail}
                onClose={() => setSelectedTeamForDetail(null)}
                team={selectedTeamForDetail}
                onDeleteStudents={handleDeleteStudents}
                onAddStudent={handleAddStudent}
            />

            <DeleteConfirmModal
                isOpen={showDeleteConfirm}
                onClose={() => setShowDeleteConfirm(false)}
                onConfirm={confirmDeleteTeams}
                message="정말 팀을 삭제하시겠어요?"
            />
        </>
    );
}
