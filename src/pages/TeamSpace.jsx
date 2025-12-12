import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import axios from "axios";
import Header from "../components/Header.jsx";
import TeamCard from "../components/TeamSpaceComponent/TeamCard.jsx";
import TeamDetailModal from "../components/TeamSpaceComponent/TeamDetailModal.jsx";
import DeleteConfirmModal from "../components/TeamSpaceComponent/DeleteConfirmModal.jsx";
import Btn from "../components/button.jsx";
import SearchBtn from "../assets/searchButton.svg";
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

export default function TeamSpace() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedTeams, setSelectedTeams] = useState([]);
    const [selectedTeamForDetail, setSelectedTeamForDetail] = useState(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [teams, setTeams] = useState([]);

    // API에서 팀 목록 가져오기
    useEffect(() => {
        fetchTeams();
    }, []);

    const fetchTeams = async () => {
        try {
            const token = localStorage.getItem("auth_token");
            const response = await axios.get(`${import.meta.env.VITE_API_URL}haram/team`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log("팀 목록 응답:", response.data);
            setTeams(response.data.teams || []);
        } catch (error) {
            console.error("팀 목록 조회 실패:", error);
            console.error("에러 상세:", error.response?.data);
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

    const handleTeamClick = (team) => {
        setSelectedTeamForDetail(team);
    };

    const handleDeleteTeams = () => {
        if (selectedTeams.length > 0) {
            setShowDeleteConfirm(true);
        }
    };

    const confirmDeleteTeams = async () => {
        try {
            await axios.delete("/haram/teams", {
                data: { teamIds: selectedTeams }
            });
            setTeams(prev => prev.filter(team => !selectedTeams.includes(team.id)));
            setSelectedTeams([]);
            setShowDeleteConfirm(false);
        } catch (error) {
            console.error("팀 삭제 실패:", error);
            alert("팀 삭제에 실패했습니다.");
        }
    };

    const handleDeleteStudents = async (studentIds) => {
        if (!selectedTeamForDetail) return;

        try {
            await axios.delete(`/haram/teams/${selectedTeamForDetail.id}/members`, {
                data: { memberIds: studentIds }
            });

            setTeams(prev => prev.map(team => {
                if (team.id === selectedTeamForDetail.id) {
                    return {
                        ...team,
                        members: team.members.filter(m => !studentIds.includes(m.id))
                    };
                }
                return team;
            }));

            // 모달 내 데이터도 업데이트
            setSelectedTeamForDetail(prev => ({
                ...prev,
                members: prev.members.filter(m => !studentIds.includes(m.id))
            }));
        } catch (error) {
            console.error("팀원 삭제 실패:", error);
            alert("팀원 삭제에 실패했습니다.");
        }
    };

    return (
        <>
            <Header teamName="최병준" isTeacher={true} />
            <Body>
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
                            key={team.id}
                            team={team}
                            selected={selectedTeams.includes(team.id)}
                            onSelect={() => handleTeamSelect(team.id)}
                            onClick={() => handleTeamClick(team)}
                        />
                    ))}
                    <AddTeamCard>
                        <AddTeamText>팀 추가하기</AddTeamText>
                    </AddTeamCard>
                </TeamGrid>
            </Body>

            <TeamDetailModal
                isOpen={!!selectedTeamForDetail}
                onClose={() => setSelectedTeamForDetail(null)}
                team={selectedTeamForDetail}
                onDeleteStudents={handleDeleteStudents}
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
