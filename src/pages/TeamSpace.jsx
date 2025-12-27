import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import Header from "../components/Header.jsx";
import { AxiosInstnce as customaxios } from "../lib/customAxios.js";
import CreditCard from "../components/CreditCard.jsx";
import SeatingChart from "../components/SeatingChart.jsx";

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #fff;
`;

const Body = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 50px 50px 50px;
`;

const TitleSection = styled.div`
  margin-bottom: 40px;
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

const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 8px;
`;

const Title = styled.h1`
  color: #1D1D1D;
  font-family: Pretendard;
  font-size: 32px;
  font-weight: 700;
  margin: 0;
`;

const DownloadButton = styled.button`
  padding: 12px 20px;
  border: 1px solid #F07F23;
  border-radius: 8px;
  background: #fff;
  color: #F07F23;
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #F07F23;
    color: white;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Subtitle = styled.p`
  color: #6B7280;
  font-family: Pretendard;
  font-size: 18px;
  font-weight: 400;
  margin: 0;
`;

const TeamsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 24px;
`;

const CreditsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  width: 100%;
`;

const TeamCard = styled.div`
  background: #fff;
  border: 1px solid #E5E7EB;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`;

const TeamHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const TeamName = styled.h3`
  color: #1D1D1D;
  font-family: Pretendard;
  font-size: 20px;
  font-weight: 700;
  margin: 0;
`;

const TeamCredit = styled.div`
  color: #F07F23;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 600;
`;

const MembersList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
`;

const Member = styled.div`
  color: #6B7280;
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 500;
  padding: 6px 12px;
  background: #F9FAFB;
  border-radius: 8px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
  justify-content: flex-end;
`;



const DeleteButton = styled.button`
  padding: 8px 16px;
  border: 1px solid #EF4444;
  border-radius: 8px;
  background: #fff;
  color: #EF4444;
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #FEF2F2;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  color: #6B7280;
  font-family: Pretendard;
  font-size: 18px;
`;

const ErrorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  color: #EF4444;
  font-family: Pretendard;
  font-size: 18px;
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 16px;
  padding: 32px;
  max-width: 400px;
  width: 90%;
`;

const ModalTitle = styled.h3`
  color: #1D1D1D;
  font-family: Pretendard;
  font-size: 20px;
  font-weight: 700;
  margin: 0 0 16px 0;
`;

const ModalText = styled.p`
  color: #6B7280;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 400;
  margin: 0 0 24px 0;
`;

const ModalButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`;

const ModalButton = styled.button`
  padding: 12px 24px;
  border-radius: 8px;
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
`;

const CancelButton = styled(ModalButton)`
  border: 1px solid #E5E7EB;
  background: #fff;
  color: #374151;

  &:hover {
    background: #F9FAFB;
  }
