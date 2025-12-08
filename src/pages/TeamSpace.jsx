import React, { useState } from "react";
import styled from "@emotion/styled";
import Header from "../components/Header.jsx";
import TeamCard from "../components/TeamSpaceComponent/TeamCard.jsx";
import TeamDetailModal from "../components/TeamSpaceComponent/TeamDetailModal.jsx";
import DeleteConfirmModal from "../components/TeamSpaceComponent/DeleteConfirmModal.jsx";
import Btn from "../components/button.jsx";
import SearchBtn from "../assets/searchButton.svg"

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

const SearchIcon = styled.div`
    position: absolute;
    right: 20px;
    font-size: 20px;
    color: #8B8B8B;
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

    // 목업 데이터 - 실제로는 API에서 가져옴
    const [teams, setTeams] = useState([
        {
            id: 1,
            name: "알파",
            members: [
                { id: 101, name: "김철수", gradeClassNum: "1-1-01" },
                { id: 102, name: "이영희", gradeClassNum: "1-1-02" },
                { id: 103, name: "박민수", gradeClassNum: "1-1-03" },
            ]
        },
        {
            id: 2,
            name: "베타",
            members: [
                { id: 201, name: "최지우", gradeClassNum: "1453" },
                { id: 202, name: "정다은", gradeClassNum: "1453" },
                { id: 203, name: "최지우", gradeClassNum: "1453" },
                { id: 204, name: "정다은", gradeClassNum: "1453" },
            ]
        },
        {
            id: 3,
            name: "감마",
            members: [
                { id: 301, name: "강민호", gradeClassNum: "1111" },
                { id: 302, name: "윤서연", gradeClassNum: "2222" },
                { id: 303, name: "조혜인", gradeClassNum: "3333" },
            ]
        },
    ]);

    const filteredTeams = teams.filter(team =>
        team.name.toLowerCase().includes(searchQuery.toLowerCase())
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

    const confirmDeleteTeams = () => {
        setTeams(prev => prev.filter(team => !selectedTeams.includes(team.id)));
        setSelectedTeams([]);
    };

    const handleDeleteStudents = (studentIds) => {
        if (!selectedTeamForDetail) return;

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
    };

    return (
        <>
            <Header teamName="최병준 선생님" />
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
                                <SearchIcon>dd</SearchIcon>
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