`;

const ConfirmButton = styled(ModalButton)`
  border: none;
  background: #EF4444;
  color: white;

  &:hover {
    background: #DC2626;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export default function TeamManagement() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ show: false, team: null });
  const [deleting, setDeleting] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [activeTab, setActiveTab] = useState("teams");
  const [credits, setCredits] = useState([]);

  useEffect(() => {
    fetchTeams();
    if (activeTab === "credits") {
      fetchCredits();
    }
  }, [activeTab]);

  const fetchTeams = async () => {
    try {
      setLoading(true);
      setError(null);

      // 모든 팀 조회
      const response = await customaxios.get('tch/account');
      
      let teamsData = [];
      if (Array.isArray(response.data)) {
        teamsData = response.data;
      } else if (Array.isArray(response.data?.teams)) {
        teamsData = response.data.teams;
      }

      // 각 팀의 멤버 정보도 가져오기
      const teamsWithMembers = await Promise.all(
        teamsData.map(async (team) => {
          try {
            const membersResponse = await customaxios.get(`tch/team/student/${team.teamId}`);
            return {
              ...team,
              members: membersResponse.data.student || []
            };
          } catch (error) {
            console.error(`팀 ${team.teamId} 멤버 조회 실패:`, error);
            return {
              ...team,
              members: []
            };
          }
        })
      );

      setTeams(teamsWithMembers);
    } catch (error) {
      console.error("팀 목록 조회 실패:", error);
      setError("팀 목록을 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (team) => {
    setDeleteModal({ show: true, team });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteModal.team) return;

    try {
      setDeleting(true);
      
      await customaxios.delete(`tch/team/${deleteModal.team.teamId}`);
      
      // 성공 시 팀 목록에서 제거
      setTeams(teams.filter(team => team.teamId !== deleteModal.team.teamId));
      setDeleteModal({ show: false, team: null });
      
      alert("팀이 성공적으로 삭제되었습니다.");
    } catch (error) {
      console.error("팀 삭제 실패:", error);
      alert("팀 삭제에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setDeleting(false);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteModal({ show: false, team: null });
  };

  const handleDownloadStudentExcel = async () => {
    try {
      setDownloading(true);
      
      const response = await customaxios.get('tch/excel/students', {
        responseType: 'blob'
      });
      
      // 파일 다운로드
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      
      // 파일명 설정 (현재 날짜 포함)
      const now = new Date();
      const dateStr = now.toISOString().split('T')[0];
      link.setAttribute('download', `학생팀정보_${dateStr}.xlsx`);
      
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      
    } catch (error) {
      console.error("학생 엑셀 다운로드 실패:", error);
      alert("엑셀 파일 다운로드에 실패했습니다.");
    } finally {
      setDownloading(false);
    }
  };

  const fetchCredits = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await customaxios.get('haram/account');
      
      let teamsData = [];
      if (Array.isArray(response.data)) {
        teamsData = response.data;
      } else if (Array.isArray(response.data?.teams)) {
        teamsData = response.data.teams;
      }

      setCredits(teamsData.map(team => ({
        id: team.teamId,
        name: team.teamName,
        credit: team.teamCredit
      })));

    } catch (error) {
      console.error("크레딧 조회 실패:", error);
      setError("크레딧 정보를 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddCredit = async (teamId, amount) => {
    try {
      const response = await customaxios.post('tch/account', {
        teamId: teamId,
        addCredit: amount
      });

      const data = response.data;
      
      // 크레딧 상태 업데이트
      setCredits(prevCredits =>
        prevCredits.map(team =>
          team.id === teamId
            ? { ...team, credit: data.credit }
            : team
        )
      );

      alert(`${data.teamName}에 ${amount.toLocaleString()} 크레딧이 추가되었습니다!`);

    } catch (error) {
      console.error("크레딧 추가 실패:", error);
      
      if (error.response?.status === 403) {
        alert("권한이 없습니다. 선생님 계정으로 로그인해주세요.");
      } else if (error.response?.data?.error === "NON_EXIST_TEAM") {
        alert("존재하지 않는 팀입니다");
      } else if (error.response?.data?.error === "INVALID_AMOUNT") {
        alert("올바르지 않은 금액입니다");
      } else {
        alert(`크레딧 추가에 실패했습니다: ${error.response?.data?.error || error.message}`);
      }
    }
  };

  const renderSeatingView = () => (
    <>
      <TitleRow>
        <Title>좌석 배치</Title>
      </TitleRow>
      <Subtitle>팀별 좌석 배치를 확인하고 관리할 수 있습니다</Subtitle>

      <SeatingChart 
        teams={teams} 
        onSeatingChange={(arrangement) => {
          // Handle seating arrangement changes if needed
          console.log('Seating arrangement updated:', arrangement);
        }}
      />
    </>
  );

  if (loading) {
    return (
      <>
        <Header isTeacher={true} />
        <Container>
          <Body>
            <LoadingContainer>데이터를 불러오는 중...</LoadingContainer>
          </Body>
        </Container>
      </>
    );
  }

  const renderTeamsView = () => (
    <>
      <TitleRow>
        <Title>팀 관리</Title>
        <DownloadButton 
          onClick={handleDownloadStudentExcel}
          disabled={downloading}
        >
          {downloading ? "다운로드 중..." : "학생 정보 엑셀"}
        </DownloadButton>
      </TitleRow>
      <Subtitle>모든 팀을 조회하고 관리할 수 있습니다</Subtitle>

      {error ? (
        <ErrorContainer>{error}</ErrorContainer>
      ) : (
        <TeamsGrid>
          {teams.map((team) => (
            <TeamCard key={team.teamId}>
              <TeamHeader>
                <TeamName>{team.teamName}</TeamName>
                <TeamCredit>{team.teamCredit?.toLocaleString()}원</TeamCredit>
              </TeamHeader>
              
              <MembersList>
                {team.members.length > 0 ? (
                  team.members.map((member, index) => (
                    <Member key={index}>
                      {member.name} ({member.userId})
                    </Member>
                  ))
                ) : (
                  <Member>팀원 정보 없음</Member>
                )}
              </MembersList>

              <ButtonGroup>
                <DeleteButton 
                  onClick={() => handleDeleteClick(team)}
                  disabled={deleting}
                >
                  삭제
                </DeleteButton>
              </ButtonGroup>
            </TeamCard>
          ))}
        </TeamsGrid>
      )}

      {teams.length === 0 && !loading && !error && (
        <LoadingContainer>등록된 팀이 없습니다.</LoadingContainer>
      )}
    </>
  );

  const renderCreditsView = () => (
    <>
      <TitleRow>
        <Title>크레딧 관리</Title>
      </TitleRow>
      <Subtitle>모든 팀의 크레딧을 조회하고 추가할 수 있습니다</Subtitle>

      {error ? (
        <ErrorContainer>{error}</ErrorContainer>
      ) : (
        <CreditsGrid>
          {credits.map((team) => (
            <CreditCard
              key={team.id}
              id={team.id}
              name={team.name}
              credit={team.credit}
              onAddCredit={handleAddCredit}
            />
          ))}
        </CreditsGrid>
      )}

      {credits.length === 0 && !loading && !error && (
        <LoadingContainer>등록된 팀이 없습니다.</LoadingContainer>
      )}
    </>
  );

  return (
    <>
      <Header isTeacher={true} />
      <Container>
        <Body>
          <TitleSection>
            <TabContainer>
              <Tab 
                active={activeTab === "teams"} 
                onClick={() => setActiveTab("teams")}
              >
                팀 관리
              </Tab>
              <Tab 
                active={activeTab === "credits"} 
                onClick={() => setActiveTab("credits")}
              >
                크레딧 관리
              </Tab>
              <Tab 
                active={activeTab === "seating"} 
                onClick={() => setActiveTab("seating")}
              >
                좌석 배치
              </Tab>
            </TabContainer>

            {activeTab === "teams" && renderTeamsView()}
            {activeTab === "credits" && renderCreditsView()}
            {activeTab === "seating" && renderSeatingView()}
          </TitleSection>
        </Body>

        {deleteModal.show && (
          <Modal>
            <ModalContent>
              <ModalTitle>팀 삭제 확인</ModalTitle>
              <ModalText>
                "{deleteModal.team?.teamName}" 팀을 정말 삭제하시겠습니까?
                <br />
                이 작업은 되돌릴 수 없습니다.
              </ModalText>
              <ModalButtonGroup>
                <CancelButton onClick={handleDeleteCancel}>
                  취소
                </CancelButton>
                <ConfirmButton 
                  onClick={handleDeleteConfirm}
                  disabled={deleting}
                >
                  {deleting ? "삭제 중..." : "삭제"}
                </ConfirmButton>
              </ModalButtonGroup>
            </ModalContent>
          </Modal>
        )}
      </Container>
    </>
  );
}